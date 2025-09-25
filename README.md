# FRACTTAL-TEST-FRONTEND
*Transforma ideas en acción con velocidad y precisión*

![last-commit](https://img.shields.io/github/last-commit/kelthaz/fracttal-test-frontend?style=flat&logo=git&logoColor=white&color=0080ff)
![repo-top-language](https://img.shields.io/github/languages/top/kelthaz/fracttal-test-frontend?style=flat&color=0080ff)
![repo-language-count](https://img.shields.io/github/languages/count/kelthaz/fracttal-test-frontend?style=flat&color=0080ff)

### Construido con las siguientes tecnologías:
![JSON](https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white)
![styledcomponents](https://img.shields.io/badge/styledcomponents-DB7093.svg?style=flat&logo=styled-components&logoColor=white)

---

##  Tabla de Contenidos
- [Visión General](#visión-general)
- [Primeros Pasos](#primeros-pasos)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación](#instalación)
  - [Uso](#uso)
  - [Pruebas](#pruebas)

---

## Visión General
**fracttal-test-frontend** es un scaffold moderno basado en **React** diseñado para un desarrollo rápido y con una arquitectura escalable. Utiliza **Vite** para compilaciones ultrarrápidas e integra optimizaciones específicas de React para mejorar el flujo de trabajo.  

El proyecto enfatiza la modularidad, con servicios, hooks y componentes dedicados para autenticación, gestión de tareas, categorías y etiquetas, asegurando mantenibilidad y reutilización.  

Este proyecto ofrece un entorno en **React** optimizado para construir aplicaciones web robustas y centradas en el usuario.  

Características principales:
-  **Desarrollo Rápido:** Uso de Vite y optimizaciones de React para compilaciones rápidas y recarga en caliente.  
-  **Temas y Layout:** Soporte para temas dinámicos (claro/oscuro) y diseño responsivo.  
-  **Autenticación Segura:** Rutas protegidas, gestión centralizada de sesión y persistencia de usuario.  
-  **Arquitectura Modular:** Hooks, servicios y componentes reutilizables para tareas, categorías y etiquetas.  
-  **Integración con API:** Configuración centralizada de Axios para comunicación segura y consistente con el backend.  
-  **UI basada en Componentes:** Conjunto de componentes para registro, login, gestión de tareas y administración de contenido.  

---

##  Primeros Pasos

###  Requisitos Previos
Este proyecto requiere las siguientes dependencias:
- **Node.js**: v22.19.0  
- **Lenguaje:** JavaScript  
- **Gestor de Paquetes:** npm  

- **Este proyecto fue probado con **Node.js v22.19.0**.  
Se recomienda usar la misma versión para evitar problemas de compatibilidad.

###  Instalación
Clona el proyecto desde el repositorio e instala las dependencias:

1. **Clonar el repositorio:**
```sh
git clone https://github.com/kelthaz/fracttal-test-frontend
```

2. **Entrar al directorio del proyecto:**
```sh
cd fracttal-test-frontend
```

3. **Instalar dependencias con npm:**
```sh
npm install
```

3. **Ejecuta el proyecto con:**
```sh
npm run dev
```


###  Estructura de Carpetas
- **componentes/** # Componentes reutilizables de UI
- **contexto/** # Contextos globales (Auth, Tema, etc.)
- **hooks/** # Hooks personalizados para lógica de negocio
- **paginas/** # Páginas principales (Login, Registro, Dashboard, etc.)
- **rutas/** # Definición de rutas protegidas y públicas
- **servicios/** # Comunicación con la API usando Axios
- **estilos/** # Estilos globales y configuración de temas
- **main.jsx** # Punto de entrada de la aplicación


### Componentes
- **Auth:** Formularios de login y registro, validados.  
- **Tareas:** Dashboard con listado de tareas, filtros, buscador, paginación y acciones de edición/eliminación.  
- **UI Global:** Botones, modales, formularios y componentes reutilizables.  

---

###  Hooks
- **useAuth:** Manejo de autenticación, persistencia de sesión y logout.  
- **useTareas:** CRUD de tareas, incluyendo filtros, estados y prioridades.  
- **useCategorias:** Gestión de categorías dinámicas.  
- **useTags:** Manejo de etiquetas asociadas a tareas.  

---

### Servicios
- **api.js:** Configuración centralizada de Axios (baseURL, interceptores, headers).  
- **authService.js:** Métodos para login, registro y validación de sesión.  
- **tareasService.js:** CRUD de tareas (crear, leer, actualizar, eliminar).  
- **categoriasService.js:** Servicios para categorías.  
- **tagsService.js:** Manejo de etiquetas.  

---

###  Rutas
- **Rutas públicas:** Login, Registro.  
- **Rutas protegidas:** Dashboard, Gestión de tareas, Categorías y Etiquetas.  
- **ProtectedRoute:** Valida sesión antes de renderizar.  

---

##  Guías de Desarrollo

###  Estilos y Temas
- Uso de **Material UI** para consistencia visual y responsividad. 

### Validaciones de Formularios
- Feedback inmediato al usuario en inputs y botones.  

### Buenas Prácticas
- Separación de responsabilidades: lógica en hooks, UI en componentes.  
- Reutilización de componentes comunes.  
- Manejo centralizado de errores con interceptores Axios. 

## Licencia
Este proyecto fue desarrollado como parte de la prueba técnica para **Fracttal**.  
Uso libre para fines educativos y de aprendizaje.  
