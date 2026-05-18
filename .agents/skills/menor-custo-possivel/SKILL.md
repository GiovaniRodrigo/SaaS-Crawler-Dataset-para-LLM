---
name: menor-custo-possivel
description: Use ao implementar qualquer tarefa neste projeto para escolher a solucao funcional de menor custo, menor escopo e menor risco que atenda ao pedido do usuario.
---

# Skill: Menor Custo Possivel

## Quando usar

Use esta skill em qualquer implementacao, correcao, refatoracao, documentacao tecnica ou ajuste de configuracao neste projeto.

## Principio

Entregue a menor mudanca funcional que resolva o pedido atual sem criar atalhos perigosos, divida tecnica desnecessaria ou comportamento incompleto.

## Ordem de decisao

1. Reuse codigo, padroes, componentes, actions, services, requests e policies existentes.
2. Prefira configuracao ou ajuste localizado antes de criar nova arquitetura.
3. Prefira mudanca pequena e testavel antes de refatoracao ampla.
4. Crie abstracao apenas quando remover duplicacao real ou reduzir complexidade imediata.
5. Adicione dependencia nova somente se a implementacao local for mais cara, fragil ou insegura.
6. Atualize documentacao apenas quando a mudanca alterar setup, regra, fluxo ou contrato visivel.

## Limites

- Menor custo nao significa ignorar validacao, seguranca, autorizacao ou rastreabilidade.
- Nao reduza cobertura de testes para economizar tempo.
- Nao esconda erro nem silencie falha importante.
- Nao troque comportamento existente sem necessidade clara.
- Nao faca refatoracoes cosmeticas fora do escopo do pedido.

## Antes de editar

- Identifique o menor conjunto de arquivos afetados.
- Verifique se ja existe padrao equivalente no projeto.
- Escolha a verificacao mais barata que ainda prove a mudanca: teste especifico, `composer run test`, `npm run build` ou revisao de Markdown/configuracao.

## Ao entregar

- Diga o que mudou.
- Diga qual verificacao foi feita ou por que nao foi necessaria.
- Mencione qualquer risco residual ou proximo passo somente se for relevante.
