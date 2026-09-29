with open('_next/static/chunks/app/page-bce41186862bd658.js', 'r', encoding='utf-8') as f:
    content = f.read()

checks = [
    ('Native form (lead-form)', 'lead-form'),
    ('Updated options (R$500 a R$1.000)', 'R$500 a R$1.000'),
    ('Updated label (minimo)', 'nimo de R$500'),
    ('FAQ updated', 'Nosso pacote atende quem pode investir'),
    ('Old option gone', 'R$500-1.000'),
]
for name, term in checks:
    found = term in content
    print(f'{name}: {"OK" if found else "MISSING/WRONG"}')
