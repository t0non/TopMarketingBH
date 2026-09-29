import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('_next/static/chunks/app/page-bce41186862bd658.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract children text blocks
# Looking for children:"text" or children:['text', ...]
# A simpler way is to split by children: and parse strings
matches = re.findall(r'children:"([^"]+)"', content)
for m in set(matches):
    if len(m) > 15 and not m.startswith('bg-') and not m.startswith('text-') and not 'http' in m:
        print(repr(m))
