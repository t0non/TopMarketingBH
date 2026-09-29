import sys

with open('_next/static/chunks/app/page-bce41186862bd658.js', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('id="form-container"')
end = content.find('id="form-loading"')
if end != -1:
    end = content.find('</div>', end) + 6

print(f'Form block: {start} to {end}, total {end-start} chars', flush=True)
with open('form_block.txt', 'w', encoding='utf-8') as f:
    f.write(content[start:end])
print('Saved to form_block.txt', flush=True)
