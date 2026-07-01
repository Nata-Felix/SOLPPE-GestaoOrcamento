# Desenvolvimento

Aplicativo Next.js do **SOLPPE Gestão de Orçamentos**.

## Preparar o ambiente

```bash
npm install
copy .env.example .env.local
npm run dev
```

Variáveis disponíveis:

- `DB_PATH`: caminho opcional para o banco SQLite.
- `N8N_WHATSAPP_WEBHOOK_URL`: endpoint privado usado pela integração de WhatsApp.

## Validação

```bash
npm run lint
npm run build
```

Arquivos `.db`, arquivos auxiliares do SQLite, PDFs gerados e variáveis locais não devem ser enviados ao GitHub.
