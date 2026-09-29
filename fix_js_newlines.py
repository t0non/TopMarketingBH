import re

path = '_next/static/chunks/app/page-bce41186862bd658.js'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# The injection started at id="form-container">
start = content.find('id="form-container">')
if start != -1:
    end = content.find('<div id="form-loading"', start)
    if end != -1:
        # We need to find the end of the form loading div
        end = content.find('</div>', end) + 6
        
        # Extract the broken section
        broken = content[start:end]
        
        # Remove all literal newlines (replace with space to avoid word joining)
        fixed = broken.replace('\n', ' ')
        
        content = content[:start] + fixed + content[end:]
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Fixed newlines in JS chunk!')
    else:
        print('End of form not found.')
else:
    print('Start of form not found.')
