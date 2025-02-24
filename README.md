<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18.x o superior recomendada)
- [pnpm](https://pnpm.io/) (instálalo globalmente con `npm install -g pnpm`)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/) para la base de datos
- Una terminal para ejecutar comandos

## Pasos para correr el proyecto localmente

### 1. Hacer fork del repositorio

1. Haz clic en el botón **Fork** en la parte superior derecha de este repositorio en GitHub para crear una copia en tu cuenta.
2. Clona tu fork a tu máquina local:
```bash
git clone https://github.com/tu-usuario/PetSocialNetwork-Back.git
cd PetSocialNetwork-Back
```
3. Instala las dependencias:
```bash
pnpm install
```
4. Configura la base de datos:
```bash
cp .env.example .env
```

- PORT: Puerto donde correrá el servidor (requerido, usa 3001 por defecto).
- DATABASE_URL: URL de conexión a PostgreSQL (requerido). Ajusta postgres:123456 si cambiaste el usuario o contraseña en docker-compose.yml.
> Nota: Estas variables son obligatorias porque el proyecto usa Joi para validación, y fallará si no están definidas.

5. Generar el cliente de Prisma:
```
npx prisma generate
npx prisma migrate dev --name init
```

6. Inicia la base de datos:
```bash
docker-compose up -d
```
Esto crea una carpeta llamada pgdata en tu directorio actual.

7. Inicia el servidor:
```bash
nest start --watch
```
8. Detiene la base de datos:
```bash
docker-compose down
```
9. Puedes ver la documentación con swagget en la ruta `localhost:tu-port/docs`