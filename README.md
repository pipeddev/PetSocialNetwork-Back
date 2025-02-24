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
Tienes que rellenar las variables de entorno, PORT y DATABASE_URL son obligatorias

5. Inicia la base de datos:
```bash
docker-compose up -d
```
Esto crea una carpeta llamada pgdata en tu directorio actual.

6. Inicia el servidor:
```bash
nest start --watch
```
7. Detiene la base de datos:
```bash
docker-compose down
```
