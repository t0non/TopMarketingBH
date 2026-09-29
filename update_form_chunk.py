import re

with open('_next/static/chunks/app/page-bce41186862bd658.js', 'r', encoding='utf-8') as f:
    content = f.read()

REPLACEMENTS = {
    'Análise Gratuita da Sua Empresa': 'O Plano Exato Para Dominar Seu Mercado em BH',
    'Responda 7 perguntas rápidas e descubra como atrair mais clientes com Google Ads em BH.': 'Descubra por que seus concorrentes estão roubando seus clientes no Google e receba um plano de ação prático para virar o jogo em 30 dias.',
    'Quero minha análise gratuita': 'Receber meu plano de ação',
    'Qual o seu WhatsApp para receber a análise?': 'Qual o seu WhatsApp para receber o plano de ação?',
    'Receber análise da minha empresa': 'Descobrir como dobrar minhas vendas'
}

for old, new in REPLACEMENTS.items():
    # Because this was injected as safe HTML string, it might just be direct text
    if old in content:
        content = content.replace(old, new)
        print(f"Replaced direct: {old[:20]}...")
    else:
        # Check hex encoding just in case
        old_hex = ''.join(c if ord(c) < 128 else '\\x'+format(ord(c), '02x') for c in old)
        new_hex = ''.join(c if ord(c) < 128 else '\\x'+format(ord(c), '02x') for c in new)
        if old_hex in content:
            content = content.replace(old_hex, new_hex)
            print(f"Replaced hex: {old[:20]}...")

with open('_next/static/chunks/app/page-bce41186862bd658.js', 'w', encoding='utf-8') as f:
    f.write(content)
