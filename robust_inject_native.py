import re

path = '_next/static/chunks/app/page-bce41186862bd658.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'__html:(\'|")(.*?lead-form.*?)(\1)', content)
if match:
    print("Found native form block!")
    
    NEW_FORM = r"""<div class="max-w-xl mx-auto text-left bg-slate-50 p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 mt-8" id="form-container">
<style>
#ms-form-wrapper { position:relative; overflow:hidden; }
.ms-screen { display:none; flex-direction:column; gap:16px; animation: slideIn 0.35s cubic-bezier(0.22,1,0.36,1); }
.ms-screen.active { display:flex; }
.ms-screen.exit { animation: slideOut 0.3s ease forwards; }
@keyframes slideIn { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
@keyframes slideOut { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(-40px); } }
.ms-progress-bar { height:4px; background:#e2e8f0; border-radius:4px; margin-bottom:20px; }
.ms-progress-fill { height:100%; background:linear-gradient(90deg,#2563eb,#3b82f6); border-radius:4px; transition:width 0.4s ease; }
.ms-label { font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#64748b; margin-bottom:6px; }
.ms-question { font-size:20px; font-weight:700; color:#0f172a; margin-bottom:16px; line-height:1.3; }
.ms-input { width:100%; padding:14px 16px; border:2px solid #e2e8f0; border-radius:12px; font-size:16px; outline:none; transition:border-color 0.2s; background:#fff; }
.ms-input:focus { border-color:#2563eb; }
.ms-options { display:flex; flex-direction:column; gap:10px; }
.ms-option { display:flex; align-items:center; gap:12px; padding:14px 16px; border:2px solid #e2e8f0; border-radius:12px; cursor:pointer; transition:all 0.2s; background:#fff; text-align:left; font-size:15px; font-weight:500; color:#1e293b; }
.ms-option:hover { border-color:#2563eb; background:#eff6ff; }
.ms-option.selected { border-color:#2563eb; background:#eff6ff; color:#2563eb; font-weight:700; }
.ms-option .opt-icon { width:20px; height:20px; border:2px solid #cbd5e1; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; transition:all 0.2s; }
.ms-option.selected .opt-icon { border-color:#2563eb; background:#2563eb; }
.ms-option.selected .opt-icon::after { content:""; width:8px; height:8px; background:#fff; border-radius:50%; display:block; }
.ms-btn-next { margin-top:8px; display:inline-flex; align-items:center; justify-content:center; gap:8px; border-radius:999px; background:#2563eb; color:#fff; height:52px; padding:0 32px; font-size:15px; font-weight:800; width:100%; cursor:pointer; border:none; transition:all 0.2s; letter-spacing:0.02em; }
.ms-btn-next:hover { background:#1d4ed8; transform:scale(1.02); box-shadow:0 0 30px rgba(37,99,235,0.4); }
.ms-btn-next:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
.ms-btn-back { background:none; border:none; color:#64748b; font-size:13px; cursor:pointer; padding:4px 0; text-decoration:underline; margin-top:4px; }
.ms-start-screen { text-align:center; padding:8px 0; }
.ms-start-icon { font-size:40px; margin-bottom:12px; }
.ms-start-title { font-size:22px; font-weight:800; color:#0f172a; margin-bottom:8px; }
.ms-start-sub { font-size:14px; color:#64748b; margin-bottom:24px; line-height:1.5; }
.ms-btn-start { display:inline-flex; align-items:center; justify-content:center; gap:8px; border-radius:999px; background:linear-gradient(135deg,#2563eb,#1d4ed8); color:#fff; height:58px; padding:0 36px; font-size:16px; font-weight:900; width:100%; cursor:pointer; border:none; transition:all 0.3s; box-shadow:0 4px 20px rgba(37,99,235,0.35); letter-spacing:0.02em; }
.ms-btn-start:hover { transform:scale(1.03); box-shadow:0 8px 30px rgba(37,99,235,0.5); }
.ms-counter { font-size:12px; color:#94a3b8; text-align:right; margin-bottom:4px; }
</style>

<div id="ms-form-wrapper">
  <!-- Tela de início -->
  <div id="ms-start" class="ms-screen active ms-start-screen">
    <div class="ms-start-icon">📊</div>
    <div class="ms-start-title">Análise Gratuita da Sua Empresa</div>
    <div class="ms-start-sub">Responda 6 perguntas rápidas e descubra como dobrar seus clientes com Google Ads em BH. Leva menos de 2 minutos.</div>
    <button type="button" class="ms-btn-start" id="ms-btn-start-action">Quero minha análise gratuita &#8594;</button>
    <p style="font-size:11px;color:#94a3b8;margin-top:12px;">100% gratuito &bull; Sem compromisso &bull; Resposta em até 24h</p>
  </div>

  <!-- Progress bar (hidden on start) -->
  <div id="ms-progress-container" style="display:none;">
    <div class="ms-counter" id="ms-counter">1 de 6</div>
    <div class="ms-progress-bar"><div class="ms-progress-fill" id="ms-progress-fill" style="width:16%"></div></div>
  </div>

  <form id="lead-form" style="display:none;">
    <!-- Campos hidden para tracking -->
    <input type="hidden" id="utm_source" name="utm_source">
    <input type="hidden" id="utm_medium" name="utm_medium">
    <input type="hidden" id="utm_campaign" name="utm_campaign">
    <input type="hidden" id="utm_term" name="utm_term">
    <input type="hidden" id="utm_content" name="utm_content">
    <input type="hidden" id="gclid" name="gclid">
    <input type="hidden" id="fbclid" name="fbclid">
    <input type="hidden" id="gbraid" name="gbraid">
    <input type="hidden" id="wbraid" name="wbraid">
    <input type="hidden" id="landing_page" name="landing_page">
    <input type="hidden" id="data_hora" name="data_hora">

    <!-- Step 1: Nome -->
    <div class="ms-screen" id="ms-step-1" data-step="1">
      <div>
        <div class="ms-label">Passo 1</div>
        <div class="ms-question">Qual o seu nome completo?</div>
        <input type="text" id="nome" name="nome" required class="ms-input" placeholder="Ex: João Silva" autocomplete="name">
      </div>
      <button type="button" class="ms-btn-next" id="ms-next-1">Continuar &#8594;</button>
    </div>

    <!-- Step 2: WhatsApp -->
    <div class="ms-screen" id="ms-step-2" data-step="2">
      <div>
        <div class="ms-label">Passo 2</div>
        <div class="ms-question">Qual o seu WhatsApp?</div>
        <input type="tel" id="whatsapp" name="whatsapp" required class="ms-input" placeholder="(31) 99999-9999" autocomplete="tel">
      </div>
      <button type="button" class="ms-btn-next" id="ms-next-2">Continuar &#8594;</button>
      <button type="button" class="ms-btn-back" onclick="msGoTo(1)">&#8592; Voltar</button>
    </div>

    <!-- Step 3: Empresa -->
    <div class="ms-screen" id="ms-step-3" data-step="3">
      <div>
        <div class="ms-label">Passo 3</div>
        <div class="ms-question">Qual o nome da sua empresa?</div>
        <input type="text" id="empresa" name="empresa" required class="ms-input" placeholder="Ex: Clínica Saúde Total" autocomplete="organization">
      </div>
      <button type="button" class="ms-btn-next" id="ms-next-3">Continuar &#8594;</button>
      <button type="button" class="ms-btn-back" onclick="msGoTo(2)">&#8592; Voltar</button>
    </div>

    <!-- Step 4: Serviço -->
    <div class="ms-screen" id="ms-step-4" data-step="4">
      <div>
        <div class="ms-label">Passo 4</div>
        <div class="ms-question">Qual serviço você procura?</div>
        <input type="hidden" id="servico" name="servico" required>
        <div class="ms-options" id="ms-opts-servico">
          <button type="button" class="ms-option" data-target="servico" data-value="Google Ads" onclick="msSelectOption(this)"><span class="opt-icon"></span>Google Ads</button>
          <button type="button" class="ms-option" data-target="servico" data-value="Meta Ads" onclick="msSelectOption(this)"><span class="opt-icon"></span>Meta Ads</button>
          <button type="button" class="ms-option" data-target="servico" data-value="Site/Landing Page" onclick="msSelectOption(this)"><span class="opt-icon"></span>Site / Landing Page</button>
          <button type="button" class="ms-option" data-target="servico" data-value="Gestão completa" onclick="msSelectOption(this)"><span class="opt-icon"></span>Gestão Completa</button>
        </div>
      </div>
      <button type="button" class="ms-btn-next" id="ms-next-4" style="display:none;">Continuar &#8594;</button>
      <button type="button" class="ms-btn-back" onclick="msGoTo(3)">&#8592; Voltar</button>
    </div>

    <!-- Step 5: Investimento -->
    <div class="ms-screen" id="ms-step-5" data-step="5">
      <div>
        <div class="ms-label">Passo 5</div>
        <div class="ms-question">Quanto pretende investir em anúncios por mês?</div>
        <p style="font-size:12px;color:#64748b;margin:-8px 0 12px;">Investimento mínimo de R$500/mês</p>
        <input type="hidden" id="investimento" name="investimento" required>
        <div class="ms-options">
          <button type="button" class="ms-option" data-target="investimento" data-value="R$500-1.000" onclick="msSelectOption(this)"><span class="opt-icon"></span>R$500 a R$1.000 / mês</button>
          <button type="button" class="ms-option" data-target="investimento" data-value="R$1.000-2.000" onclick="msSelectOption(this)"><span class="opt-icon"></span>R$1.000 a R$2.000 / mês</button>
          <button type="button" class="ms-option" data-target="investimento" data-value="R$2.000+" onclick="msSelectOption(this)"><span class="opt-icon"></span>Mais de R$2.000 / mês</button>
        </div>
      </div>
      <button type="button" class="ms-btn-next" id="ms-next-5" style="display:none;">Continuar &#8594;</button>
      <button type="button" class="ms-btn-back" onclick="msGoTo(4)">&#8592; Voltar</button>
    </div>

    <!-- Step 6: Prazo -->
    <div class="ms-screen" id="ms-step-6" data-step="6">
      <div>
        <div class="ms-label">Passo 6</div>
        <div class="ms-question">Quando você quer começar?</div>
        <input type="hidden" id="prazo" name="prazo" required>
        <div class="ms-options">
          <button type="button" class="ms-option" data-target="prazo" data-value="Agora" onclick="msSelectOption(this)"><span class="opt-icon"></span>Agora</button>
          <button type="button" class="ms-option" data-target="prazo" data-value="Neste mês" onclick="msSelectOption(this)"><span class="opt-icon"></span>Neste mês</button>
          <button type="button" class="ms-option" data-target="prazo" data-value="Estou pesquisando" onclick="msSelectOption(this)"><span class="opt-icon"></span>Estou pesquisando</button>
        </div>
      </div>
      <button type="submit" id="btn-submit" class="ms-btn-next" style="display:none;background:linear-gradient(135deg,#16a34a,#15803d);box-shadow:0 4px 20px rgba(22,163,74,0.35);">&#10003; Receber análise da minha empresa</button>
      <button type="button" class="ms-btn-back" onclick="msGoTo(5)">&#8592; Voltar</button>
    </div>
  </form>

  <div id="form-loading" class="hidden text-center py-4 text-blue-600 font-bold text-lg">Aguarde, enviando seus dados...</div>
</div>
</div>

<script>
window.msGoTo = function(step) {
  var totalSteps = 6;
  document.querySelectorAll('.ms-screen').forEach(function(el){
    el.classList.remove('active','exit');
    el.style.display = 'none';
  });
  document.getElementById('ms-start').style.display = 'none';

  if (step === 0) {
    document.getElementById('ms-start').style.display = 'flex';
    document.getElementById('ms-start').classList.add('active');
    document.getElementById('ms-progress-container').style.display = 'none';
    document.getElementById('lead-form').style.display = 'none';
  } else {
    document.getElementById('ms-progress-container').style.display = 'block';
    document.getElementById('lead-form').style.display = 'block';
    var el = document.getElementById('ms-step-' + step);
    if (el) {
      el.style.display = 'flex';
      el.classList.add('active');
    }
    var pct = Math.round((step / totalSteps) * 100);
    document.getElementById('ms-progress-fill').style.width = pct + '%';
    document.getElementById('ms-counter').textContent = step + ' de ' + totalSteps;
    var input = document.querySelector('#ms-step-' + step + ' .ms-input');
    if (input) setTimeout(function(){ input.focus(); }, 350);
  }
  window.currentStep = step;
};

window.msSelectOption = function(btn) {
  var target = btn.getAttribute('data-target');
  var value = btn.getAttribute('data-value');
  document.querySelectorAll('.ms-option[data-target="' + target + '"]').forEach(function(o){ o.classList.remove('selected'); });
  btn.classList.add('selected');
  var hidden = document.getElementById(target);
  if (hidden) hidden.value = value;
  var nextBtn = document.getElementById('ms-next-' + window.currentStep);
  if (nextBtn) nextBtn.style.display = 'flex';
  setTimeout(function(){
    var nb = document.getElementById('ms-next-' + window.currentStep);
    if (nb) nb.click();
  }, 400);
};

(function(){
  window.currentStep = 0;
  var totalSteps = 6;

  function validateStep(step) {
    if (step === 1) {
      var v = document.getElementById('nome').value.trim();
      return v.length >= 2;
    }
    if (step === 2) {
      var v = document.getElementById('whatsapp').value.trim();
      return v.replace(/\D/g,'').length >= 10;
    }
    if (step === 3) {
      var v = document.getElementById('empresa').value.trim();
      return v.length >= 2;
    }
    if (step === 4) return document.getElementById('servico').value !== '';
    if (step === 5) return document.getElementById('investimento').value !== '';
    if (step === 6) return document.getElementById('prazo').value !== '';
    return true;
  }

  [1,2,3].forEach(function(step){
    var btn = document.getElementById('ms-next-' + step);
    if (!btn) return;
    btn.addEventListener('click', function(){
      if (validateStep(step)) {
        window.msGoTo(step + 1);
        if (typeof fireEvent === 'function') fireEvent('form_step', { step: step });
      } else {
        var input = document.querySelector('#ms-step-' + step + ' .ms-input');
        if (input) { input.style.borderColor = '#ef4444'; input.focus(); setTimeout(function(){ input.style.borderColor=''; }, 1500); }
      }
    });
    var inp = document.querySelector('#ms-step-' + step + ' .ms-input');
    if (inp) {
      inp.addEventListener('keydown', function(e){ if(e.key==='Enter'){ e.preventDefault(); btn.click(); } });
    }
  });

  document.getElementById('ms-btn-start-action').addEventListener('click', function(){
    if (typeof fireEvent === 'function') fireEvent('form_start');
    window.msGoTo(1);
  });

  window.msGoTo(0);
})();
</script>
"""
    quote = match.group(1)
    safe_new_form = NEW_FORM.replace('\n', ' ')
    if quote == "'":
        safe_new_form = safe_new_form.replace("'", "\\'")
    else:
        safe_new_form = safe_new_form.replace('"', '\\"')
        
    new_content = content[:match.start(2)] + safe_new_form + content[match.end(2):]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Injected native multi-step form!")
else:
    print("Native form snippet not found!")
