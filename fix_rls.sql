-- Desabilitar RLS para garantir que o insert do visitante funcione sem problemas de permissão
ALTER TABLE public.form_sessions DISABLE ROW LEVEL SECURITY;

-- Limpar dados de teste, se quiser
-- DELETE FROM public.form_sessions;
