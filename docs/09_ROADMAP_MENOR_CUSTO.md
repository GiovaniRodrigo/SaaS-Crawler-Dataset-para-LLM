# Roadmap de Menor Custo

## Princípio

Este roadmap prioriza entregas que geram valor com menor esforço técnico.

## Fase 1 — Organizar Base Existente

| Prioridade | Tarefa | Motivo | Custo |
|---|---|---|---|
| 1 | Corrigir divergências do README e manter docs atualizadas | Reduz confusão para novas LLMs/devs | Baixo |
| 2 | Adicionar testes dos services principais | Valida crawler, normalização, escopo, limpeza e exportação | Baixo |
| 3 | Documentar variáveis `.env` necessárias | Facilita setup local | Baixo |
| 4 | Criar seed/demo opcional | Ajuda validação manual rápida | Baixo |

## Fase 2 — MVP SaaS

| Prioridade | Tarefa | Motivo | Custo |
|---|---|---|---|
| 1 | Finalizar telas de edição de projeto se ausentes no frontend | Rota existe no controller, página não foi identificada | Baixo |
| 2 | Melhorar UX de criação/execução de crawl job | Fluxo já existe | Baixo |
| 3 | Adicionar tela/token de API para extensão | Extensão depende de Sanctum manual | Médio |
| 4 | Adicionar paginação/filtros simples em documentos e chunks | Reaproveita queries existentes | Baixo |

## Fase 3 — Dataset para LLM

| Prioridade | Tarefa | Motivo | Custo |
|---|---|---|---|
| 1 | Versionar exports JSONL | Torna datasets reproduzíveis | Médio |
| 2 | Permitir parâmetros de chunking por projeto | Aproveita `SimpleChunker` | Médio |
| 3 | Adicionar filtros de exportação | Evita exportar tudo sempre | Médio |
| 4 | Registrar metadados do dataset exportado | Melhora rastreabilidade | Baixo |

## Fase 4 — Revisão e Qualidade

| Prioridade | Tarefa | Motivo | Custo |
|---|---|---|---|
| 1 | Adicionar status de revisão em documentos | Base para aprovação antes do export | Médio |
| 2 | Criar tela simples de aprovação/reprovação | Valor direto para qualidade | Médio |
| 3 | Exibir duplicados e falhas de coleta | Usa dados já persistidos | Baixo |
| 4 | Adicionar score de qualidade real | Campo existe, regra não identificada | Médio |

## Fase 5 — Extensão do Navegador

| Prioridade | Tarefa | Motivo | Custo |
|---|---|---|---|
| 1 | Configurar URL base da API na extensão | Hoje está fixa em localhost | Baixo |
| 2 | Melhorar mensagens de erro e autenticação | Reduz atrito de uso | Baixo |
| 3 | Permitir seleção/validação de domínio antes da captura | Evita envio inválido | Médio |
| 4 | Empacotar instruções de instalação manual | Facilita testes | Baixo |

## Fase 6 — Integrações Futuras

| Prioridade | Tarefa | Motivo | Custo |
|---|---|---|---|
| 1 | Criar organizações e memberships | Necessário para SaaS multiusuário real | Alto |
| 2 | Adicionar auditoria | Necessário para operação SaaS | Médio |
| 3 | Implementar robots.txt/rate limit/retries | Reduz risco operacional do crawler | Médio |
| 4 | Integrar LLM para classificação/enriquecimento | Valor futuro, depende de dataset confiável | Alto |
