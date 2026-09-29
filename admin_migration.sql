-- =====================================================
-- ADMIN MIGRATION - Top Marketing BH
-- Execute no Supabase SQL Editor
-- Seguro para rodar múltiplas vezes (IF NOT EXISTS)
-- =====================================================

-- 1. Adicionar campos novos à tabela leads
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notes       TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS loss_reason TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS objetivo    TEXT;

-- 2. Criar tabela de histórico de status
CREATE TABLE IF NOT EXISTS public.lead_status_history (
  id          BIGSERIAL PRIMARY KEY,
  lead_id     TEXT NOT NULL REFERENCES public.leads(lead_id) ON DELETE CASCADE,
  old_status  TEXT,
  new_status  TEXT NOT NULL,
  changed_by  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_history_lead_id    ON public.lead_status_history(lead_id);
CREATE INDEX IF NOT EXISTS idx_history_created_at ON public.lead_status_history(created_at DESC);

-- 3. RLS na tabela lead_status_history
ALTER TABLE public.lead_status_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "deny_anon_history"        ON public.lead_status_history;
DROP POLICY IF EXISTS "admin_read_history"        ON public.lead_status_history;
DROP POLICY IF EXISTS "admin_insert_history"      ON public.lead_status_history;

CREATE POLICY "deny_anon_history" ON public.lead_status_history
  FOR ALL TO anon USING (false);

CREATE POLICY "admin_read_history" ON public.lead_status_history
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "admin_insert_history" ON public.lead_status_history
  FOR INSERT TO authenticated WITH CHECK (true);

-- 4. RLS na tabela leads: autenticados podem ler e atualizar
DROP POLICY IF EXISTS "admin_read_leads"   ON public.leads;
DROP POLICY IF EXISTS "admin_update_leads" ON public.leads;

CREATE POLICY "admin_read_leads" ON public.leads
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "admin_update_leads" ON public.leads
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- 5. Atualizar trigger para respeitar timestamps de status
CREATE OR REPLACE FUNCTION update_leads_timestamps()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  -- Apenas seta qualified_at na PRIMEIRA transição para qualificado
  IF NEW.status = 'qualificado' AND OLD.status != 'qualificado' AND OLD.qualified_at IS NULL THEN
    NEW.qualified_at = NOW();
  END IF;
  -- Apenas seta closed_at na PRIMEIRA transição para cliente
  IF NEW.status = 'cliente' AND OLD.status != 'cliente' AND OLD.closed_at IS NULL THEN
    NEW.closed_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_leads_timestamps ON public.leads;
CREATE TRIGGER trigger_leads_timestamps
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION update_leads_timestamps();

-- Confirmação
SELECT 'Migration executada com sucesso!' as resultado;
