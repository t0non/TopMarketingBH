import re

path = '_next/static/chunks/app/page-bce41186862bd658.js'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Search for any fragment of the FAQ
fragments = ['Tenho pouco dinheiro', 'Consigo comecar', 'comecar investindo', 'financiar os proximos']
for frag in fragments:
    if frag in content:
        idx = content.find(frag)
        print(f'Found "{frag}" at position {idx}')
        print(content[idx:idx+300])
        print('---')
    else:
        # try encoded
        print(f'Not found: "{frag}"')
