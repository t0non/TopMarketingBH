import re

path = '_next/static/chunks/app/page-bce41186862bd658.js'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

old = 'Vamos definir um or\u00e7amento que caiba no seu bolso para que os primeiros resultados ajudem a financiar os pr\u00f3ximos meses.'
new = 'Nosso pacote atende quem pode investir a partir de R$500 por m\u00eas em an\u00fancios, para que os primeiros resultados ajudem a financiar os pr\u00f3ximos meses.'

if old in content:
    content = content.replace(old, new)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('FAQ updated in JS chunk!')
else:
    # Try encoded version
    idx = content.find('Vamos definir um')
    if idx != -1:
        print('Found partial match at:', idx)
        print(content[idx:idx+200])
    else:
        print('Not found - searching for fragment...')
        idx2 = content.find('primeiros resultados ajudem')
        if idx2 != -1:
            print('Found fragment:', content[idx2-100:idx2+200])
        else:
            print('Nothing found')
