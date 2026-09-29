import os

js_file = '_next/static/chunks/app/page-bce41186862bd658.js'

def replace_in_file(path, old, new):
    if not os.path.exists(path):
        return False
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    if old in content:
        content = content.replace(old, new)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {path} for {old[:20]}...')
        return True
    else:
        print(f'Could not find old text in {path} for {old[:20]}...')
        return False

old_label = 'Quanto pretende investir em anúncios por mês?</label>'
new_label = 'Quanto pretende investir em anúncios por mês? (Mínimo de R$500)</label>'

old_options_js = '<option value="Até R$500">Até R$500</option><option value="R$500–1.000">R$500–1.000</option><option value="R$1.000–2.000">R$1.000–2.000</option><option value="R$2.000+">R$2.000+</option>'
new_options_js = '<option value="R$500-1.000">R$500 a R$1.000</option><option value="R$1.000-2.000">R$1.000 a R$2.000</option><option value="R$2.000+">Mais de R$2.000</option>'

old_faq = 'Sim! Entendemos que nem todo mundo começa investindo fortunas. Vamos definir um orçamento que caiba no seu bolso para que os primeiros resultados ajudem a financiar os próximos meses.'
new_faq = 'Sim! Entendemos que nem todo mundo começa investindo fortunas. Nosso pacote atende quem pode investir a partir de R$500 por mês em anúncios, para que os primeiros resultados ajudem a financiar os próximos meses.'

replace_in_file(js_file, old_label, new_label)
replace_in_file(js_file, old_options_js, new_options_js)
replace_in_file(js_file, old_faq, new_faq)
