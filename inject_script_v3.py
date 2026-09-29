SCRIPT_OLD_MARKER = '(function waitForForm() {'
SCRIPT_END_MARKER = '})();\n</script>'

NEW_SCRIPT = """<script>
(function waitForForm() {
  function init() {
    var startBtn = document.getElementById('ms-btn-start-action');
    if (!startBtn) { setTimeout(init, 200); return; }

    window.currentStep = 0;
    var totalSteps = 6;

    // === MULTI-SELECT steps (step 4 = servicos) ===
    var MULTI_SELECT_STEPS = [4];

    // === CSS para checkbox no passo 4 ===
    var styleEl = document.createElement('style');
    styleEl.textContent = [
      '#ms-step-4 .opt-icon { border-radius: 6px !important; }',
      '#ms-step-4 .ms-option.selected .opt-icon::after { content: "" !important; width: 10px !important; height: 10px !important; background: #fff !important; border-radius: 2px !important; clip-path: polygon(14% 44%, 0% 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%) !important; }',
      '#ms-step-4 .ms-option { cursor: pointer; }',
      '#ms-step-4 .ms-multi-hint { font-size:12px; color:#64748b; margin-bottom:8px; }'
    ].join(' ');
    document.head.appendChild(styleEl);

    // Adiciona hint de multi-seleção no step 4
    var step4 = document.getElementById('ms-step-4');
    if (step4) {
      var question = step4.querySelector('.ms-question');
      if (question && !step4.querySelector('.ms-multi-hint')) {
        var hint = document.createElement('p');
        hint.className = 'ms-multi-hint';
        hint.textContent = 'Pode selecionar mais de um';
        question.insertAdjacentElement('afterend', hint);
      }
    }

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

    // === OPTION SELECTION (suporta multi e single) ===
    window.msSelectOption = function(btn) {
      var target = btn.getAttribute('data-target');
      var value = btn.getAttribute('data-value');
      var hidden = document.getElementById(target);
      var stepEl = btn.closest('[id^="ms-step-"]');
      var stepNum = stepEl ? parseInt(stepEl.getAttribute('data-step')) : null;
      var isMulti = stepNum && MULTI_SELECT_STEPS.indexOf(stepNum) !== -1;

      if (isMulti) {
        // Toggle
        btn.classList.toggle('selected');
        // Rebuild hidden value from all selected
        var selected = [];
        document.querySelectorAll('.ms-option[data-target="' + target + '"].selected').forEach(function(o) {
          selected.push(o.getAttribute('data-value'));
        });
        if (hidden) hidden.value = selected.join(', ');

        // Show "Continuar" button if at least 1 selected
        var nextBtn = document.getElementById('ms-next-' + window.currentStep);
        if (nextBtn) {
          nextBtn.style.display = selected.length > 0 ? 'flex' : 'none';
        }
      } else {
        // Single select - original behavior
        document.querySelectorAll('.ms-option[data-target="' + target + '"]').forEach(function(o) {
          o.classList.remove('selected');
        });
        btn.classList.add('selected');
        if (hidden) hidden.value = value;
        var nextBtn = document.getElementById('ms-next-' + window.currentStep);
        if (nextBtn) nextBtn.style.display = 'flex';
        // Auto advance
        setTimeout(function() {
          var nb = document.getElementById('ms-next-' + window.currentStep);
          if (nb) nb.click();
        }, 400);
      }
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
            setTimeout(function() { input.style.borderColor = ''; }, 2000);
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

    // Botão continuar do step 4 (multi-select)
    var btn4 = document.getElementById('ms-next-4');
    if (btn4) {
      btn4.addEventListener('click', function() {
        if (validateStep(4)) { window.msGoTo(5); }
      });
    }

    startBtn.addEventListener('click', function() {
      window.msGoTo(1);
    });

    window.msGoTo(0);
    console.log('[MS-FORM] Initialized with multi-select');
  }
  init();
})();
</script>"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove old waitForForm script
start = content.find('<script>\n' + SCRIPT_OLD_MARKER)
if start == -1:
    start = content.find('<script>(function waitForForm')
if start == -1:
    start = content.find('<script>\n(function waitForForm')
if start != -1:
    end = content.find(SCRIPT_END_MARKER, start)
    if end != -1:
        end += len(SCRIPT_END_MARKER)
        content = content[:start] + content[end:]
        print("Removed old script")
    else:
        print("Old script end marker not found")
else:
    print("Old script start not found")

# Inject new
if '</body>' in content:
    content = content.replace('</body>', NEW_SCRIPT + '</body>')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Multi-select script injected!")
else:
    print("</body> not found!")
