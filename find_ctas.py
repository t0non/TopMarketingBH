with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find what CTA button text/hrefs are in the JS chunk
import re
# Look for button text patterns
matches = re.findall(r'children:"([^"]{5,60})"', content)
for m in set(matches):
    if any(w in m.lower() for w in ['anális', 'avali', 'começar', 'contato', 'preencher', 'quero', 'falar', 'diagnos', 'gratuita', 'gratis', 'formul']):
        print(repr(m))
