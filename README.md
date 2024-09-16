# Task Manager

## Descripción

Esta aplicación es una herramienta de gestión de tareas (ToDo List) desarrollada con **Next.js** y **React**. Permite crear, listar, actualizar y eliminar tareas. Utiliza **Zustand** para el manejo del estado y **TailwindCSS** para los estilos. La aplicación está diseñada para ser **responsive** y fácil de usar.

## Características

- **Crear Tarea**: Añadir nuevas tareas con título, descripción y estado.
- **Listar Tareas**: Ver todas las tareas en la lista principal.
- **Actualizar Tarea**: Editar título, descripción y estado de una tarea.
- **Eliminar Tarea**: Borrar tareas de la lista.
- **Validaciones**: Asegura que los campos requeridos no estén vacíos y que el estado de la tarea sea válido.
- **Estilos Responsivos**: Aplicado con TailwindCSS para una interfaz clara y atractiva.

## Tecnologías

- **Next.js**: Framework para React con soporte para SSR y SSG.
- **Zustand**: Gestión del estado global.
- **TailwindCSS**: Framework de estilos para una interfaz responsiva.
- **Jest** y **React Testing Library**: Para pruebas unitarias.

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/task-manager.git
   cd task-manager
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta la aplicación en modo de desarrollo:

   ```bash
   npm run dev
   ```

## Pruebas

1. Para ejecutar las pruebas unitarias, utiliza:

   ```bash
   npm test
   ```

## Docker

1. Construye la imagen de Docker:

   ```bash
   docker build -t task-manager .
   ```

2. Ejecuta el contenedor de Docker:

   ```bash
   docker run -p 3000:3000 task-manager
   ```
-   La aplicación estará disponible en http://localhost:3000.

## Estructura del Proyecto
```
└── 📁task-manager
    └── 📁app
        └── 📁api
            └── 📁initialTasks
                └── route.js
        └── 📁components
            └── CreateTask.js
            └── CreateTask.test.js
            └── TaskItem.js
            └── TaskItem.test.js
            └── TaskList.js
            └── TaskList.test.js
        └── 📁fonts
            └── GeistMonoVF.woff
            └── GeistVF.woff
        └── 📁store
            └── store.js
        └── 📁styles
            └── globals.css
        └── 📁utils
            └── getInitialTasks.js
        └── layout.js
        └── page.js
    └── 📁public
        └── 📁assets
        └── favicon.ico
    └── .dockerignore
    └── .eslintrc.json
    └── .gitignore
    └── docker-compose.yml
    └── Dockerfile
    └── next-env.d.ts
    └── next.config.mjs
    └── package-lock.json
    └── package.json
    └── postcss.config.js
    └── postcss.config.mjs
    └── README.md
    └── tailwind.config.js
    └── tailwind.config.ts
    └── tsconfig.json
```
