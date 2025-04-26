# Chronos Web UI

A Next.js web application with authentication and protected routes using js-cookie.

## Features

- Client-side authentication with js-cookie
- Protected routes with middleware
- Dark/light mode support
- Responsive design
- Secure API requests with auth token

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Environment Setup

Create a `.env.local` file in the root directory of the project with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Replace with your actual API URL.

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication Flow

The application implements a complete authentication flow:

1. **Login**: Users can log in with email and password
2. **Verification**: Some accounts might require email verification
3. **Protected Routes**: Middleware ensures only authenticated users can access protected routes
4. **Cookie Management**: Auth tokens are stored in cookies using js-cookie
5. **Automatic Logout**: Users are logged out automatically on token expiration

## Cookie Handling

This application uses js-cookie for cookie management:

- Simple, lightweight cookie management
- Cross-browser compatibility
- Easy API for setting, getting, and removing cookies

## Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── login/           # Login page
│   ├── layout.js        # Root layout
│   └── page.js          # Home page (protected)
├── components/          # Reusable components
│   └── Navbar.js        # Navigation component
├── lib/                 # Library code
│   └── axios.js         # Axios instance configuration
├── services/            # Service layer
│   └── auth.js          # Authentication service
└── utils/               # Utility functions
    └── cookies.js       # Cookie management with js-cookie
```

## API Endpoints

### Authentication

- `POST /auth/login` - Log in with email and password
- `POST /auth/verify` - Verify email with verification code

## License

This project is licensed under the MIT License.
