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