# Controlled Health Frontend

Frontend of the Controlled Health website built with [Angular](https://angular.io).

<table>
  <tr>
    <td>Angular</td>
    <td>
      11.2.x
    </td>
  </tr>
  <tr>
    <td>Material</td>
    <td>
      11.2.x
    </td>
  </tr>
  <tr>
    <td>NgRx</td>
    <td>
      11.x.x
    </td>
  </tr>
</table>

The backend of this repository was built with Ruby on Rails 6 and is called [controlled_health_api](https://github.com/peimelo/controlled_health_api).

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

The backend is expected to rise to `http://localhost:3000`. If you want another port, change the file `src/proxy.conf.json` and restart the frontend.

## Quality of the Code

[![DeepScan grade](https://deepscan.io/api/teams/11362/projects/15113/branches/298154/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=11362&pid=15113&bid=298154)
