SCRIPT_OLD_MARKER = '(function waitForForm() {'
SCRIPT_END_MARKER = '})();\n</script>'

NEW_SCRIPT = """<script>
(function waitForForm() {
  function init() {
    var startBtn = document.getElementById('ms-btn-start-action');
    if (!startBtn) { setTimeout(init, 200); return; }

    window.currentStep = 0;
    var totalSteps = 7;
    // Steps que permitem multi-seleção
    var MULTI = [3];

    // === MASKS ===
    var nomeInput    = document.getElementById('nome');
    var whatsInput   = document.getElementById('whatsapp');
    var empresaInput = document.getElementById('empresa');

    function toTitleCase(str) {
      return str.replace(/\\b\\w/g, function(c) { return c.toUpperCase(); });
    }

    if (nomeInput) {
      nomeInput.addEventListener('keypress', function(e) {
        if (!/[a-zA-ZáàâãéèêíïóôõöúüçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÜÇÑ\\s\\-\\']/.test(e.key)) {
          e.preventDefault();
        }
      });
      nomeInput.addEventListener('input', function() {
        var pos = this.selectionStart;
        var cleaned = this.value.replace(/[0-9@#$%^&*()_+=\\[\\]{};:"\\\\|<>,.?!~`]/g, '');
        this.value = toTitleCase(cleaned.toLowerCase());
        this.setSelectionRange(Math.min(pos, this.value.length), Math.min(pos, this.value.length));
      });
    }
    if (empresaInput) {
      empresaInput.addEventListener('input', function() {
        var pos = this.selectionStart;
        this.value = toTitleCase(this.value.toLowerCase());
        this.setSelectionRange(Math.min(pos, this.value.length), Math.min(pos, this.value.length));
      });
    }
    if (whatsInput) {
      whatsInput.addEventListener('input', function() {
        var val = this.value.replace(/\\D/g, '');
        if (val.length > 11) val = val.slice(0, 11);
        var f = '';
        if (val.length === 0) f = '';
        else if (val.length <= 2) f = '(' + val;
        else if (val.length <= 6) f = '(' + val.slice(0,2) + ') ' + val.slice(2);
        else if (val.length <= 10) f = '(' + val.slice(0,2) + ') ' + val.slice(2,6) + '-' + val.slice(6);
        else f = '(' + val.slice(0,2) + ') ' + val.slice(2,7) + '-' + val.slice(7,11);
        this.value = f;
      });
      whatsInput.addEventListener('keypress', function(e) {
        if (!/[0-9]/.test(e.key)) e.preventDefault();
      });
    }

    // === NAVIGATION ===
    window.msGoTo = function(step) {
      document.querySelectorAll('.ms-screen').forEach(function(el) {
        el.classList.remove('active');
        el.style.display = 'none';
      });
      if (step === 0) {
        var s = document.getElementById('ms-start');
        if (s) { s.style.display = 'flex'; s.classList.add('active'); }
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
        var ctr = document.getElementById('ms-counter');
        if (ctr) ctr.textContent = step + ' de ' + totalSteps;
        var inp = document.querySelector('#ms-step-' + step + ' .ms-input');
        if (inp) setTimeout(function() { inp.focus(); }, 350);
      }
      window.currentStep = step;
    };

    // === OPTION SELECT (single ou multi) ===
    window.msSelectOption = function(btn) {
      var target = btn.getAttribute('data-target');
      var value  = btn.getAttribute('data-value');
      var hidden = document.getElementById(target);
      var isMulti = MULTI.indexOf(window.currentStep) !== -1;

      if (isMulti) {
        btn.classList.toggle('selected');
        var vals = [];
        document.querySelectorAll('.ms-option[data-target="' + target + '"].selected').forEach(function(o) {
          vals.push(o.getAttribute('data-value'));
        });
        if (hidden) hidden.value = vals.join(', ');
        var nb = document.getElementById('ms-next-' + window.currentStep);
        if (nb) nb.style.display = vals.length > 0 ? 'flex' : 'none';
      } else {
        document.querySelectorAll('.ms-option[data-target="' + target + '"]').forEach(function(o) {
          o.classList.remove('selected');
        });
        btn.classList.add('selected');
        if (hidden) hidden.value = value;
        var nb = document.getElementById('ms-next-' + window.currentStep);
        if (nb) nb.style.display = 'flex';
        // Auto-avança em 400ms (single select)
        setTimeout(function() {
          var nb2 = document.getElementById('ms-next-' + window.currentStep);
          if (nb2) nb2.click();
        }, 400);
      }
    };

    function validateStep(step) {
      if (step === 1) return (document.getElementById('nome')||{value:''}).value.trim().length >= 2;
      if (step === 2) return (document.getElementById('objetivo')||{value:''}).value !== '';
      if (step === 3) return (document.getElementById('servico')||{value:''}).value !== '';
      if (step === 4) return (document.getElementById('investimento')||{value:''}).value !== '';
      if (step === 5) return (document.getElementById('prazo')||{value:''}).value !== '';
      if (step === 6) return (document.getElementById('empresa')||{value:''}).value.trim().length >= 2;
      if (step === 7) return (document.getElementById('whatsapp')||{value:''}).value.replace(/\\D/g,'').length >= 10;
      return true;
    }

    // Listeners steps com input de texto (1, 6)
    [1, 6].forEach(function(step) {
      var btn = document.getElementById('ms-next-' + step);
      if (!btn) return;
      btn.addEventListener('click', function() {
        if (validateStep(step)) {
          window.msGoTo(step + 1);
        } else {
          var inp = document.querySelector('#ms-step-' + step + ' .ms-input');
          if (inp) { inp.style.borderColor = '#ef4444'; inp.focus(); setTimeout(function(){ inp.style.borderColor=''; }, 2000); }
        }
      });
      var inp = document.querySelector('#ms-step-' + step + ' .ms-input');
      if (inp) {
        inp.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') { e.preventDefault(); btn.click(); }
        });
      }
    });

    // Listener step 3 (multi-select servicos)
    var btn3 = document.getElementById('ms-next-3');
    if (btn3) {
      btn3.addEventListener('click', function() {
        if (validateStep(3)) window.msGoTo(4);
      });
    }

    startBtn.addEventListener('click', function() { window.msGoTo(1); });
    window.msGoTo(0);
    console.log('[MS-FORM] 7 steps initialized');
  }
  init();
})();
</script>"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove old waitForForm script
start = content.find('<script>\n' + SCRIPT_OLD_MARKER)
if start == -1:
    start = content.find('<script>\n(function waitForForm')
if start != -1:
    end = content.find(SCRIPT_END_MARKER, start)
    if end != -1:
        end += len(SCRIPT_END_MARKER)
        content = content[:start] + content[end:]
        print("Removed old script")
    else:
        print("WARNING: end marker not found")
else:
    print("WARNING: old script not found")

if '</body>' in content:
    content = content.replace('</body>', NEW_SCRIPT + '</body>')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("7-step controller script injected!")
else:
    print("</body> not found!")
