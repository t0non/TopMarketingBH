@echo off
echo ==========================================
echo      CONFIGURADOR AUTOMATICO DE GITHUB
echo ==========================================
echo.

:: Verifica se o GIT esta instalado
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] O Git nao foi encontrado no seu computador.
    echo Por favor, instale o Git baixando em: https://git-scm.com/download/win
    echo Apos instalar, feche e abra este terminal novamente.
    pause
    exit /b
)

echo [1/5] Inicializando o repositorio...
if not exist .git (
    git init
    echo Repositorio iniciado!
) else (
    echo Repositorio ja existe.
)
echo.

echo [2/5] Adicionando arquivos (isso pode demorar um pouco)...
git add .
echo.

echo [3/5] Criando o commit inicial...
git commit -m "Upload inicial do site TopMarketingBH"
echo.

echo [4/5] Configurando branch principal...
git branch -M main
echo.

echo ==========================================
echo AGORA PRECISAMOS DO LINK DO SEU REPOSITORIO
echo Exemplo: https://github.com/SEU-USUARIO/NOME-DO-SITE.git
echo ==========================================
set /p REPO_URL="Cole o link do repositorio aqui e aperte ENTER: "

if "%REPO_URL%"=="" (
    echo Voce nao digitou nada. O processo foi cancelado.
    pause
    exit /b
)

echo.
echo [5/5] Enviando para o GitHub...
git remote remove origin >nul 2>nul
git remote add origin %REPO_URL%
git push -u origin main

echo.
echo ==========================================
if %errorlevel% equ 0 (
    echo [SUCESSO] Seu site foi enviado para o GitHub!
) else (
    echo [ERRO] Algo deu errado no envio. Verifique se o link esta correto e se voce tem permissao.
)
echo ==========================================
pause