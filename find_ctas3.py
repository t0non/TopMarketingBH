import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('_next/static/chunks/app/page-bce41186862bd658.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all Button text and hrefs
matches = re.findall(r'children:"([^"]{5,80})"', content)
keywords = ['anali', 'avali', 'come', 'contato', 'preencher', 'quero', 'falar', 'diagnos', 'gratu', 'gratis', 'formul', 'google', 'aparecer', 'crescer']
found = set()
for m in matches:
    if any(w in m.lower() for w in keywords):
        found.add(m)

for f in found:
    print(f)

# hrefs
print('\n--- HREFS ---')
hrefs = re.findall(r'href:"([^"]+)"', content)
for h in set(hrefs):
    print(h)
