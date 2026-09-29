import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

OLD = """  function scrollToForm(e) {
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
  }"""

NEW = """  function scrollToForm(e) {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = '/formulario';
  }"""

if OLD in content:
    content = content.replace(OLD, NEW)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated CTA interceptor to redirect to /formulario")
else:
    print("Old CTA interceptor not found")
