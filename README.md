# Sistema Backend de Turnos y Reservas

API REST con Node.js, Express y FileSystem para gestionar servicios y reservas. Esta versión organiza el código en capas: router, controller, service, repository y DAO.

## Instalación
1. `npm install`
2. Copiar `.env.example` a `.env`
3. `npm run dev` (o `npm start`)

## Endpoints

### Services
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/services | Lista servicios (filtros: `?category=`, `?available=`) |
| GET | /api/services/:sid | Servicio por id |
| POST | /api/services | Crea un servicio |
| PUT | /api/services/:sid | Actualiza un servicio |
| DELETE | /api/services/:sid | Elimina un servicio |

Body de ejemplo:
```json
{
  "name": "Consulta general",
  "description": "Consulta médica de 30 minutos",
  "duration": 30,
  "price": 25000,
  "category": "salud",
  "available": true
}
```

### Bookings
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/bookings | Crea una reserva (sin servicios) |
| GET | /api/bookings/:bid | Reserva por id |
| POST | /api/bookings/:bid/services/:sid | Agrega un servicio a la reserva (si ya estaba, suma `quantity`) |

Body de ejemplo:
```json
{
  "clientName": "Ana Pérez",
  "clientEmail": "ana@mail.com",
  "date": "2026-11-05",
  "time": "10:30"
}
```

## Persistencia
Los datos se guardan en `src/data/services.json` y `src/data/bookings.json`.

## Estructura del proyecto

```
src/
  config/env.config.js
  controllers/
    services.controller.js
    bookings.controller.js
  services/
    services.service.js
    bookings.service.js
  repositories/
    services.repository.js
    bookings.repository.js
  dao/
    services.dao.js
    bookings.dao.js
  routes/
    services.router.js
    bookings.router.js
  data/
    services.json
    bookings.json
  app.js
  server.js
```



## Arquitectura en capas

```
router → controller → service → repository → DAO → archivo JSON
```

| Capa | Responsabilidad |
|------|-----------------|
| Router | Define los endpoints y los conecta con su controller |
| Controller | Lee `req`, llama al service y responde con `res` |
| Service | Reglas de negocio y validaciones. No conoce `req` ni `res` |
| Repository | Ofrece métodos de acceso a datos, sin reglas de negocio |
| DAO | Lee y escribe directamente en el archivo JSON, sin lógica de negocio |

Regla de negocio principal: si el mismo servicio se agrega dos veces a una reserva, se incrementa `quantity`. Esta lógica está en `bookings.service.js`.

Esta separación permite cambiar la persistencia (por ejemplo, de JSON a MongoDB) modificando solo el DAO y el repository.