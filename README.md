# taskmanager

## Deploying on Render

Deploy the backend as a **Web Service** and `frontend` as a separate **Static Site**.

### Backend Web Service

- Root directory: repository root (the directory containing `pom.xml`)
- Build command: `./mvnw clean package -DskipTests`
- Start command: `java -jar target/taskmanager-0.0.1-SNAPSHOT.jar`
- Add these environment variables in Render:
  - `DB_URL`: `jdbc:postgresql://<database-host>:<port>/<database>?sslmode=require`
  - `DB_USERNAME`: database username
  - `DB_PASSWORD`: database password
  - `JWT_SECRET`: a private random secret of at least 32 bytes
  - `FRONTEND_URL`: the Static Site's exact origin, such as `https://your-site.onrender.com`

Use the database host and port from Render's connection details. Keep credentials in the separate variables; do not put them in `DB_URL`.

### Frontend Static Site

- Root directory: `frontend`
- Build command: `npm install && npm run build`
- Publish directory: `build`
- Set `REACT_APP_API_URL` to the backend's public origin, such as `https://your-api.onrender.com` (no trailing slash).

After both services are deployed, set `FRONTEND_URL` on the backend to the Static Site origin and redeploy the backend. The `package.json` proxy is for local development; production requests use `REACT_APP_API_URL`.