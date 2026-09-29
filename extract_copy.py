import re

with open('_next/static/chunks/app/page-bce41186862bd658.js', 'r', encoding='utf-8') as f:
    content = f.read()

print("== HEADLINES ==")
matches = re.findall(r'children:"([^"]{10,120})"', content)
for m in set(matches):
    if 'Google' in m or 'cliente' in m.lower() or 'venda' in m.lower() or 'fatur' in m.lower():
        print('-', m)
