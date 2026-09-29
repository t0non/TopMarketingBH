SCRIPT_OLD_MARKER = '(function waitForForm() {'
SCRIPT_END_MARKER = '})();\n</script>'

NEW_SCRIPT = """<script>
(function waitForForm() {
  function init() {
    var startBtn = document.getElementById('ms-btn-start-action');
    if (!startBtn) { setTimeout(init, 200); return; }

    window.currentStep = 0;
    var totalSteps = 6;

    // === MASKS & FORMATTERS ===
    var nomeInput = document.getElementById('nome');
    var whatsInput = document.getElementById('whatsapp');
    var empresaInput = document.getElementById('empresa');

    function toTitleCase(str) {
      return str.replace(/\\b\\w/g, function(c) { return c.toUpperCase(); });
    }

    if (nomeInput) {
      nomeInput.addEventListener('input', function() {
        var pos = this.selectionStart;
        this.value = toTitleCase(this.value.toLowerCase());
        this.setSelectionRange(pos, pos);
      });
    }

    if (empresaInput) {
      empresaInput.addEventListener('input', function() {
        var pos = this.selectionStart;
        this.value = toTitleCase(this.value.toLowerCase());
        this.setSelectionRange(pos, pos);
      });
    }

    if (whatsInput) {
      whatsInput.addEventListener('input', function(e) {
        var val = this.value.replace(/\\D/g, '');
        if (val.length > 11) val = val.slice(0, 11);
        var formatted = '';
        if (val.length === 0) {
          formatted = '';
        } else if (val.length <= 2) {
          formatted = '(' + val;
        } else if (val.length <= 6) {
          formatted = '(' + val.slice(0,2) + ') ' + val.slice(2);
        } else if (val.length <= 10) {
          formatted = '(' + val.slice(0,2) + ') ' + val.slice(2,6) + '-' + val.slice(6);
        } else {
          formatted = '(' + val.slice(0,2) + ') ' + val.slice(2,7) + '-' + val.slice(7,11);
        }
        this.value = formatted;
      });
      // Allow only digits and formatting chars
      whatsInput.addEventListener('keypress', function(e) {
        if (!/[0-9]/.test(e.key) && !['Backspace','Delete','Tab','Enter','ArrowLeft','ArrowRight'].includes(e.key)) {
          e.preventDefault();
        }
      });
    }

    // === NAVIGATION ===
    window.msGoTo = function(step) {
      document.querySelectorAll('.ms-screen').forEach(function(el) {
        el.classList.remove('active');
        el.style.display = 'none';
      });
      if (step === 0) {
        document.getElementById('ms-start').style.display = 'flex';
        document.getElementById('ms-start').classList.add('active');
        var pc = document.getElementById('ms-progress-container');
        if (pc) pc.style.display = 'none';
        var lf = document.getElementById('lead-form');
        if (lf) lf.style.display = 'none';
      } else {
        var pc = document.getElementById('ms-progress-container');
        if (pc) pc.style.display = 'block';
        var lf = document.getElementById('lead-form');
        if (lf) lf.style.display = 'block';
        var el = document.getElementById('ms-step-' + step);
        if (el) { el.style.display = 'flex'; el.classList.add('active'); }
        var pct = Math.round((step / totalSteps) * 100);
        var fill = document.getElementById('ms-progress-fill');
        if (fill) fill.style.width = pct + '%';
        var counter = document.getElementById('ms-counter');
        if (counter) counter.textContent = step + ' de ' + totalSteps;
        var input = document.querySelector('#ms-step-' + step + ' .ms-input');
        if (input) setTimeout(function() { input.focus(); }, 350);
      }
      window.currentStep = step;
    };

    window.msSelectOption = function(btn) {
      var target = btn.getAttribute('data-target');
      var value = btn.getAttribute('data-value');
      document.querySelectorAll('.ms-option[data-target="' + target + '"]').forEach(function(o) {
        o.classList.remove('selected');
      });
      btn.classList.add('selected');
      var hidden = document.getElementById(target);
      if (hidden) hidden.value = value;
      var nextBtn = document.getElementById('ms-next-' + window.currentStep);
      if (nextBtn) nextBtn.style.display = 'flex';
      setTimeout(function() {
        var nb = document.getElementById('ms-next-' + window.currentStep);
        if (nb) nb.click();
      }, 400);
    };

    function validateStep(step) {
      if (step === 1) return (document.getElementById('nome') || {value:''}).value.trim().length >= 2;
      if (step === 2) return ((document.getElementById('whatsapp') || {value:''}).value.replace(/\\D/g,'').length >= 10);
      if (step === 3) return (document.getElementById('empresa') || {value:''}).value.trim().length >= 2;
      if (step === 4) return (document.getElementById('servico') || {value:''}).value !== '';
      if (step === 5) return (document.getElementById('investimento') || {value:''}).value !== '';
      if (step === 6) return (document.getElementById('prazo') || {value:''}).value !== '';
      return true;
    }

    [1, 2, 3].forEach(function(step) {
      var btn = document.getElementById('ms-next-' + step);
      if (!btn) return;
      btn.addEventListener('click', function() {
        if (validateStep(step)) {
          window.msGoTo(step + 1);
        } else {
          var input = document.querySelector('#ms-step-' + step + ' .ms-input');
          if (input) {
            input.style.borderColor = '#ef4444';
            input.focus();
            input.placeholder = 'Preencha este campo para continuar';
            setTimeout(function() {
              input.style.borderColor = '';
              input.placeholder = input.getAttribute('data-original-placeholder') || '';
            }, 2000);
          }
        }
      });
      var inp = document.querySelector('#ms-step-' + step + ' .ms-input');
      if (inp) {
        inp.setAttribute('data-original-placeholder', inp.placeholder);
        inp.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') { e.preventDefault(); btn.click(); }
        });
      }
    });

    startBtn.addEventListener('click', function() {
      window.msGoTo(1);
    });

    window.msGoTo(0);
    console.log('[MS-FORM] Initialized');
  }
  init();
})();
</script>"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove old script if present
start = content.find('<script>\n' + SCRIPT_OLD_MARKER)
if start == -1:
    start = content.find('<script>(function waitForForm')
if start != -1:
    end = content.find(SCRIPT_END_MARKER, start)
    if end != -1:
        end += len(SCRIPT_END_MARKER)
        content = content[:start] + content[end:]
        print("Removed old script")

# Inject new script before </body>
if '</body>' in content:
    content = content.replace('</body>', NEW_SCRIPT + '</body>')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("New formatted script injected!")
else:
    print("</body> not found!")
