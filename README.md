# SomniaRoomsApp

User app for SomniaRooms.


## Docker Usage:

### Dev

**Build Image:**
```
docker build -t somniarooms-app:dev --target final-dev .
```

**Docker Run Image:**
```
docker run -d -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 --name somniarooms-app somniarooms-app:dev
```

Notas:
- Usar `-rm` para eliminar el contenedor y sus volúmenes en stop.
- Usar `-d` para modo detached.

### Prod:
**Build Image**
```
docker build -t somniarooms-app:prod --target final-prod .
```

**Docker Run**
```
docker run -d -it -p 8080:80 --name somniarooms-app somniarooms-app:prod
```

**Docker run with env vars:**
```
docker run -d -it -p 8080:80 --name somniarooms-app -e SOMNIAROOMS_BACKEND_HOST=https://somniaapi.example.org/ -e SOMNIAROOMS_BACKEND_PORT=443 somniarooms-app:prod
```

## Env Vars.
As this is distributed as a docker image ready to use, you must set some env variables to configure the app:

|            Var             |         Default Value          |                                         Description                                          |
| :------------------------: | :----------------------------: | :------------------------------------------------------------------------------------------: |
| `SOMNIAROOMS_BACKEND_HOST` | https://somniaapi.example.org/ | Host where uses can connect to the SomniaRoom API. API endpoint should be reachble for uses. |
| `SOMNIAROOMS_BACKEND_PORT` |              443               |                                  Port to SomniarRooms API.                                   |

## .env files

This project uses .env files to configure the app. As Vite only supports compile-time vars, we use some tricks to allow setting variables from container env variables.

### .env 
Contains default values. It is just an example configuration.

For development is recomended to create a `.env.local` file based on `.env`.

### .env.production
Set varibles to certains placeholder, that are replace on container startup.

(We are using this solution: https://stackoverflow.com/a/77454537)
