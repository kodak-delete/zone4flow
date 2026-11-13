@echo off
cls
echo ============================================================
echo                      ZONE4FLOW (REACT)
echo ============================================================
echo.

if not exist node_modules (
    echo Instalando dependencias, por favor espere...
    call npm install
)

echo Iniciando servidor en http://localhost:5173
call npm run dev
pause
