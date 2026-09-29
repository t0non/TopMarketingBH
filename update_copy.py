import re

with open('_next/static/chunks/app/page-bce41186862bd658.js', 'r', encoding='utf-8') as f:
    content = f.read()

REPLACEMENTS = {
    'Criamos sua Landing Page e seus anúncios para sua empresa atrair novos clientes qualificados em Belo Horizonte.': 
    'A Estratégia Definitiva Para Dominar o Google em BH e Receber Clientes Prontos Para Comprar Todos os Dias.',
    
    'Gestão de Tráfego e Landing Pages': 
    'Aceleração de Vendas e Escala de Faturamento',
    
    'Clínicas, Consultórios, Lojistas e Prestadores de Serviços:': 
    'ATENÇÃO: Clínicas, Consultórios, Lojistas e Prestadores de Serviços:',
    
    'O método está pronto. Só precisamos saber se o seu negócio está preparado para a escala que vamos entregar.': 
    'A máquina de vendas está pronta. A única pergunta é: sua empresa consegue atender o dobro de clientes no mês que vem?',
    
    'Preencha o formulário e vamos crescer juntos!': 
    'Faça sua Análise Gratuita e Receba o Plano Exato Para Escalar Suas Vendas',

    'novos clientes para o seu negócio.':
    'clientes de alto valor todos os dias.',
    
    'O que entregamos?':
    'Como vamos escalar sua empresa:',
    
    'Deseja previsibilidade de novos clientes todos os dias, não só quando alguém te indica.':
    'Quer parar de depender de indicações e ter previsibilidade de caixa todos os meses.',
    
    'Presta um ótimo serviço, mas sofre dependendo apenas de indicações.':
    'Tem um serviço premium, mas está perdendo clientes para concorrentes piores no Google.',
    
    'Junto com a Gestão de Tráfego, nós também montamos a sua Landing Page (página de vendas). Não basta levar visitantes se a página não converte. Nossa estrutura é feita para transformar cliques em clientes.':
    'Não adianta levar tráfego para um site que não vende. Nós construímos Landing Pages de Alta Conversão desenhadas exclusivamente para transformar cliques em clientes reais. Sua nova máquina de vendas operando 24/7.'
}

# Apply replacements considering unicode escaping in JS
for old, new in REPLACEMENTS.items():
    # Convert old to how it might be escaped in JS
    old_escaped = old.encode('unicode_escape').decode('utf-8').replace('\\x', '\\x').replace('\\u', '\\u')
    # Actually, in the chunk it's often encoded like '... portugu\\xeas ...'
    # The safest way is to just do a direct string replace if the JS chunk is UTF-8 decoded, 
    # but since it's read as utf-8, python sees the actual chars if they were utf8 encoded, 
    # or the escape sequences if they were literal slashes.
    # From the dump output, the chunk contains literal escape sequences like '\\xe3'
    
    def to_js_escaped(text):
        return text.encode('utf-8').decode('unicode_escape') # This won't work well
        
    # Let's try finding the literal characters or the hex escapes
    old_hex = ''.join(c if ord(c) < 128 else '\\x'+format(ord(c), '02x') for c in old)
    new_hex = ''.join(c if ord(c) < 128 else '\\x'+format(ord(c), '02x') for c in new)
    
    # Also try unicode escape format \\uXXXX
    old_uni = ''.join(c if ord(c) < 128 else '\\u'+format(ord(c), '04x') for c in old)
    new_uni = ''.join(c if ord(c) < 128 else '\\u'+format(ord(c), '04x') for c in new)

    if old in content:
        content = content.replace(old, new)
        print(f"Replaced direct: {old[:20]}...")
    elif old_hex in content:
        content = content.replace(old_hex, new_hex)
        print(f"Replaced hex: {old[:20]}...")
    elif old_uni in content:
        content = content.replace(old_uni, new_uni)
        print(f"Replaced uni: {old[:20]}...")
    else:
        # Try a more relaxed approach (ignoring exact escapes)
        pass

with open('_next/static/chunks/app/page-bce41186862bd658.js', 'w', encoding='utf-8') as f:
    f.write(content)
