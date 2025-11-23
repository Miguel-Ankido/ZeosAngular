# ZeosAngular

ZeosAngular is a modern e-commerce web application built with **Angular 20** and **Server-Side Rendering (SSR)**. It provides a seamless shopping experience with features like product browsing, shopping cart management, user authentication, and an admin dashboard for product management.

## 🚀 Features

- **Product Catalog**: Browse products with pagination and search functionality.
- **Product Details**: Detailed product views with server-side rendering for better SEO.
- **Shopping Cart**: Add, remove, and update items in the cart.
- **Checkout**: Secure checkout process for authenticated users.
- **User Authentication**: Login, registration, and password recovery.
- **User Profile**: Manage user information and view order history.
- **Admin Panel**: Add and edit products (protected by Admin Guard).
- **Reviews**: Read and submit product reviews.
- **Responsive Design**: Optimized for various screen sizes.

## 🛠️ Tech Stack

- **Frontend Framework**: [Angular 20](https://angular.io/)
- **Server-Side Rendering**: @angular/ssr (Express.js)
- **Styling**: CSS, [FontAwesome](https://fontawesome.com/)
- **Notifications**: [ngx-toastr](https://www.npmjs.com/package/ngx-toastr)
- **HTTP Client**: Angular HttpClient
- **API**: External REST API (`https://api-1-6p1t.onrender.com`)

## 📂 Project Structure

```
src/
├── app/
│   ├── componentes/       # Reusable UI components (Header, Product Card, etc.)
│   ├── guards/            # Route guards (AuthGuard, AdminGuard)
│   ├── models/            # TypeScript interfaces/models
│   ├── pages/             # Application pages (Home, Shop, Login, etc.)
│   ├── services/          # Services for API communication and state management
│   ├── app.routes.ts      # Application routing configuration
│   └── ...
├── assets/                # Static assets (images, icons)
└── styles.css             # Global styles
```

## ⚙️ Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd zeos-angular
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm start
    # or
    ng serve
    ```

    Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 🏗️ Build & Deployment

### Build for Production

To build the project for production:

```bash
npm run build
# or
ng build
```

The build artifacts will be stored in the `dist/` directory.

### Server-Side Rendering (SSR)

To serve the application with SSR:

```bash
npm run serve:ssr:zeos-angular
```

## 🧪 Testing

### Unit Tests

Run unit tests using [Karma](https://karma-runner.github.io):

```bash
npm test
# or
ng test
```

## 🔑 API Endpoints

The application connects to an external API hosted at `https://api-1-6p1t.onrender.com`.
Key endpoints include:

-   `GET /produtos`: List products
-   `GET /produtos/:id`: Get product details
-   `GET /reviews`: Get product reviews
-   `POST /auth/login`: User login
-   `POST /auth/register`: User registration

## 🛡️ Guards

-   **AuthGuard**: Protects routes like Profile and Checkout, ensuring only logged-in users can access them.
-   **AdminGuard**: Protects Admin routes for adding and editing products.

---
Generated with Angular CLI version 20.3.9.
