with open('_next/static/chunks/app/page-bce41186862bd658.js', 'r', encoding='utf-8') as f:
    content = f.read()
idx = content.find('id="form-container"')
if idx != -1:
    print(repr(content[idx-200:idx]))
