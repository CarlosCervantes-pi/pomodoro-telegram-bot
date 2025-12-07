flowchart TB

%% ========================
%% C1 – DIAGRAMA DE CONTEXTO
%% ========================
subgraph C1[ C1 – Contexto del Sistema ]
    U[Usuario de Telegram]
    TG[Telegram API]
    BOT[Bot Pomodoro<br>(Sistema en Node.js)]

    U -->|Envia comandos /start /pomodoro /pause /resume /status /stop| TG
    TG -->|Reenvía mensaje| BOT
    BOT -->|Responde mensajes| TG
end


%% ========================
%% C2 – DIAGRAMA DE CONTENEDORES
%% ========================
subgraph C2[ C2 – Contenedores del Bot Pomodoro ]
    
    subgraph Backend[Bot Pomodoro Backend – Node.js]
        ENTRY[bot.js<br>Punto de entrada]
        
        subgraph HandlersCont[Módulo Handlers]
            Hstart[startHandler]
            Hpomodoro[pomodoroHandler]
            Hpause[pauseHandler]
            Hresume[resumeHandler]
            Hstatus[statusHandler]
            Hstop[stopHandler]
        end

        subgraph UtilsCont[Módulos Utils]
            SM[sessionManager<br>(gestiona sesiones)]
            TL[timerLogic<br>(lógica de temporizador)]
            MSG[messages<br>(mensajes predefinidos)]
        end

        subgraph ConfigCont[Config]
            CST[constants]
        end

        MEMORY[(Memoria en RAM<br>Map de sesiones por usuario)]
    end

    TG -. Webhook .-> ENTRY
    ENTRY --> HandlersCont
    ENTRY --> UtilsCont
    Entry --> ConfigCont

    HandlersCont --> SM
    HandlersCont --> TL
    HandlersCont --> MSG
    SM --> MEMORY
    TL --> SM
end


%% ========================
%% C3 – DIAGRAMA DE COMPONENTES (detallado)
%% ========================
subgraph C3[ C3 – Componentes Internos del Backend ]

    subgraph C3Handlers[Componentes: Handlers]
        Hstart2[startHandler]
        Hpomodoro2[pomodoroHandler]
        Hpause2[pauseHandler]
        Hresume2[resumeHandler]
        Hstatus2[statusHandler]
        Hstop2[stopHandler]
    end

    subgraph C3Utils[Componentes: Utils]
        SM2[sessionManager]
        TL2[timerLogic]
        MSG2[messages]
    end

    subgraph C3Config[Config]
        CST2[constants]
    end

    %% Conexiones
    ENTRY --> Hstart2 & Hpomodoro2 & Hpause2 & Hresume2 & Hstatus2 & Hstop2
    Hpomodoro2 --> SM2
    Hpomodoro2 --> TL2
    Hstop2 --> SM2
    SM2 --> MEMORY
    TL2 --> SM2
    ENTRY --> CST2
end


%% ========================
%% C4 – DIAGRAMA DE CÓDIGO
%% ========================
subgraph C4[ C4 – Nivel Código ]
    file_bot[bot.js]

    subgraph FolderHandlers[src/handlers]
        f_start[startHandler.js]
        f_pomodoro[pomodoroHandler.js]
        f_pause[pauseHandler.js]
        f_resume[resumeHandler.js]
        f_status[statusHandler.js]
        f_stop[stopHandler.js]
    end

    subgraph FolderUtils[src/utils]
        f_sm[sessionManager.js]
        f_tl[timerLogic.js]
        f_msg[messages.js]
    end

    subgraph FolderConfig[src/config]
        f_constants[constants.js]
    end

    file_bot --> FolderHandlers
    file_bot --> FolderUtils
    file_bot --> FolderConfig

    FolderHandlers --> f_sm
    FolderHandlers --> f_tl
    FolderHandlers --> f_msg

    f_sm --> MEMORY
    f_tl --> f_sm
end
