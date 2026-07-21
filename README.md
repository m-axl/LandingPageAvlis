# Landing Page Avlis

Landing page React/Vite com formulário de orçamento e envio de e-mail por uma função serverless da Vercel.

## Arquitetura

- `src/`: frontend React/Vite.
- `server/`: backend, com regras de negócio e integração Resend.
- `api/`: adaptador HTTP serverless da Vercel; encaminha para `server/`.
- `tests/`: testes unitários do backend.
- `.github/`: CI, deploy e triagem de bugs.
