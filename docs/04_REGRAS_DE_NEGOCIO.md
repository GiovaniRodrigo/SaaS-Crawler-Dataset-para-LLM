# Regras de Negócio

## Requisitos Funcionais

| Código | Regra | Descrição | Status |
|---|---|---|---|
| RF-001 | Cadastro de projeto | Usuário autenticado pode criar projetos com nome obrigatório | Existente |
| RF-002 | Cadastro de domínio | Projeto pode ter domínios autorizados | Existente |
| RF-003 | Execução de crawler | Job pode ser executado em segundo plano se não estiver rodando | Existente |
| RF-004 | Exportação JSONL | Projeto pode exportar documentos e chunks em JSONL | Existente |
| RF-005 | Captura por extensão | Usuário autenticado por Sanctum pode enviar captura para um projeto próprio | Parcial |
| RF-006 | Revisão de conteúdo | Documento deve poder ser aprovado antes da exportação | Planejado |

## Requisitos Não Funcionais

| Código | Regra | Descrição | Status |
|---|---|---|---|
| RNF-001 | Processamento assíncrono | Crawling roda via fila Laravel | Existente |
| RNF-002 | Limite de crawler | Jobs têm profundidade máxima e limite de páginas | Existente |
| RNF-003 | Baixo acoplamento | Contratos são ligados a services no container | Existente |
| RNF-004 | Observabilidade | Logs estruturados do crawler não foram identificados além de erro em exception | Parcial |

## Regras de Domínio

| Código | Regra | Descrição | Status |
|---|---|---|---|
| RN-001 | Domínio obrigatório | URL só é aceita se pertencer a domínio autorizado do projeto | Existente |
| RN-002 | Subdomínio configurável | Domínio pode permitir ou bloquear subdomínios | Existente |
| RN-003 | Escopo obrigatório | Coleta respeita seed URLs, allow paths, deny paths, profundidade e limite | Existente |
| RN-004 | Bloqueio de áreas sensíveis | Paths como login, admin, checkout, carrinho e API são bloqueados | Existente |
| RN-005 | Bloqueio de arquivos | Extensões de imagem, mídia, fonte, CSS, JS e compactados são bloqueadas | Existente |
| RN-006 | Origem rastreável | Documento e chunk preservam URL, source, projeto e hashes | Existente |
| RN-007 | Deduplicação | Documento duplicado no projeto é identificado por hash de conteúdo | Existente |

## Regras de Segurança

| Código | Regra | Descrição | Status |
|---|---|---|---|
| RS-001 | Isolamento por usuário | Policies verificam se o recurso pertence ao usuário do projeto | Existente |
| RS-002 | API protegida | Endpoints da extensão usam `auth:sanctum` | Existente |
| RS-003 | Projeto da captura | Captura da extensão só aceita projeto do usuário autenticado | Existente |
| RS-004 | Isolamento por organização | Dados de uma organização não podem aparecer em outra | Planejado |
| RS-005 | Captura consentida | Extensão captura após ação do usuário no popup | Parcial |

## Regras de Dataset

| Código | Regra | Descrição | Status |
|---|---|---|---|
| RD-001 | Texto mínimo | Textos limpos com menos de 300 caracteres são descartados no crawler | Existente |
| RD-002 | Texto mínimo na extensão | Captura exige texto com mínimo de 100 caracteres | Existente |
| RD-003 | Chunking fixo | Chunks usam tamanho 3000 e overlap 300 caracteres | Existente |
| RD-004 | Tokens estimados | Tokens são estimados por `ceil(tamanho / 4)` | Existente |
| RD-005 | JSONL de documentos | Exporta id, projeto, URL, domínio, título, texto, origem, idioma, hash e data | Existente |
| RD-006 | JSONL de chunks | Exporta chunk com referência ao documento, URL, texto, tokens e metadata | Existente |
