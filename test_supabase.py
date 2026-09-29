import sys, urllib.request, json, ssl
sys.stdout.reconfigure(encoding='utf-8')

SUPABASE_URL = "https://gycpwtlwehgwxqyrmbzt.supabase.co"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Y3B3dGx3ZWhnd3hxeXJtYnp0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDYyODA1MywiZXhwIjoyMTA2MjA0MDUzfQ.4bHf952OtIBU04QJyEr6vmvrbxXSMGm0x-khcxMSukI"

ctx = ssl.create_default_context()

print("=== Verificando conexao com Supabase ===")
req = urllib.request.Request(
    f"{SUPABASE_URL}/rest/v1/leads?limit=1",
    headers={
        "apikey": SERVICE_KEY,
        "Authorization": f"Bearer {SERVICE_KEY}",
        "Content-Type": "application/json"
    }
)
try:
    with urllib.request.urlopen(req, context=ctx, timeout=10) as r:
        print(f"OK! Status: {r.status}")
        data = json.loads(r.read().decode())
        print(f"   Leads existentes: {len(data)}")
        table_exists = True
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"ERRO HTTP {e.code}: {body[:200]}")
    if e.code == 404:
        print("   -> Tabela 'leads' nao existe. Execute o supabase_migration.sql primeiro.")
    table_exists = False
    sys.exit(1)
except Exception as ex:
    print(f"ERRO de conexao: {ex}")
    sys.exit(1)

if not table_exists:
    sys.exit(1)

print("\n=== Inserindo lead de teste ===")
test_lead = {
    "lead_id": "lead_test_tracking_001",
    "nome": "Teste Sistema",
    "telefone": "+5531999990001",
    "empresa": "Empresa Teste",
    "objetivo": "Testar sistema",
    "servicos": "Google Ads",
    "orcamento_anuncios": "R$1k-2k",
    "prazo_inicio": "O quanto antes",
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "campanha_teste",
    "gclid": "TESTE_GCLID_123",
    "landing_page": "https://topmarketingbh.com.br/formulario",
    "status": "novo",
    "currency": "BRL",
    "qualified_sent_to_google": False,
    "converted_sent_to_google": False
}

payload = json.dumps(test_lead).encode("utf-8")
req2 = urllib.request.Request(
    f"{SUPABASE_URL}/rest/v1/leads",
    data=payload,
    headers={
        "apikey": SERVICE_KEY,
        "Authorization": f"Bearer {SERVICE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    },
    method="POST"
)
try:
    with urllib.request.urlopen(req2, context=ctx, timeout=10) as r:
        result = json.loads(r.read().decode())
        print(f"Lead de teste inserido com SUCESSO!")
        print(f"   lead_id: {result[0]['lead_id']}")
        print(f"   status: {result[0]['status']}")
        print(f"   created_at: {result[0]['created_at']}")
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"ERRO ao inserir: {e.code} - {body[:300]}")
