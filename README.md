#  Proyecto Fullstack: Django + React + Docker

Este proyecto consiste en un **backend desarrollado con Django/Django REST Framework** y un **frontend desarrollado con React + Vite**.  
Todo el entorno está preparado para ejecutarse de forma **reproducible y aislada mediante Docker y Docker Compose**, evitando problemas de dependencias o configuraciones locales.

---

##  Estructura del Proyecto

```
project/
│── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── project_pys/
│
│── frontend/react_pys
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
│── docker-compose.yml
│── README.md
```

---

##  Requisitos previos

- **Docker**  
- **Docker Compose**  
- Opcional: Python/NPM si deseas ejecutar partes sin Docker.

---

##  Ejecutar el proyecto con Docker

### 1. Construir y levantar los servicios

```bash
docker-compose up --build
```

Esto hará:

- Levantar el **backend Django**  
- Levantar el **frontend React**  
- Crear la red interna  
- Instalar todas las dependencias automáticamente  

---

##  URLs importantes

| Servicio | URL |
|---------|-----|
| Frontend React | http://localhost:5173 |
| Backend Django (API) | http://localhost:8000 |

---

##  Comandos útiles (docker)

### Ver logs
```bash
docker-compose logs -f
```

### Ejecutar migraciones en Django
```bash
docker-compose exec backend python manage.py migrate
```

### Crear superusuario
```bash
docker-compose exec backend python manage.py createsuperuser
```

### Entrar a la consola del backend
```bash
docker-compose exec backend bash
```

### Crear registros en la tabla de ciudades
Ingresa con el superusuario creado e inserta las ciudades que desee.
```bash
http://localhost:8000/admin/
```

---

##  Ejecutar el proyecto sin Docker (opcional)

### Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend (React)

```bash
cd frontend/react_pys
npm install
npm run dev
```

---

##  Ejemplo Docker Compose

```yaml
version: '3.9'

services:
  backend:
    build: ./backend
    container_name: django_backend
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    command: >
      sh -c "python manage.py migrate &&
             python manage.py runserver 0.0.0.0:8000"

  frontend:
    build: ./frontend/react_pys
    container_name: react_frontend
    volumes:
      - ./frontend/react_pys:/app
    ports:
      - "5173:5173"
    command: ["npm", "run", "dev"]
```

---

##  Limpieza

Parar todos los servicios:

```bash
docker-compose down
```

Eliminar contenedores, imágenes y volúmenes:

```bash
docker-compose down --volumes --rmi all
```

---

##  Contribuir

1. Crear branch  
2. Commit + push  
3. Abrir Pull Request  

---

##  Licencia

Este proyecto puede usarse y modificarse libremente.
