// api/leads/[id].js
// Endpoint para atualizar status de um lead (CRM interno)
// Requer ADMIN_SECRET no header para autorização
// Nunca expor este endpoint no frontend público

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Proteção simples por secret
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret || req.headers['x-admin-secret'] !== adminSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query; // lead_id
  if (!id) return res.status(400).json({ error: 'lead_id obrigatório' });

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase não configurado' });
  }

  try {
    const body = req.body || {};
    const allowedStatuses = ['novo','contato','qualificado','reuniao','proposta','cliente','perdido'];
    
    if (body.status && !allowedStatuses.includes(body.status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const updates = {};
    if (body.status) updates.status = body.status;
    if (body.valor_venda !== undefined) updates.valor_venda = parseFloat(body.valor_venda) || null;
    if (body.currency) updates.currency = body.currency;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'Nenhum campo para atualizar' });
    }

    const endpoint = `${supabaseUrl}/rest/v1/leads?lead_id=eq.${encodeURIComponent(id)}`;
    const res2 = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(updates)
    });

    if (!res2.ok) {
      const err = await res2.text();
      console.error('[PATCH Lead] Supabase error:', err);
      return res.status(500).json({ error: 'Erro ao atualizar lead' });
    }

    const updated = await res2.json();
    console.log(`[PATCH Lead] Atualizado: ${id} -> status=${body.status}`);
    return res.status(200).json({ ok: true, lead: updated[0] });

  } catch (err) {
    console.error('[PATCH Lead] Erro:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
