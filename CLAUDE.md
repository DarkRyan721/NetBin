# NetBin — Guía para Claude Code

## ¿Qué es NetBin?
Sistema IoT de caneca inteligente con clasificación de residuos por IA. Los usuarios se acercan, hablan con la caneca (reconocimiento de voz + OpenAI), la IA clasifica el residuo, y el usuario gana CoBins (moneda virtual) canjeables en empresas aliadas.

## Arquitectura del sistema

| Directorio | Tecnología | Propósito |
|---|---|---|
| `broker/` | Eclipse Mosquitto (Docker) | MQTT broker para comunicación en tiempo real con la caneca |
| `server/` | Spring Boot 3.3 / Java 17 + PostgreSQL | API REST con JWT, lógica de negocio, base de datos |
| `web/` | React 18 + Vite + Tailwind + NextUI | Dashboard web para empresas/administradores |
| `mobile/` | React Native + Expo 52 | App móvil para usuarios finales (registro NFC + CoBins) |
| `hardware/` | Python (Raspberry Pi) | Código del hardware embebido (sensores NFC, proximidad, voz, OpenAI) |
| `docs/` | — | Documentación del proyecto |

## Comandos de desarrollo

### Web (React)
```bash
cd web
npm install
npm run dev         # Servidor en http://localhost:5173
npm run build
npm run lint
```

### Server (Spring Boot)
```bash
cd server
./mvnw spring-boot:run              # Requiere Java 17
./mvnw clean install -DskipTests    # Build JAR
```

### Mobile (Expo)
```bash
cd mobile
npm install
npx expo start
npx expo start --android
npx expo start --ios
```

### Broker (Mosquitto)
```bash
cd broker
docker build -t netbin-broker .
docker run -p 1883:1883 netbin-broker
```

## Variables de entorno requeridas

### server (`application.properties`)
```
SPRING_DATASOURCE_URL=jdbc:postgresql://...
SPRING_DATASOURCE_USERNAME=...
SPRING_DATASOURCE_PASSWORD=...
```

### hardware
```
AZURE_IOT_CONNECTION_STRING=...
OPENAI_API_KEY=...
```

## API REST (`server/`)

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/auth/register` | Registro de usuario | Público |
| POST | `/auth/login` | Login → devuelve JWT | Público |
| GET | `/user/info` | Info del usuario autenticado | Bearer token |
| POST | `/user/cobins` | Incrementar CoBins | Bearer token |

## Tópicos MQTT

| Tópico | Dirección | Payload |
|---|---|---|
| `netbin/rasp/bin/sensor/level` | hardware → broker | `{ variable, variable_1, timestamp_1 }` |
| `netbin/rasp/bin/sensor/AI` | hardware → broker | `{ variable_1, value_1, timestamp_1 }` |
| `netbin/rasp/bin/compuerta_reciclable` | broker → hardware | `"abrir_reciclable"` / `"cerrar_reciclable"` |
| `netbin/rasp/bin/compuerta_no_reciclable` | broker → hardware | `"abrir_no_reciclable"` / `"cerrar_no_reciclable"` |

## Modelo de datos (PostgreSQL)

| Tabla | Campos clave |
|---|---|
| `users` | id, username (email), firstname, lastname, password (bcrypt), role (USER/ADMIN), CoBins |
| `node` | node_id, node_name, status, location |
| `sensor` | sensor_id, node_id (FK), sensor_type, sensor_data, timestamp |
| `waste` | waste_id, timestamp, recognized_item, user_id (FK) |

## Convenciones de código

### Java (`server/`)
- Paquetes en minúsculas (`auth`, `config`, `jwt`, `user`...)
- Clases en PascalCase
- Patrón por dominio: Entidad + Repository + Service + Controller
- Lombok para boilerplate (`@Data`, `@Builder`, `@RequiredArgsConstructor`)
- JWT stateless, sin sesiones en servidor

### JavaScript/React (`web/`)
- Componentes: PascalCase (`LoginPage.jsx`, `DataChart.jsx`)
- Hooks personalizados: camelCase con prefijo `use` (`useMqtt.js`)
- Carpetas: **minúsculas** (`pages/`, `components/`, `hooks/`, `mqtt/`)
- CSS colocado junto a su página (`login/login.css`)

### TypeScript (`mobile/`)
- Componentes: PascalCase (`.tsx`)
- Rutas Expo Router en kebab-case
- Contextos en `context/` (`AuthContext.tsx`)

### Python (`hardware/`)
- Archivos y funciones: `snake_case`
- **No hardcodear credenciales** — usar variables de entorno

## Despliegue

| Servicio | Plataforma | Detalles |
|---|---|---|
| `broker/` | Fly.io | Región: `bog` (Bogotá), puerto 1883 |
| `server/` | Render | URL: `https://netbin.onrender.com`, CI/CD via `.github/workflows/deploy-server.yml` |
| `web/` | Pendiente | Sin pipeline definido |
| `mobile/` | Expo / EAS Build | — |

## Alertas de seguridad

> ⚠️ Estos problemas deben corregirse antes de pasar a producción.

1. `server/src/main/resources/application.properties` tiene credenciales de DB en texto plano — migrar a variables de entorno
2. `hardware/sending_data.py` tiene IoT connection string hardcodeada — migrar a variables de entorno
3. `broker/config/mosquitto.conf` tiene `allow_anonymous true` — la config TLS está comentada
4. El token JWT se guarda en `localStorage` (web) — considerar `httpOnly` cookies

## Archivos que NO deben hacer commit
Ver `.gitignore` en la raíz. Adicionalmente, nunca commitear:
- Credenciales reales en `application.properties`
- IoT connection strings
- Claves privadas TLS (`.key`, `.pem`)
