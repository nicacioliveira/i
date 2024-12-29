---
title: 'Workflow com Git e GitHub'
date: '2024-01-25'
description: 'Como organizo meu workflow usando Git e GitHub'
---

# Workflow com Git e GitHub

Depois de anos usando Git, desenvolvi um workflow que funciona bem para mim.

## Estrutura de Branches

```
main
  ├─ develop
  │   ├─ feature/nova-funcionalidade
  │   └─ bugfix/correcao-erro
  └─ release/v1.0.0
```

## Commits Semânticos

Uso o padrão:
- feat: nova funcionalidade
- fix: correção de bug
- docs: documentação
- style: formatação
- refactor: refatoração
