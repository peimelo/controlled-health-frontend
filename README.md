# Saúde Controlada Frontend

Frontend do site Saúde Controlada construído com [Angular](https://angular.io).

<table>
  <tr>
    <td>Angular</td>
    <td>
      10.0.4
    </td>
  </tr>
  <tr>
    <td>Material</td>
    <td>
      10.0.2
    </td>
  </tr>
  <tr>
    <td>NgRx</td>
    <td>
      9.2.0
    </td>
  </tr>
</table>

O backend desse repositório foi construído com Ruby on Rails e se chama [saudecontrolada_api](https://github.com/peimelo/saudecontrolada_api).

## Configuração

```bash
git clone https://github.com/peimelo/saudecontrolada-frontend.git
cd saudecontrolada-frontend

# instalação das dependências
npm install

# rodar o projeto
ng serve
```

Abra o navegador no endereço `http://localhost:4200`.

## Testes

[![CircleCI](https://circleci.com/gh/peimelo/saudecontrolada-frontend.svg?style=svg)](https://circleci.com/gh/peimelo/saudecontrolada-frontend)

Para rodar os testes:

```bash
npm run test
```
