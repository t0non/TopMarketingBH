-- =====================================================
-- MIGRATION: Tabela de Leads - Top Marketing BH
-- Executar no Supabase SQL Editor
-- =====================================================

CREATE TABLE IF NOT EXISTS public.leads (
  id                          BIGSERIAL PRIMARY KEY,
  lead_id                     TEXT NOT NULL UNIQUE,

  -- Dados do Lead
  nome                        TEXT NOT NULL,
  telefone                    TEXT NOT NULL,
  empresa                     TEXT,
  objetivo                    TEXT,
  servicos                    TEXT,
  orcamento_anuncios          TEXT,
  prazo_inicio                TEXT,

  -- Parâmetros de Click Attribution (Google Ads)
  gclid                       TEXT,
  gbraid                      TEXT,
  wbraid                      TEXT,
  fbclid                      TEXT,

  -- UTMs
  utm_source                  TEXT,
  utm_medium                  TEXT,
  utm_campaign                TEXT,
  utm_term                    TEXT,
  utm_content                 TEXT,

  -- Contexto de Origem
  landing_page                TEXT,
  referrer                    TEXT,
  first_touch_source          TEXT,
  first_touch_medium          TEXT,
  first_touch_campaign        TEXT,
  first_touch_gclid           TEXT,
  first_touch_at              TIMESTAMPTZ,
  user_agent                  TEXT,
  ip                          TEXT,

  -- Status do Lead no CRM
  status                      TEXT NOT NULL DEFAULT 'novo'
                              CHECK (status IN ('novo','contato','qualificado','reuniao','proposta','cliente','perdido')),

  -- Dados de Conversão / Venda
  valor_venda                 NUMERIC(10,2),
  currency                    TEXT NOT NULL DEFAULT 'BRL',

  -- Timestamps de Funil
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  qualified_at                TIMESTAMPTZ,
  closed_at                   TIMESTAMPTZ,

  -- Controle de Envio para Google Ads Offline Conversions
  qualified_sent_to_google    BOOLEAN NOT NULL DEFAULT FALSE,
  converted_sent_to_google    BOOLEAN NOT NULL DEFAULT FALSE,
  qualified_sent_at           TIMESTAMPTZ,
  converted_sent_at           TIMESTAMPTZ
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_leads_lead_id         ON public.leads(lead_id);
CREATE INDEX IF NOT EXISTS idx_leads_status          ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_gclid           ON public.leads(gclid);
CREATE INDEX IF NOT EXISTS idx_leads_created_at      ON public.leads(created_at DESC);

-- Trigger para auto-atualizar updated_at e qualified_at/closed_at
CREATE OR REPLACE FUNCTION update_leads_timestamps()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  IF NEW.status = 'qualificado' AND OLD.status != 'qualificado' AND OLD.qualified_at IS NULL THEN
    NEW.qualified_at = NOW();
  END IF;
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

-- RLS: somente service role acessa (nenhum acesso via anon/frontend)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "deny_anon" ON public.leads;
CREATE POLICY "deny_anon" ON public.leads FOR ALL TO anon USING (false);
