## Proyecto Gestión de Eventos - SD AHK IT 2023

### Stack tecnológico - Requisitos
- Entorno de Ejecución: [NodeJs](https://nodejs.org/en/ "NodeJs") 18.12.1
- Lenguaje de programación: TypeScript
- Framework: [ExpressJs](https://expressjs.com/es/ "ExpressJs")
- ORM: [TypeORM](https://typeorm.io/ "TypeORM")
- Base de datos: MySQL
- Gestor de dependencias: [npm](https://www.npmjs.com/ "npm")
- Editor de código recomendado: [Visual Studio Code](https://code.visualstudio.com/ "Visual Studio Code")

### Ejecución
1. Clonar el repositorio
2. Situados en la raíz del proyecto, instalar todas las dependencias: `npm install`
3. Copiar el archivo `.env.example` y renombrarlo a `.env`. Allí dentro configurar los parámetros necesarios con el entorno donde se ejecutará el aplicativo.
4. Ejecutar el index: `npm start`. Para poder corroborar el correcto funcionamiento, ingresar al navegador y luego dirigirse a [http://localhost:8000/welcome](http://localhost:8000/welcome "http://localhost:8000/welcome") Allí se deberá ver una respuesta en formato JSON frente al GET realizado a la ruta /welcome
5. Ejecutar los tests: `npm test` 

### ¿Dónde escribo mi código?
El proyecto está inspirado según el orden que plantea Maven, gestor de Dependencias para Java:
- Todo la lógica de negocio/dominio debe escribirse dentro de la carpeta `src/main`:
  - Las clases que representan Entidades de Dominio deberán escribirse dentro de `src/main/models/entities`
  - Los controladores deberán escribirse dentro de `src/main/controllers`
  - Para la definición de rutas se deberá crear una nueva clase por cada "conjunto de rutas" que se necesiten, dentro de la carpeta `src/main/routes/routers`. Tener en cuenta que las rutas deben ser REST, y para incorporarlas correctamente se puede seguir el ejemplo de WelcomeRoutes
  - Dentro de la carpeta `src/main/server` se encontrará la clase `Server` que contendrá la lógica de inicialización del Servidor.
- Todos los tests deben escribirse dentro de `src/test`. Se recomienda crear un archivo por cada clase TS que se quiera testear.
- La lógica de ejecución del componente debe escribirse en el archivo `src/index.ts`, el cual se ejecuta cuando se corre el comando `npm start`

