import re

with open('_next/static/chunks/app/page-bce41186862bd658.js', 'r', encoding='utf-8') as f:
    content = f.read()

# The injected form started with:
# <div class="max-w-xl mx-auto text-left bg-slate-50 p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 mt-8" id="form-container">
# And it was wrapped in: (0,s.jsx)("div",{dangerouslySetInnerHTML:{__html:"<div class=\\"max-w-xl..."}})

# Let's find the start of the injected form
start_idx = content.find('<div class=\\"max-w-xl mx-auto text-left bg-slate-50 p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 mt-8\\" id=\\"form-container\\">')

if start_idx != -1:
    # Find the end of the dangerouslySetInnerHTML block
    # It looks like: {__html:"...</div></div></div>"}})
    # We need to find the matching quotes and brackets.
    # The string we injected ends with: </div></div></div>
    
    # We can just replace the whole HTML string inside __html:""
    
    # Let's use regex to find the __html:"<div class=\\"max-w-xl...</div></div></div>"
    pattern = r'__html:"<div class=\\"max-w-xl mx-auto text-left bg-slate-50 p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 mt-8\\" id=\\"form-container\\">.*?</form><div id=\\"form-loading\\".*?</div></div></div>"'
    
    match = re.search(pattern, content)
    
    if match:
        # We will replace it with a new big button banner
        new_html = (
            '<div class=\\"max-w-xl mx-auto text-center bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 mt-8\\">'
            '<h3 class=\\"text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight\\">O Plano Exato Para Dominar Seu Mercado em BH</h3>'
            '<p class=\\"text-slate-600 mb-8 text-base md:text-lg\\">Descubra por que seus concorrentes est\\xe3o roubando seus clientes no Google e receba um plano de a\\xe7\\xe3o pr\\xe1tico para virar o jogo em 30 dias.</p>'
            '<a href=\\"/formulario\\" class=\\"inline-flex items-center justify-center w-full md:w-auto px-8 py-5 text-lg font-bold text-white transition-all duration-300 transform rounded-full bg-gradient-to-r from-blue-600 to-blue-800 hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]\\">Receber meu plano de a\\xe7\\xe3o \\u2192</a>'
            '<p class=\\"text-sm text-slate-400 mt-4\\">100% gratuito &bull; Sem compromisso &bull; Leva 2 minutos</p>'
            '</div>'
        )
        
        content = content[:match.start()] + f'__html:"{new_html}"' + content[match.end():]
        
        with open('_next/static/chunks/app/page-bce41186862bd658.js', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Replaced injected form with a big CTA button banner!")
    else:
        print("Could not find the exact end of the injected form.")
else:
    print("Could not find the injected form start.")
