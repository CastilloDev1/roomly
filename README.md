# Roomly

Sistema de reservas de salas de reuniones para empleados de una empresa pequeña.

---

## Descripción

Roomly es una API backend moderna para la gestión de reservas de salas de reuniones, construida con NestJS, TypeScript y PostgreSQL. Incluye autenticación, control de solapamientos y límites de uso por usuario.

---

## Stack Tecnológico

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Docker (para base de datos en desarrollo)
- ESLint, Prettier

---

## Estructura de Carpetas

```text
roomly/
├── .env.example
├── docker-compose.yml
├── package.json
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   └── modules/
│       └── users/
│           ├── users.module.ts
│           └── entities/
│               └── user.entity.ts
│       └── rooms/          # (planificado)
│       └── reservations/   # (planificado)
│       └── auth/           # (planificado)
├── test/
│   └── app.e2e-spec.ts
└── ...
```

**Planificado:**
- `src/modules/reservations/` para gestión de reservas.
- `src/modules/auth/` para autenticación.
- `src/modules/rooms/` para gestión de salas.

Los módulos `reservations`, `auth` y `rooms` están planificados para fases futuras. La estructura puede ampliarse según crezca el dominio.
---

## Decisiones Arquitectónicas

- **Modularidad:** Cada dominio (`users`, `reservations`, `auth`, `rooms`) es un módulo independiente.
- **AppModule como orquestador:** Solo importa módulos, sin lógica de negocio propia.
- **Persistencia:** Se usa **TypeORM** como ORM por su integración nativa y soporte oficial en NestJS, lo que permite una configuración sencilla y patrones alineados al framework. Además, facilita migraciones, entidades tipadas y repositorios, acelerando el desarrollo inicial. Si el dominio crece o se requieren patrones más avanzados (ej: CQRS, DDD), se evaluará un desacoplamiento de los repositorios de TypeORM mediante interfaces y servicios de dominio.
- **Variables de entorno:** Se usa `@nestjs/config` y archivos `.env` para separar configuración sensible y específica de cada entorno.
- **Docker:** El archivo `docker-compose.yml` levanta un contenedor PostgreSQL para desarrollo local.

---

## Reglas de Negocio (Fase 1)

- No se permiten reservas solapadas en la misma sala.
- Cada usuario puede reservar un máximo de 3 veces por semana.
- Solo el usuario que creó la reserva puede cancelarla.

---

## Endpoints Iniciales

- `POST /auth/login` — Autenticación básica.
- `POST /auth/register` — Registro de usuario.
- `GET /reservations` — Listar reservas del usuario autenticado.
- `POST /reservations` — Crear una nueva reserva.
- `DELETE /reservations/:id` — Cancelar una reserva propia.
- `GET /users/me` — Obtener perfil del usuario autenticado.

---

## Instalación y Ejecución

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/CastilloDev1/roomly.git
   cd roomly
   ```
2. **Instala dependencias:**
   ```bash
   npm install
   ```
3. **Levanta la base de datos con Docker:**
   ```bash
   docker compose up -d
   ```
   Esto iniciará un contenedor PostgreSQL en el puerto 5432 con los datos persistidos en un volumen local.

4. **Configura tus variables de entorno en `.env` (ver ejemplo abajo o `.env.example`).**
5. **Ejecuta la aplicación en modo desarrollo:**
   ```bash
   npm run start:dev
   ```

### Ejemplo de `.env`

```env
# PostgreSQL
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=roomly-db

# NestJS
NODE_ENV=development
# JWT_SECRET=your_jwt_secret (descomenta cuando implementes auth)
```

---

## Buenas Prácticas

- No aceptes PRs que no pasen el linting (`npm run lint`).
- Mantén cada módulo autocontenible (entidades, servicios, controladores, DTOs).
- Usa variables de entorno para credenciales y configuración sensible.

---

## Futuras mejoras

- Implementar tests automatizados (unitarios y e2e) y cobertura mínima.
- Agregar CI/CD para despliegues automáticos.
- Documentar la API con Swagger/OpenAPI.
- Internacionalización y validación avanzada de reglas de negocio.
- Gestión de salas y recursos (equipamiento, capacidad).
- Notificaciones por email o chat para recordatorios de reservas.
- Panel de administración para gestión de usuarios y reservas.
- Mejorar la seguridad (rate limiting, audit logs, JWT refresh, etc).
- Soporte para reservas recurrentes y reglas personalizadas.