CTA_SCRIPT = """<script>
(function() {
  // Intercepta todos os CTAs e redireciona pro formulario
  var CTA_TEXTS = [
    'QUERO LIGAR', 'FALAR COM O', 'QUERO ESSES RESULTADOS',
    'QUERO APARECER', 'QUERO MAIS CLIENTES', 'PREENCHA O FORMUL',
    'QUERO MINHA AN', 'CRESCER JUNTOS', 'AVALIA', 'DIAGN'
  ];

  function scrollToForm(e) {
    var formContainer = document.getElementById('form-container');
    if (!formContainer) return;

    e.preventDefault();
    e.stopPropagation();

    formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Se o form ainda está na tela inicial, clica no botão de start
    setTimeout(function() {
      if (window.currentStep === 0) {
        var startBtn = document.getElementById('ms-btn-start-action');
        if (startBtn) startBtn.click();
      }
    }, 600);
  }

  function attachCTAListeners() {
    // Intercepta links do WhatsApp que são CTAs (não o botão fixo de contato)
    document.querySelectorAll('a[href*="wa.me"]').forEach(function(link) {
      if (link.getAttribute('data-cta-attached')) return;
      link.setAttribute('data-cta-attached', '1');
      link.addEventListener('click', scrollToForm);
    });

    // Intercepta botões com texto CTA
    document.querySelectorAll('button, [role="button"]').forEach(function(btn) {
      if (btn.getAttribute('data-cta-attached')) return;
      var text = (btn.textContent || '').toUpperCase().trim();
      var isCTA = CTA_TEXTS.some(function(t) { return text.indexOf(t) !== -1; });
      if (isCTA && btn.id !== 'ms-btn-start-action') {
        btn.setAttribute('data-cta-attached', '1');
        btn.addEventListener('click', scrollToForm);
      }
    });
  }

  // Roda imediatamente e de novo após o React hidratar
  attachCTAListeners();
  setTimeout(attachCTAListeners, 1000);
  setTimeout(attachCTAListeners, 2500);

  // Observer para elementos adicionados dinamicamente
  var observer = new MutationObserver(function() {
    attachCTAListeners();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
</script>"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove if already injected
if 'attachCTAListeners' in content:
    import re
    content = re.sub(r'<script>\s*\(function\(\) \{\s*// Intercepta todos os CTAs.*?}\)\(\);\s*</script>', '', content, flags=re.DOTALL)
    print("Removed old CTA script")

if '</body>' in content:
    content = content.replace('</body>', CTA_SCRIPT + '</body>')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("CTA intercept script injected!")
else:
    print("</body> not found!")
