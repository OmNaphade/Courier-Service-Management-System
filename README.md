# Courier Service Management System

> A role-based courier platform with separate frontend and backend apps for customers, delivery partners, and admins.

This repository contains the full stack application for parcel booking, delivery workflows, tracking, and admin management.

---

## What it does

- Customer login, registration, profile, bike/truck bookings, and order history
- Delivery partner login, registration, dashboard, available/current/completed orders, and profile management
- Admin dashboard for viewing customers, managing delivery agents, and confirming payment on packages
- Separate login and landing pages per role (customer, delivery partner, admin)
- REST API backed by Spring Boot and JPA, secured with role-based JWT authentication (`ADMIN`, `Customer`, `DeliveryAgent` authorities)
- Contact form wired to EmailJS
- Dockerfiles for both apps, a docker-compose stack, and a GitHub Actions CI/CD pipeline that builds, tests, and publishes images to GHCR

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Create React App |
| Routing | React Router v6 |
| UI | React Bootstrap, Bootstrap, MUI, React Icons |
| Forms / UX | React Hook Form, React Toastify |
| API calls | Axios |
| Contact form | EmailJS |
| Backend | Spring Boot 3.4, Java 17 |
| Data access | Spring Data JPA, Hibernate |
| Security | Spring Security, JWT |
| Database | MySQL |
| API docs | Springdoc Swagger UI |
| Testing | Jest, React Testing Library, Cypress, Spring Boot Test |

---

## Repository structure

```text
Courier-Service-Management-System/
├── README.md
├── docker-compose.yml
├── .github/workflows/ci-cd.yml
├── frontend/
│   ├── Dockerfile
│   ├── cypress/
│   └── src/
│       ├── Admin/
│       ├── Auths/
│       ├── Delivery/
│       ├── Screens/
│       ├── User/
│       ├── components/
│       ├── Services/
│       └── http-common.js
└── CourierExpress/
    ├── Dockerfile
    └── src/
        ├── main/
        │   ├── java/com/sunbeam/
        │   │   ├── controller/
        │   │   ├── config/
        │   │   ├── dao/
        │   │   ├── entities/
        │   │   └── services/
        │   └── resources/application.properties
        └── test/
```

---

## Frontend

The React app handles:

- landing page, about page, and contact form (EmailJS)
- user, delivery partner, and admin authentication
- bookings (bike/truck), order views, and role-specific dashboard pages
- toast notifications for API/action feedback (`react-toastify`)

> A `ProtectedRoute` component (JWT-aware route guard) exists in `src/Auths/` but is currently unused — all routes in `src/App.js` are open by path, and access is enforced only by what each page's API calls allow.

### Frontend setup

```bash
cd frontend
npm install
npm start
```

The frontend expects the backend at `http://localhost:8080` through `frontend/src/http-common.js`.

### Frontend scripts

| Script | Description |
|---|---|
| `npm start` | Runs the app in development mode |
| `npm run build` | Creates a production build |
| `npm test` | Starts the test runner |
| `npm run eject` | Ejects CRA configuration |
| `npm run cypress:open` | Opens Cypress test runner |
| `npm run cypress:run` | Runs Cypress tests headlessly |

---

## Backend

The Spring Boot app provides the REST APIs for customers, delivery partners, and admins. It includes:

- controllers for each user role (`/customers`, `/delivery-agents`, `/admin`)
- service and repository layers
- JWT authentication and role-based authorization via Spring Security (`ADMIN`, `Customer`, `DeliveryAgent` authorities)
- JPA entities for orders, customers, delivery agents, and admins
- Swagger UI for API exploration, available at `/swagger-ui.html` once the app is running

### Backend setup

```bash
cd CourierExpress
.\mvnw.cmd spring-boot:run
```

If you prefer Maven directly, use `mvn spring-boot:run`.

### Backend notes

- Main app config is in `CourierExpress/src/main/resources/application.properties`
- The app uses MySQL in development
- Test configuration uses an in-memory H2 database
- Update datasource settings locally before running

---

## Environment variables and local config

### Frontend

The contact form uses EmailJS. Add these to `frontend/.env`:

```bash
REACT_APP_EMAILJS_SERVICE_ID=
REACT_APP_EMAILJS_TEMPLATE_ID=
REACT_APP_EMAILJS_PUBLIC_KEY=
```

### Backend

Configure the database and security settings in `CourierExpress/src/main/resources/application.properties` or your local override file.

Do not commit real secrets or private credentials.

---

## Docker and CI/CD

- `CourierExpress/Dockerfile` builds the backend from the packaged jar (`target/*.jar`, so run `mvn package` first)
- `frontend/Dockerfile` builds and serves the React app
- `docker-compose.yml` at the repo root wires up `backend`, `frontend`, and a `mysql:8.0` `db` service (expects `BACKEND_IMAGE`/`FRONTEND_IMAGE` env vars pointing at built images)
- `.github/workflows/ci-cd.yml` runs on every push/PR to `main`:
  - backend job: `mvn clean test`, `mvn package`, builds and pushes the backend image to GHCR
  - frontend job: `npm ci`, Jest tests with coverage, Cypress e2e run, builds and pushes the frontend image to GHCR
  - deploy job (main branch pushes only): pulls the published images and runs `docker compose up -d`

---

## Main user flows

- **Customers** can browse the site, register, log in, book a bike or truck delivery, and view their order history
- **Delivery partners** can log in, view available orders, accept and complete deliveries, and update their profile
- **Admins** can log in, view customers, view/delete delivery agents, and mark packages as paid

---

## Known limitations

- The feedback/testimonial pages (`frontend/src/Admin/Feedback.jsx`, `frontend/src/Delivery/Feedbacks.jsx`) are static UI content (placeholder text/reviews) — there is no feedback entity, endpoint, or admin management for it yet
- Route guarding (`ProtectedRoute`) is implemented but not wired into `App.js`, so pages are reachable by direct URL regardless of login state; the backend still enforces authorization on API calls
- Backend automated tests currently cover only application context startup (`DemoApplicationTests`); there is no service/controller-level test suite yet

---

## Notes

- Both frontend and backend must be running for the full app to work
- If API calls fail, verify the backend base URL in `frontend/src/http-common.js`
- If auth or database access fails, check the backend datasource and JWT configuration

## Author

**Om Naphade** · [LinkedIn](https://linkedin.com/in/omnaphade) · [Portfolio](https://om-naphade.netlify.app) · [GitHub](https://github.com/OmNaphade)
