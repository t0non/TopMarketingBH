-- =====================================================
-- MIGRATION: Tabela form_sessions - Rastreamento em Tempo Real
-- Execute no Supabase SQL Editor
-- Seguro para rodar múltiplas vezes (IF NOT EXISTS)
-- =====================================================

-- 1. Criar tabela de sessões do formulário
CREATE TABLE IF NOT EXISTS public.form_sessions (
  id              BIGSERIAL PRIMARY KEY,
  session_id      TEXT NOT NULL UNIQUE,
  lead_id         TEXT,

  -- Status da sessão
  status          TEXT NOT NULL DEFAULT 'em_progresso'
                  CHECK (status IN ('em_progresso','abandonado','preenchido')),
  current_step    INT NOT NULL DEFAULT 0,
  max_step        INT NOT NULL DEFAULT 0,

  -- Dados capturados em tempo real
  nome            TEXT,
  whatsapp        TEXT,
  empresa         TEXT,
  objetivo        TEXT,
  servico         TEXT,
  investimento    TEXT,
  prazo           TEXT,

  -- Origem / Attribution
  utm_source      TEXT,
  utm_campaign    TEXT,
  gclid           TEXT,

  -- Contexto
  device          TEXT,
  page_url        TEXT,

  -- Timestamps
  started_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  abandoned_at    TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ
);

-- 2. Índices
CREATE INDEX IF NOT EXISTS idx_form_sessions_status     ON public.form_sessions(status);
CREATE INDEX IF NOT EXISTS idx_form_sessions_updated    ON public.form_sessions(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_sessions_started    ON public.form_sessions(started_at DESC);

-- 3. RLS (Row Level Security)
ALTER TABLE public.form_sessions ENABLE ROW LEVEL SECURITY;

-- Anon pode inserir sessões (visitante do formulário)
DROP POLICY IF EXISTS "anon_insert_sessions" ON public.form_sessions;
CREATE POLICY "anon_insert_sessions" ON public.form_sessions
  FOR INSERT TO anon WITH CHECK (true);

-- Anon pode atualizar sessões (para tracking em tempo real)
DROP POLICY IF EXISTS "anon_update_sessions" ON public.form_sessions;
CREATE POLICY "anon_update_sessions" ON public.form_sessions
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Anon pode ler (necessário para upsert funcionar)
DROP POLICY IF EXISTS "anon_select_sessions" ON public.form_sessions;
CREATE POLICY "anon_select_sessions" ON public.form_sessions
  FOR SELECT TO anon USING (true);

-- Authenticated (admin) pode ler tudo
DROP POLICY IF EXISTS "admin_read_sessions" ON public.form_sessions;
CREATE POLICY "admin_read_sessions" ON public.form_sessions
  FOR SELECT TO authenticated USING (true);

-- Authenticated (admin) pode atualizar (cleanup de sessões antigas)
DROP POLICY IF EXISTS "admin_update_sessions" ON public.form_sessions;
CREATE POLICY "admin_update_sessions" ON public.form_sessions
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- 4. Habilitar Realtime para esta tabela
-- NOTA: Se der erro, execute separadamente:
ALTER PUBLICATION supabase_realtime ADD TABLE public.form_sessions;

-- 5. Atualizar CHECK constraint da tabela leads para incluir 'incompleto'
-- (o API já salva leads parciais com status 'incompleto')
DO $$
BEGIN
  ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_status_check;
  ALTER TABLE public.leads ADD CONSTRAINT leads_status_check
    CHECK (status IN ('novo','contato','qualificado','reuniao','proposta','cliente','perdido','incompleto'));
EXCEPTION
  WHEN others THEN
    RAISE NOTICE 'Constraint update skipped: %', SQLERRM;
END $$;

-- Confirmação
SELECT 'Migration form_sessions executada com sucesso!' as resultado;
