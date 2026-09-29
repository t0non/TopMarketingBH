import re

with open('_next/static/chunks/app/page-bce41186862bd658.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all typeform links remaining
tf = [m.start() for m in re.finditer('typeform', content, re.IGNORECASE)]
print(f"Typeform occurrences: {len(tf)}")

# Find all Button/Link with relevant text
matches = re.findall(r'children:"([^"]{5,80})"', content)
keywords = ['anali', 'avali', 'come', 'contato', 'preencher', 'quero', 'falar', 'diagnos', 'gratu', 'gratis', 'formul']
for m in set(matches):
    if any(w in m.lower() for w in keywords):
        print(repr(m))

# Find button-like hrefs
hrefs = re.findall(r'href:"([^"]+)"', content)
for h in set(hrefs):
    if 'typeform' in h or '#' in h:
        print('HREF:', repr(h))
