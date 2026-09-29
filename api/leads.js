const crypto = require('crypto');

// ──────────────────────────────────────────────
// Utilitários
// ──────────────────────────────────────────────

function hashSha256(str) {
  if (!str) return undefined;
  return crypto.createHash('sha256').update(str.trim().toLowerCase()).digest('hex');
}

function normalizePhone(raw) {
  if (!raw) return '';
  let digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  if (!digits.startsWith('55')) digits = '55' + digits;
  return '+' + digits; // e.g. +5531999999999
}

function generateLeadId() {
  return 'lead_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex');
}

// ──────────────────────────────────────────────
// Supabase client (lazy, sem SDK pesado)
// ──────────────────────────────────────────────

async function saveToSupabase(leadData) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn('[Supabase] SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configurados. Pulando.');
    return { ok: false, skipped: true };
  }

  // Usamos on_conflict=lead_id para fazer UPSERT (atualizar lead parcial quando ele finalizar)
  const endpoint = `${url}/rest/v1/leads?on_conflict=lead_id`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Prefer': 'resolution=merge-duplicates, return=representation'
    },
    body: JSON.stringify(leadData)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase error ${res.status}: ${err}`);
  }
  return { ok: true };
}

// ──────────────────────────────────────────────
// Google Sheets Webhook
// ──────────────────────────────────────────────

async function syncToSheets(payload) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('[Sheets] GOOGLE_SHEETS_WEBHOOK_URL não configurada.');
    return;
  }
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    throw new Error(`Sheets webhook error: ${res.status}`);
  }
}

// ──────────────────────────────────────────────
// Meta Conversions API
// ──────────────────────────────────────────────

async function sendToMetaCAPI(payload, phone) {
  const pixelId = process.env.META_PIXEL_ID;
  const token   = process.env.META_ACCESS_TOKEN;
  const testCode = process.env.META_TEST_EVENT_CODE || null;
  if (!pixelId || !token) {
    console.warn('[META CAPI] Credenciais não configuradas. Pulando.');
    return;
  }

  const capiBody = {
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: payload.lead_id,
      event_source_url: payload.landing_page || '',
      action_source: 'website',
      user_data: {
        client_ip_address: payload.ip,
        client_user_agent: payload.user_agent,
        ph: [hashSha256(phone)],
        fbp: payload.fbp,
        fbc: payload.fbclid ? `fb.1.${Date.now()}.${payload.fbclid}` : payload.fbc
      },
      custom_data: {
        lead_id: payload.lead_id,
        service: payload.servicos,
        ad_budget: payload.orcamento_anuncios
      }
    }],
    ...(testCode ? { test_event_code: testCode } : {})
  };

  const url = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(capiBody)
  });

  console.log('[META CAPI]', {
    lead_id: payload.lead_id,
    status: res.status,
    test_mode: Boolean(testCode)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error('[META CAPI] Erro:', JSON.stringify(err?.error || err));
  }
}

// ──────────────────────────────────────────────
// Handler Principal
// ──────────────────────────────────────────────

export default async function handler(req, res) {
  // Apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // CORS básico para o próprio domínio
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');

  try {
    const body = req.body;
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: 'Bad Request' });
    }

    // Validação mínima no backend
    const { nome, whatsapp, is_partial } = body;
    if (!nome || nome.trim().length < 2) {
      return res.status(400).json({ error: 'Nome inválido' });
    }
    const rawPhone = whatsapp || '';
    const normalizedPhone = normalizePhone(rawPhone);
    if (normalizedPhone.replace(/\D/g,'').length < 12) {
      return res.status(400).json({ error: 'Telefone inválido' });
    }

    const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
    const leadId = body.lead_id || generateLeadId();

    // Payload completo para salvar
    const leadRecord = {
      lead_id: leadId,
      nome: nome.trim(),
      telefone: normalizedPhone,
      empresa: (body.empresa || '').trim(),
      objetivo: body.objetivo || '',
      servicos: body.servico || body.servicos || '',
      orcamento_anuncios: body.investimento || body.orcamento_anuncios || '',
      prazo_inicio: body.prazo || body.prazo_inicio || '',

      // Attribution
      gclid: body.gclid || null,
      gbraid: body.gbraid || null,
      wbraid: body.wbraid || null,
      fbclid: body.fbclid || null,

      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      utm_term: body.utm_term || null,
      utm_content: body.utm_content || null,

      // First touch (enviado do frontend localStorage)
      first_touch_source: body.first_touch_source || null,
      first_touch_medium: body.first_touch_medium || null,
      first_touch_campaign: body.first_touch_campaign || null,
      first_touch_gclid: body.first_touch_gclid || null,
      first_touch_at: body.first_touch_at || null,

      landing_page: body.landing_page || body.pagina_origem || null,
      referrer: body.referrer || null,
      user_agent: body.user_agent || req.headers['user-agent'] || null,
      ip: clientIp,

      status: is_partial ? 'incompleto' : 'novo',
      currency: 'BRL',
      qualified_sent_to_google: false,
      converted_sent_to_google: false
    };

    console.log(`[API Leads] Novo lead ${is_partial ? '(PARCIAL)' : '(COMPLETO)'}: ${leadId} | ${leadRecord.utm_source || 'direto'} | gclid:${leadRecord.gclid ? 'sim' : 'não'}`);

    // 1. Salvar no Supabase (crítico)
    let supabaseOk = false;
    try {
      await saveToSupabase(leadRecord);
      supabaseOk = true;
      console.log(`[Supabase] Lead salvo: ${leadId}`);
    } catch (err) {
      // Supabase não configurado ou falhou — não bloqueia o fluxo
      if (!err.message.includes('não configurados')) {
        console.error(`[Supabase] Erro ao salvar lead:`, err.message);
      }
    }

    // Se for lead parcial (abandono), nós só salvamos no BD e encerramos.
    // NÃO mandamos para o Sheets nem disparamos CAPI/Conversões.
    if (is_partial) {
      return res.status(200).json({ ok: true, lead_id: leadId, partial: true });
    }

    // ────────────────────────────────────────────
    // DAQUI PARA BAIXO: SÓ RODA SE O FORMULÁRIO FOI COMPLETADO (is_partial == false)
    // ────────────────────────────────────────────

    // Sheets payload (com timestamps formatados)
    const sheetsPayload = {
      ...leadRecord,
      created_at: new Date().toISOString()
    };

    // 2. Sync Google Sheets (não-crítico — lead não é perdido se falhar)
    try {
      await syncToSheets(sheetsPayload);
      console.log(`[Sheets] Sincronizado: ${leadId}`);
    } catch (err) {
      console.error(`[Sheets] Falha (lead salvo no Supabase):`, err.message);
    }

    // 3. Meta CAPI (não-crítico)
    try {
      await sendToMetaCAPI({ ...leadRecord, fbp: body.fbp, fbc: body.fbc }, normalizedPhone);
    } catch (err) {
      console.error(`[META CAPI] Falha:`, err.message);
    }

    // Resposta de sucesso para o frontend disparar o generate_lead
    return res.status(200).json({
      ok: true,
      lead_id: leadId,
      // Dados para GTM Enhanced Conversions (isolados, não vão para GA4)
      _ec: {
        phone_number: normalizedPhone
      }
    });

  } catch (error) {
    console.error(`[API Leads] Erro interno:`, error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
