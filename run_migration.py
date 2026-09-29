import sys, urllib.request, json, ssl

SUPABASE_URL = "https://gycpwtlwehgwxqyrmbzt.supabase.co"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Y3B3dGx3ZWhnd3hxeXJtYnp0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDYyODA1MywiZXhwIjoyMTA2MjA0MDUzfQ.4bHf952OtIBU04QJyEr6vmvrbxXSMGm0x-khcxMSukI"

with open("supabase_migration.sql", "r", encoding="utf-8") as f:
    sql = f.read()

payload = json.dumps({"query": sql}).encode("utf-8")

req = urllib.request.Request(
    f"{SUPABASE_URL}/rest/v1/rpc/exec_sql",
    data=payload,
    headers={
        "Content-Type": "application/json",
        "apikey": SERVICE_KEY,
        "Authorization": f"Bearer {SERVICE_KEY}"
    }
)

ctx = ssl.create_default_context()
try:
    with urllib.request.urlopen(req, context=ctx, timeout=30) as r:
        print("Status:", r.status)
        print(r.read().decode())
except urllib.error.HTTPError as e:
    print("HTTP Error:", e.code, e.reason)
    print(e.read().decode())
