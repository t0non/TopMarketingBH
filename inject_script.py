NEW_SCRIPT = """<script>
(function waitForForm() {
  function init() {
    var startBtn = document.getElementById('ms-btn-start-action');
    if (!startBtn) {
      setTimeout(init, 200);
      return;
    }

    window.currentStep = 0;
    var totalSteps = 6;

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
        if (el) {
          el.style.display = 'flex';
          el.classList.add('active');
        }
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
            setTimeout(function() { input.style.borderColor = ''; }, 1500);
          }
        }
      });
      var inp = document.querySelector('#ms-step-' + step + ' .ms-input');
      if (inp) {
        inp.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') { e.preventDefault(); btn.click(); }
        });
      }
    });

    startBtn.addEventListener('click', function() {
      window.msGoTo(1);
    });

    // Show start screen
    window.msGoTo(0);
    console.log('[MS-FORM] Initialized successfully');
  }

  init();
})();
</script>"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Check if already injected
if 'ms-btn-start-action' in content and 'waitForForm' in content:
    print("Already injected, skipping.")
elif '</body>' in content:
    content = content.replace('</body>', NEW_SCRIPT + '</body>')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Script injected into index.html!")
else:
    print("</body> not found!")
