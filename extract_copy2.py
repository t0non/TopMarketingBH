import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('_next/static/chunks/app/page-bce41186862bd658.js', 'r', encoding='utf-8') as f:
    content = f.read()

print("== HEADLINES ==")
matches = re.findall(r'children:"([^"]{10,120})"', content)
for m in set(matches):
    if 'Google' in m or 'cliente' in m.lower() or 'venda' in m.lower() or 'fatur' in m.lower() or 'M\xc1QUINA' in m or 'M\xe1quina' in m or 'escalar' in m:
        print('-', repr(m))
