import sys, urllib.request, json, ssl
sys.stdout.reconfigure(encoding='utf-8')

SUPABASE_URL = "https://gycpwtlwehgwxqyrmbzt.supabase.co"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Y3B3dGx3ZWhnd3hxeXJtYnp0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDYyODA1MywiZXhwIjoyMTA2MjA0MDUzfQ.4bHf952OtIBU04QJyEr6vmvrbxXSMGm0x-khcxMSukI"
ctx = ssl.create_default_context()

# Deletar lead de teste
print("Deletando lead de teste...")
req = urllib.request.Request(
    f"{SUPABASE_URL}/rest/v1/leads?lead_id=eq.lead_test_tracking_001",
    headers={
        "apikey": SERVICE_KEY,
        "Authorization": f"Bearer {SERVICE_KEY}",
        "Content-Type": "application/json"
    },
    method="DELETE"
)
try:
    with urllib.request.urlopen(req, context=ctx, timeout=10) as r:
        print(f"Lead de teste removido. Status: {r.status}")
except urllib.error.HTTPError as e:
    print(f"Erro: {e.code} - {e.read().decode()}")

# Verificar estrutura da tabela
print("\nVerificando colunas da tabela leads...")
req2 = urllib.request.Request(
    f"{SUPABASE_URL}/rest/v1/leads?limit=0",
    headers={
        "apikey": SERVICE_KEY,
        "Authorization": f"Bearer {SERVICE_KEY}",
        "Accept": "application/json",
        "Prefer": "count=exact"
    }
)
try:
    with urllib.request.urlopen(req2, context=ctx, timeout=10) as r:
        count_range = r.headers.get('Content-Range', 'N/A')
        print(f"Tabela 'leads' acessivel - Content-Range: {count_range}")
except Exception as ex:
    print(f"Erro: {ex}")
