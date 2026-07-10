Frontend created with minimal Create React App-compatible scaffold.

How to run:
1. cd frontend
2. npm install
3. npm start

Notes:
- package.json sets "proxy" to http://localhost:8080 so API calls to /api/* go to the backend.
- After login, the app stores token in localStorage. The backend must return a JWT as {token: '...'} from /api/auth/login.
- The backend currently does not return userid on login; for tasks the userid must be known. Register returns created user object which may include id; after registering, login and set userid in localStorage or modify backend to return userid in login response.
