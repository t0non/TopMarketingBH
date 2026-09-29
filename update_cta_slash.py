import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

OLD = "window.location.href = '/formulario';"
NEW = "window.location.href = '/formulario/';"

if OLD in content:
    content = content.replace(OLD, NEW)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated CTA interceptor to redirect to /formulario/")
else:
    print("Old CTA interceptor not found")
