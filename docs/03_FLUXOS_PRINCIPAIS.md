# Fluxos Principais

## Fluxos Encontrados no Código

| Fluxo | Etapas | Status |
|---|---|---|
| Criação de conta | Usuário acessa registro, envia dados, Laravel Breeze cria usuário | Existente |
| Criação de projeto | Usuário autenticado cria projeto com nome e descrição | Existente |
| Cadastro de domínio | Usuário adiciona domínio e opção de subdomínios ao projeto | Existente |
| Configuração de escopo | Usuário define seed URLs, allow paths, deny paths, profundidade e limite | Existente |
| Execução de crawler | Controller despacha job, action busca páginas, valida escopo e registra resultados | Existente |
| Extração de texto | HTML é processado, tags indesejadas são removidas e texto é limpo | Existente |
| Geração de chunks | Documento gerado é segmentado com tamanho e overlap fixos | Existente |
| Exportação de dataset | Usuário baixa JSONL de documentos ou chunks | Existente |
| Captura via extensão | Extensão lista projetos e envia texto da página via API Sanctum | Parcial |

## Fluxos Planejados

| Fluxo | Etapas | Prioridade |
|---|---|---|
| Criação de organização | Criar organização, convidar usuários, associar projetos | Alta |
| Revisão de documentos | Listar documentos pendentes, aprovar/reprovar, exportar aprovados | Média |
| Auditoria | Registrar criação, execução, captura, exportação e exclusão | Média |
| Relatórios | Consolidar páginas coletadas, falhas, documentos e chunks por projeto | Média |
| Integração LLM | Enviar documentos/chunks para análise ou enriquecimento | Baixa |

## Fluxo Principal do Produto

```text
Usuário cria projeto
Usuário cadastra domínio
Usuário define escopo
Usuário executa crawler
Sistema coleta páginas
Sistema extrai texto
Sistema limpa conteúdo
Sistema gera documentos
Sistema gera chunks
Usuário revisa conteúdo
Usuário exporta dataset
```
