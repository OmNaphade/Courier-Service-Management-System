# Courier Service Management System

> A role-based courier platform with separate frontend and backend apps for customers, delivery partners, and admins.

This repository contains the full stack application for parcel booking, delivery workflows, tracking, and admin management.

---

## What it does

- Customer login, registration, profile, bookings, and order history
- Delivery partner login, registration, dashboard, and order handling
- Admin dashboard for customers, agents, packages, and feedback
- Role-aware routing and protected pages
- REST API backed by Spring Boot and JPA
- JWT-based authentication and security

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
├── frontend/
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

- landing page, about page, and contact form
- user, delivery partner, and admin authentication
- bookings, order views, and dashboard pages
- notifications and protected navigation

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

- controllers for each user role
- service and repository layers
- JWT authentication and Spring Security
- JPA entities for orders, customers, agents, and admins
- Swagger UI for API exploration

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

## Main user flows

- **Customers** can browse the site, register, log in, and create bookings
- **Delivery partners** can log in, manage assigned orders, and update status
- **Admins** can manage packages, users, agents, and feedback

---

## Notes

- Both frontend and backend must be running for the full app to work
- If API calls fail, verify the backend base URL in `frontend/src/http-common.js`
- If auth or database access fails, check the backend datasource and JWT configuration

## Author

**Om Naphade** · [LinkedIn](https://linkedin.com/in/omnaphade) · [Portfolio](https://om-naphade.netlify.app) · [GitHub](https://github.com/OmNaphade)
