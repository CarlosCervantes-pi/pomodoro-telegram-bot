# Diagramas C4 – Bot de Telegram Pomodoro

A continuación se muestran los diagramas C1 y C2 del sistema, utilizando Mermaid para permitir su visualización directamente en GitHub.

---

## C1 – Diagrama de Contexto

```mermaid
flowchart TB

%% ========================== %% C1 – DIAGRAMA DE CONTEXTO %% ==========================

subgraph C1[ C1 – Contexto del Sistema ]
    U[Usuario de Telegram]
    TG[Telegram API]
    BOT[Bot Pomodoro<br>(Sistema en Node.js)]

    U -->|Envia comandos:<br>/start /pomodoro /pause /resume /status /stop| TG
    TG -->|Reenvía mensaje| BOT
    BOT -->|Responde mensajes| TG
end
```

---

## C2 – Diagrama de Contenedores

```mermaid
flowchart TB

%% ========================== %% C2 – DIAGRAMA DE CONTENEDORES %% ==========================

subgraph C2[ C2 – Contenedores del Bot Pomodoro ]
    subgraph Backend[Backend del Bot – Node.js]
        ENTRY[bot.js<br>Punto de entrada]
        CONFIG[config/<br>Configuración general]
        HANDLERS[handlers/<br>Manejadores de comandos]
        UTILS[utils/<br>Funciones auxiliares]
    end

    TG[Telegram API]
end

U[Usuario] --> TG
TG --> ENTRY
ENTRY --> CONFIG
ENTRY --> HANDLERS
ENTRY --> UTILS
```

