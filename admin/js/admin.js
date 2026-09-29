/**
 * admin/js/admin.js - v2
 * Usando var (não const) no escopo global para evitar erros de redeclaração
 * quando o script é carregado mais de uma vez pelo browser.
 * ANON KEY é segura aqui — service_role fica APENAS em api/leads.js
 */

// ─── Setup Supabase (idempotente) ─────────────────────
;(function() {
  if (window._adminLoaded) return;   // já inicializado, pula tudo
  window._adminLoaded = true;

  var SB_URL  = 'https://gycpwtlwehgwxqyrmbzt.supabase.co';
  var SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Y3B3dGx3ZWhnd3hxeXJtYnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2MjgwNTMsImV4cCI6MjEwNjIwNDA1M30.kq7O_qT9NnkSEtjZ8bXnsbU-7yf5wW4VwpwJ4H9lrnA';

  if (!window._sb) {
    window._sb = window.supabase.createClient(SB_URL, SB_ANON);
  }
})();

// Atalho global (sem const para evitar conflito)
var supabase = window._sb;

// ─── Auth Guard ───────────────────────────────────────
async function requireAuth() {
  try {
    var result = await window._sb.auth.getUser();
    var user   = result.data && result.data.user;
    var error  = result.error;
    if (error || !user) {
      console.log('[Admin] Sem sessão válida → login. Erro:', error && error.message);
      window.location.replace('/admin/login');
      return null;
    }
    return user;
  } catch(e) {
    console.error('[Admin] Falha no auth:', e);
    window.location.replace('/admin/login');
    return null;
  }
}

// ─── Logout ───────────────────────────────────────────
async function adminLogout() {
  await window._sb.auth.signOut();
  window.location.replace('/admin/login');
}

// ─── Sidebar ──────────────────────────────────────────
function injectSidebar(activePage) {
  var nav = [
    { href: '/admin',            label: 'Dashboard',  page: 'dashboard',  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>' },
    { href: '/admin/leads',      label: 'Leads',      page: 'leads',      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { href: '/admin/sessoes',    label: 'Ao Vivo',    page: 'sessoes',    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14"/></svg>' },
    { href: '/admin/clientes',   label: 'Clientes',   page: 'clientes',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>' },
    { href: '/admin/relatorios', label: 'Relatórios', page: 'relatorios', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
  ];

  var navItems = nav.map(function(n) {
    return '<a href="' + n.href + '" class="nav-item' + (activePage === n.page ? ' active' : '') + '">' + n.icon + ' ' + n.label + '</a>';
  }).join('');

  var sidebarHTML = `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <img src="/formulario/logo.png" alt="Top Marketing BH">
        <div>
          <div class="sidebar-brand-text">Top Marketing</div>
          <div class="sidebar-brand-sub">Painel Admin</div>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-label">Menu</div>
        ${navItems}
      </nav>
      <div class="sidebar-footer">
        <button class="nav-item" onclick="adminLogout()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Sair
        </button>
      </div>
    </aside>
    <div class="sidebar-overlay" id="sidebar-overlay" onclick="closeSidebar()"></div>
  `;

  var topbarHTML = `
    <div class="admin-topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="menu-toggle" onclick="toggleSidebar()">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <span class="topbar-title" id="page-title">Dashboard</span>
      </div>
      <div class="topbar-right">
        <span id="user-email" style="font-size:12px;color:var(--gray-400);"></span>
        <button class="btn btn-secondary btn-sm" onclick="adminLogout()">Sair</button>
      </div>
    </div>
  `;

  document.getElementById('sidebar-placeholder').innerHTML = sidebarHTML;
  document.getElementById('topbar-placeholder').innerHTML  = topbarHTML;

  window._sb.auth.getUser().then(function(r) {
    var el = document.getElementById('user-email');
    if (el && r.data && r.data.user) el.textContent = r.data.user.email;
  });
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}

// ─── Toast ────────────────────────────────────────────
function showToast(message, type) {
  type = type || 'success';
  var container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  var toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(function() { toast.remove(); }, 3500);
}

// ─── Status Badge ─────────────────────────────────────
function statusBadge(status) {
  var map = { novo:'Novo', contato:'Contato', qualificado:'Qualificado', reuniao:'Reunião', proposta:'Proposta', cliente:'Cliente', perdido:'Perdido', incompleto:'Incompleto' };
  return '<span class="badge badge-' + (status || 'novo') + '">' + (map[status] || status) + '</span>';
}

// ─── Origem ───────────────────────────────────────────
function detectOrigem(lead) {
  var src = (lead.utm_source || '').toLowerCase();
  var ref = (lead.referrer  || '').toLowerCase();
  if (src.indexOf('google') >= 0 || lead.gclid) return 'Google Ads';
  if (src.indexOf('facebook') >= 0 || src.indexOf('instagram') >= 0 || src.indexOf('meta') >= 0 || lead.fbclid) return 'Meta Ads';
  if (!src && ref && (ref.indexOf('google') >= 0 || ref.indexOf('bing') >= 0)) return 'Orgânico';
  if (!src && !ref) return 'Direto';
  return src ? src.charAt(0).toUpperCase() + src.slice(1) : 'Outro';
}

// ─── Datas e Moeda ────────────────────────────────────
function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('pt-BR', { day:'2-digit', month:'2-digit', year:'2-digit', hour:'2-digit', minute:'2-digit' });
}
function fmtDateShort(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'2-digit' });
}
function fmtCurrency(val) {
  if (!val && val !== 0) return '—';
  return 'R$ ' + parseFloat(val).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

// ─── Paginação ────────────────────────────────────────
function buildPagination(current, total, perPage, onPage) {
  var totalPages = Math.ceil(total / perPage);
  var from = total === 0 ? 0 : (current - 1) * perPage + 1;
  var to   = Math.min(current * perPage, total);
  return `
    <div class="pagination">
      <span class="pagination-info">${from}–${to} de ${total} lead${total !== 1 ? 's' : ''}</span>
      <div class="pagination-btns">
        <button class="btn btn-secondary btn-sm" onclick="${onPage}(${current - 1})" ${current <= 1 ? 'disabled' : ''}>← Anterior</button>
        <button class="btn btn-secondary btn-sm" onclick="${onPage}(${current + 1})" ${current >= totalPages ? 'disabled' : ''}>Próxima →</button>
      </div>
    </div>
  `;
}

// ─── WhatsApp ─────────────────────────────────────────
function buildWhatsAppUrl(phone, name) {
  var digits = phone ? phone.replace(/\D/g, '') : '';
  var msg = encodeURIComponent('Olá, ' + name + '! Aqui é o Eduardo, da Top Marketing BH.');
  return 'https://wa.me/' + digits + '?text=' + msg;
}
