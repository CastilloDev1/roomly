# Roomly

Sistema de reservas de salas de reuniones para empleados de una empresa pequeña.

---

## Descripción

Roomly es una aplicación backend desarrollada con NestJS, TypeScript y PostgreSQL. Permite a los empleados autenticados reservar salas de reuniones, listar y cancelar sus reservas, bajo reglas de negocio estrictas para evitar solapamientos y abusos.

---

## Stack Tecnológico

- [NestJS](https://nestjs.com/) (framework principal)
- TypeScript
- PostgreSQL (base de datos relacional)
- (Por definir) ORM: TypeORM o Prisma
- (Por definir) Herramientas de configuración y testing

---

## Decisiones Arquitectónicas Iniciales

- **Modularidad:**  
  El proyecto se estructura en módulos independientes (`users`, `reservations`, `auth`) para evitar acoplamiento y facilitar la escalabilidad futura.  
  *Riesgo:* Si la modularidad es excesiva para un MVP, puede generar sobrecarga de boilerplate y dificultar la evolución rápida.

- **AppModule como orquestador:**  
  `AppModule` solo importa y orquesta los módulos de dominio, sin contener lógica de negocio propia.  
  *Trade-off:* Si no se controla, puede convertirse en un punto de acoplamiento global.

- **Persistencia desacoplada:**  
  La lógica de negocio no debe depender directamente de la base de datos ni del ORM.  
  *Riesgo:* Si no se implementa correctamente, se puede caer en acoplamiento accidental y dificultar futuros cambios de tecnología.

- **Variables de entorno:**  
  Uso de `@nestjs/config` y archivos `.env` para separar configuración sensible y específica de cada entorno.  
  *Riesgo:* Si no se gestiona bien, puede haber fugas de información sensible o inconsistencias entre entornos.

---

## Reglas de Negocio (Fase 1)

- No se permiten reservas solapadas en la misma sala.
- Cada usuario puede reservar un máximo de 3 veces por semana.
- Solo el usuario que creó la reserva puede cancelarla.

---

## Endpoints Iniciales

- `POST /auth/login` — Autenticación básica.
- `GET /reservations` — Listar reservas del usuario autenticado.
- `POST /reservations` — Crear una nueva reserva.
- `DELETE /reservations/:id` — Cancelar una reserva propia.
- `GET /users/me` — Obtener perfil del usuario autenticado.

---

## Instalación y Ejecución

```bash
git clone https://github.com/CastilloDev1/roomly.git
cd roomly
npm install
# Configura tus variables de entorno en .env
npm run start:dev