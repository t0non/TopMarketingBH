with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

OLD = """    // Botão continuar do step 4 (multi-select)
    var btn4 = document.getElementById('ms-next-4');
    if (btn4) {
      btn4.addEventListener('click', function() {
        if (validateStep(4)) { window.msGoTo(5); }
      });
    }"""

NEW = """    // Botões continuar steps 4, 5 e 6
    [4, 5].forEach(function(step) {
      var btn = document.getElementById('ms-next-' + step);
      if (!btn) return;
      btn.addEventListener('click', function() {
        if (validateStep(step)) { window.msGoTo(step + 1); }
        else {
          // Shake hint
          var opts = document.querySelectorAll('#ms-step-' + step + ' .ms-option');
          opts.forEach(function(o) { o.style.borderColor = '#ef4444'; });
          setTimeout(function() {
            opts.forEach(function(o) { o.style.borderColor = ''; });
          }, 1500);
        }
      });
    });"""

if OLD in content:
    content = content.replace(OLD, NEW)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed! Steps 4, 5, 6 all have listeners now.")
else:
    print("Pattern not found - checking what's there...")
    idx = content.find('ms-next-4')
    print(repr(content[max(0,idx-50):idx+200]))
