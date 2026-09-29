with open('_next/static/chunks/app/page-bce41186862bd658.js', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('id="form-container"')
end = content.find('id="form-loading"')
if end != -1:
    end = content.find('</div>', end) + 6

print('Form starts at:', start)
print('Form ends at:', end)
print('Total chars:', end - start)
print()
print('First 300 chars of form:')
print(repr(content[start:start+300]))
print()
print('Last 200 chars of form:')
print(repr(content[end-200:end]))
