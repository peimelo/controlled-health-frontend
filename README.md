# Controlled Health Frontend

Frontend of the Controlled Health website built with [Angular](https://angular.io).

<table>
  <tr>
    <td>Angular</td>
    <td>
      10.2.3
    </td>
  </tr>
  <tr>
    <td>Material</td>
    <td>
      10.2.7
    </td>
  </tr>
  <tr>
    <td>NgRx</td>
    <td>
      10.1.1
    </td>
  </tr>
</table>

The backend of this repository was built with Ruby on Rails and is called [controlled_health_api](https://github.com/peimelo/controlled_health_api).

## Configuration

```bash
git clone https://github.com/peimelo/controlled-health-frontend.git
cd controlled-health-frontend

# installation of dependencies
npm install

# run the project
ng serve
```

Open the browser at the address `http://localhost:4200`.

## Tests

[![CircleCI](https://circleci.com/gh/peimelo/saudecontrolada-frontend.svg?style=svg)](https://circleci.com/gh/peimelo/saudecontrolada-frontend)

To run the tests:

```bash
npm run test
```

## Quality of the Code

[![DeepScan grade](https://deepscan.io/api/teams/11362/projects/14269/branches/261102/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=11362&pid=14269&bid=261102)

## Deploy

[![Netlify Status](https://api.netlify.com/api/v1/badges/0758d55a-22df-40bf-ab41-3c0c3cf2397c/deploy-status)](https://app.netlify.com/sites/saudecontrolada/deploys)
