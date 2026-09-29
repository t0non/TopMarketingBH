/**
 * Google Apps Script — Top Marketing BH
 * 
 * COMO INSTALAR:
 * 1. Abra o Google Sheets onde quer salvar os leads
 * 2. Extensões > Apps Script
 * 3. Cole este código substituindo tudo
 * 4. Salve (Ctrl+S)
 * 5. Clique em "Implantar" > "Nova implantação"
 *    - Tipo: Aplicativo da Web
 *    - Executar como: Eu
 *    - Acesso: Qualquer pessoa (mesmo anônimos)
 * 6. Clique em "Implantar" e copie a URL gerada
 * 7. Cole essa URL em GOOGLE_SHEETS_WEBHOOK_URL no .env.local
 * 
 * ABAS CRIADAS AUTOMATICAMENTE:
 *   LEADS           → Todos os leads
 *   GOOGLE_QUALIFIED → Leads qualificados (para Google Ads Data Manager)
 *   GOOGLE_CONVERTED → Leads convertidos/clientes (para Google Ads Data Manager)
 */

var SHEET_LEADS     = 'LEADS';
var SHEET_QUALIFIED = 'GOOGLE_QUALIFIED';
var SHEET_CONVERTED = 'GOOGLE_CONVERTED';

var LEADS_HEADERS = [
  'lead_id', 'created_at', 'nome', 'telefone', 'empresa',
  'servicos', 'objetivo', 'orcamento_anuncios', 'prazo_inicio',
  'gclid', 'gbraid', 'wbraid', 'fbclid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'first_touch_source', 'first_touch_medium', 'first_touch_campaign', 'first_touch_gclid', 'first_touch_at',
  'landing_page', 'referrer', 'status',
  'qualified_at', 'closed_at', 'valor_venda', 'currency',
  'ip'
];

var CONVERSION_HEADERS = [
  'lead_id', 'gclid', 'gbraid', 'wbraid', 'telefone',
  'conversion_time', 'conversion_value', 'currency'
];

function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    var ss   = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);

    // Aba LEADS
    var leadsSheet = getOrCreateSheet(ss, SHEET_LEADS, LEADS_HEADERS);
    var leadsRow = LEADS_HEADERS.map(function(h) { return data[h] || ''; });
    leadsSheet.appendRow(leadsRow);

    // Aba GOOGLE_QUALIFIED (se status = qualificado)
    if (data.status === 'qualificado' && data.qualified_at) {
      var qualSheet = getOrCreateSheet(ss, SHEET_QUALIFIED, CONVERSION_HEADERS);
      
      // Verificar se já existe essa conversão (evitar duplicata)
      var existing = qualSheet.getDataRange().getValues();
      var alreadyExists = existing.some(function(row) { return row[0] === data.lead_id; });
      
      if (!alreadyExists) {
        qualSheet.appendRow([
          data.lead_id,
          data.gclid || '',
          data.gbraid || '',
          data.wbraid || '',
          data.telefone || '',
          data.qualified_at || '',
          data.valor_venda || '',
          data.currency || 'BRL'
        ]);
      }
    }

    // Aba GOOGLE_CONVERTED (se status = cliente)
    if (data.status === 'cliente' && data.closed_at) {
      var convSheet = getOrCreateSheet(ss, SHEET_CONVERTED, CONVERSION_HEADERS);
      
      var existingConv = convSheet.getDataRange().getValues();
      var alreadyExistsConv = existingConv.some(function(row) { return row[0] === data.lead_id; });
      
      if (!alreadyExistsConv) {
        convSheet.appendRow([
          data.lead_id,
          data.gclid || '',
          data.gbraid || '',
          data.wbraid || '',
          data.telefone || '',
          data.closed_at || '',
          data.valor_venda || '',
          data.currency || 'BRL'
        ]);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error('Erro no webhook:', err);
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função para testar manualmente no editor do Apps Script
function testWebhook() {
  var mockData = {
    postData: {
      contents: JSON.stringify({
        lead_id: 'lead_test_001',
        created_at: new Date().toISOString(),
        nome: 'Teste Webhook',
        telefone: '+5531999999999',
        empresa: 'Empresa Teste',
        servicos: 'Google Ads',
        objetivo: 'Vender mais',
        orcamento_anuncios: 'R$1k-2k',
        prazo_inicio: 'O quanto antes',
        gclid: 'TEST_GCLID_123',
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'campanha_teste',
        landing_page: 'https://topmarketingbh.com.br/formulario',
        status: 'novo',
        currency: 'BRL'
      })
    }
  };
  var result = doPost(mockData);
  Logger.log(result.getContent());
}
