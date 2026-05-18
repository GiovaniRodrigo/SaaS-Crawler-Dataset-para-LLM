# Pendências e Riscos

## Pendências Funcionais

| Pendência | Impacto | Prioridade |
|---|---|---|
| Organizações e membros | SaaS colaborativo ainda não existe | Alta |
| Revisão/aprovação de documentos | Dataset pode exportar conteúdo sem curadoria | Média |
| Tela de gestão de token da extensão | Uso da extensão exige token obtido manualmente | Média |
| Relatórios de coleta e qualidade | Usuário tem pouca visão consolidada | Média |
| Integração LLM | Enriquecimento automático não existe | Baixa |

## Pendências Técnicas

| Pendência | Impacto | Prioridade |
|---|---|---|
| Testes específicos do domínio | Risco de regressão em crawler/exportação | Alta |
| Rate limit e politeness do crawler | Risco operacional ao coletar sites | Alta |
| Parser de links mais robusto | Regex pode perder links ou capturar casos inválidos | Média |
| Configuração flexível da extensão | API fixa em localhost | Média |
| Versionamento de exports | Datasets não ficam registrados como artefatos de produto | Média |

## Riscos de Produto

| Risco | Impacto | Mitigação |
|---|---|---|
| Usuário coletar domínio sem autorização real | Risco legal/ético | Reforçar consentimento, robots.txt e termos de uso |
| Dataset sem revisão | Baixa qualidade para LLM | Adicionar fluxo de revisão antes de exportar |
| Falta de organização/multiusuário | Limita uso SaaS por times | Implementar organizações antes de colaboração |

## Riscos Técnicos

| Risco | Impacto | Mitigação |
|---|---|---|
| Crawler bloquear ou sobrecarregar sites | Falhas e risco de abuso | Rate limit, retries, user agent e robots.txt |
| Conteúdo dinâmico não coletado | Dataset incompleto | Avaliar browser rendering somente após MVP |
| Deduplicação simples por texto | Pode manter duplicatas semânticas | Manter hash e evoluir para similaridade depois |
| Queue local sem observabilidade | Falhas podem passar despercebidas | Adicionar logs, métricas e painel simples |

## Riscos de Segurança

| Risco | Impacto | Mitigação |
|---|---|---|
| Token Sanctum exposto na extensão | Acesso indevido à API | Orientar rotação, escopos e expiração de tokens |
| Isolamento apenas por usuário | Não atende tenancy por organização | Introduzir `organization_id` e policies correspondentes |
| Captura de conteúdo sensível | Dados privados podem ir para dataset | Confirmação explícita e filtros de domínio/path |
