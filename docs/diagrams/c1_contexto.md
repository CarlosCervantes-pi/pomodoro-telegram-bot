# C1 - Diagrama de Contexto
```mermaid
graph TB
    Usuario[👤 Usuario de Telegram]
    Bot[🍅 Focus Timer Bot]
    TelegramAPI[📱 Telegram API]
    
    Usuario -->|Envía comandos| Bot
    Bot -->|Responde mensajes| Usuario
    Bot -->|Usa| TelegramAPI
    
    style Bot fill:#ff6b6b
    style Usuario fill:#4ecdc4
    style TelegramAPI fill:#95e1d3
```