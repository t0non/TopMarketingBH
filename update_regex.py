import re
import os

def update_file(path):
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the label
    content = re.sub(
        r'(Quanto pretende investir em an.{1,5}ncios por m.{1,5}s\?)</label>',
        r'\1 (Mínimo de R$500)</label>',
        content
    )

    # Replace the options
    content = re.sub(
        r'<option value="At[^"]+R\$500">At[^"]+R\$500</option>',
        r'<option value="R$500-1.000">R$500 a R$1.000</option>',
        content
    )
    content = re.sub(
        r'<option value="R\$500.{1,3}1\.000">R\$500.{1,3}1\.000</option>',
        r'', # remove the second one since we replaced the first one with this
        content
    )
    content = re.sub(
        r'<option value="R\$1\.000.{1,3}2\.000">R\$1\.000.{1,3}2\.000</option>',
        r'<option value="R$1.000-2.000">R$1.000 a R$2.000</option>',
        content
    )
    content = re.sub(
        r'<option value="R\$2\.000\+">R\$2\.000\+</option>',
        r'<option value="R$2.000+">Mais de R$2.000</option>',
        content
    )

    # Replace FAQ (this might be in index.html as json string, so handle both normal and JSON encoded)
    faq_pattern = r'Sim! Entendemos que nem todo mundo come.{1,5}a investindo fortunas\. Vamos definir um or.{1,5}amento que caiba no seu bolso para que os primeiros resultados ajudem a financiar os pr.{1,5}ximos meses\.'
    new_faq = 'Sim! Entendemos que nem todo mundo começa investindo fortunas. Nosso pacote atende quem pode investir a partir de R$500 por mês em anúncios, para que os primeiros resultados ajudem a financiar os próximos meses.'
    
    # Try replacing in plain text
    content = re.sub(faq_pattern, new_faq, content)
    
    # Try replacing in JSON encoded text (it has \x escape sequences maybe?)
    # Just in case, replace the base string matching "Sim! Entendemos que nem todo mundo"
    # Actually wait, in index.html, it's inside `self.__next_f.push`.
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

update_file('_next/static/chunks/app/page-bce41186862bd658.js')
update_file('index.html')

print("Updated files!")
