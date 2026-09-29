import re

with open('_next/static/chunks/app/page-bce41186862bd658.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find the block we injected earlier
pattern = r'__html:"<div class=\\"max-w-xl mx-auto text-center bg-white.*?</p></div>"'

new_html = (
    '<div style=\\"max-width:600px;margin:40px auto;text-align:center;background:#fff;padding:40px 24px;border-radius:24px;box-shadow:0 20px 40px rgba(0,0,0,0.1);border:1px solid #e2e8f0;\\">'
    '<h3 style=\\"font-size:28px;font-weight:900;color:#0f172a;margin-bottom:16px;line-height:1.2;\\">O Plano Exato Para Dominar Seu Mercado em BH</h3>'
    '<p style=\\"font-size:16px;color:#64748b;margin-bottom:32px;line-height:1.5;\\">Descubra por que seus concorrentes est\\xe3o roubando seus clientes no Google e receba um plano de a\\xe7\\xe3o pr\\xe1tico para virar o jogo em 30 dias.</p>'
    '<a href=\\"/formulario\\" style=\\"display:inline-flex;align-items:center;justify-content:center;padding:16px 32px;font-size:18px;font-weight:800;color:#fff;background:linear-gradient(135deg,#2563eb,#1d4ed8);border-radius:99px;text-decoration:none;box-shadow:0 8px 25px rgba(37,99,235,0.4);\\">'
    'Receber meu plano de a\\xe7\\xe3o \\u2192'
    '</a>'
    '<p style=\\"font-size:12px;color:#94a3b8;margin-top:20px;\\">100% gratuito &bull; Sem compromisso &bull; Leva 2 minutos</p>'
    '</div>'
)

if re.search(pattern, content):
    content = re.sub(pattern, f'__html:"{new_html}"', content)
    with open('_next/static/chunks/app/page-bce41186862bd658.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced with inline styles CTA block!")
else:
    print("Could not find the CTA block to replace.")
