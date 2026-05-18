---
name: crawler-dataset
description: Use ao alterar crawling, escopo de URL, extracao de texto, deduplicacao, documentos, chunks ou exportacao JSONL.
---

# Skill: Crawler Dataset

## Quando usar

Use esta skill para realizar mudancas no codigo, nas configuracoes ou nas operacoes relacionadas a crawler, processamento de texto, documentos, chunks e datasets.

## Arquivos relevantes

- `app/Actions/CrawlJobs`
- `app/Actions/Documents`
- `app/Actions/Chunks`
- `app/Actions/Exports`
- `app/Contracts/Crawling`
- `app/Contracts/Dataset`
- `app/Contracts/TextProcessing`
- `app/Services/Crawling`
- `app/Services/Dataset`
- `app/Services/TextProcessing`
- `app/Jobs/RunCrawlJob.php`
- `docs/04_REGRAS_DE_NEGOCIO.md`

## Regras que devem ser preservadas

### Dominio e escopo

- URLs precisam pertencer a dominio autorizado.
- Subdominios dependem de configuracao do dominio.
- Se um dominio nao autorizado for detectado, rejeite a URL, registre o motivo no fluxo de erro existente e interrompa a coleta daquela URL.
- Paths contendo areas sensiveis ou restritas, como login, admin, checkout, carrinho e API, devem ser bloqueados.
- Arquivos nao textuais, como imagens, midia, fontes, CSS, JS e compactados, devem ser bloqueados.

### Jobs de crawler

- Jobs respeitam seed URLs, allow paths, deny paths, profundidade e limite de paginas.
- Falhas de fetch, parse ou validacao devem usar o tratamento de erro existente antes de marcar o job como falho ou seguir para a proxima URL.

### Documentos e deduplicacao

- Documentos e chunks devem preservar rastreabilidade.
- Deduplicacao usa hash de conteudo por projeto.
- Se a deduplicacao falhar ou produzir resultado inesperado, registre o erro, evite criar documento duplicado sem validacao e cubra o caso com teste antes de alterar a regra.

### Chunks e exportacao

- Chunks usam tamanho e overlap definidos pela implementacao atual, salvo pedido explicito.
- Exportacoes JSONL devem manter URL, origem, projeto, hashes e metadados necessarios para rastreabilidade.

## Verificacao

- Para mudancas de regra, adicione ou ajuste testes.
- Rode `composer run test` quando viavel. Se falhar, revise a primeira falha relevante, corrija o codigo ou o teste e rode novamente.
- Se os testes continuarem falhando depois das correcoes, documente o comando, a falha persistente e o possivel bloqueio antes de entregar.
- Atualize docs se mudar escopo, formato JSONL, regras de crawler ou pipeline de dataset.
