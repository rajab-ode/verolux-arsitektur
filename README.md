# Verolux Management System - Architecture & Implementation

A unified workforce management and operational reporting platform for **Security, Cleaning, and Driver/Transport** divisions.

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [SRM Architecture](docs/SRM-ARCHITECTURE.md) | **Complete SRM system architecture documentation** |
| [Implementation Phases](docs/IMPLEMENTATION-PHASES.md) | Complete phase-by-phase implementation guide |
| [Phase Summary](docs/PHASE-SUMMARY.md) | Quick reference for all phases |
| [Feature Comparison](docs/FEATURE-COMPARISON.md) | SRM vs Verolux feature matrix |
| [Reference Screenshots](docs/reference-project/) | Screenshots from reference project (SRM) |

---

## 🏗️ Architecture Overview

This project follows **Clean Architecture** principles (also known as Hexagonal Architecture or Ports and Adapters).

## 📁 Project Structure

```
src/
├── domain/                    # 🎯 Core Business Logic (innermost layer)
│   ├── entities/              # Business entities with behavior
│   ├── value-objects/         # Immutable value objects
│   ├── interfaces/            # Repository & service interfaces
│   └── errors/                # Domain-specific errors
│
├── application/               # 🔧 Application Logic (use cases)
│   ├── use-cases/             # Business operations
│   ├── dtos/                  # Data Transfer Objects
│   ├── mappers/               # Entity <-> DTO mappers
│   └── interfaces/            # Application service interfaces
│
├── infrastructure/            # 🏗️ External Implementations
│   ├── config/                # Environment configuration
│   ├── database/              # Database repositories & models
│   │   ├── repositories/      # Repository implementations
│   │   ├── models/            # Database models
│   │   └── migrations/        # Database migrations
│   ├── services/              # External service implementations
│   ├── cache/                 # Caching implementations
│   └── messaging/             # Message queue implementations
│
├── presentation/              # 🖥️ User Interface Layer
│   └── http/                  # HTTP/REST API
│       ├── controllers/       # Request handlers
│       ├── routes/            # Route definitions
│       ├── middlewares/       # Express middlewares
│       └── validators/        # Request validators
│
├── shared/                    # 🔗 Shared Utilities
│   ├── utils/                 # Helper functions
│   ├── constants/             # App constants
│   ├── types/                 # TypeScript types
│   ├── decorators/            # Custom decorators
│   └── guards/                # Type guards
│
├── app.ts                     # Express app setup
└── index.ts                   # Entry point
```

## 🏗️ Architecture Layers

### 1. Domain Layer (Core)
The innermost layer containing business logic that is independent of any framework or external technology.

- **Entities**: Objects with identity and behavior
- **Value Objects**: Immutable objects without identity
- **Interfaces**: Contracts for repositories and services
- **Errors**: Domain-specific error types

### 2. Application Layer
Contains application-specific business rules and orchestrates data flow.

- **Use Cases**: Single-purpose operations
- **DTOs**: Data structures for input/output
- **Mappers**: Transform entities to DTOs and vice versa

### 3. Infrastructure Layer
Implements interfaces defined in the domain layer.

- **Repositories**: Data persistence implementations
- **Services**: External service integrations
- **Config**: Environment and app configuration

### 4. Presentation Layer
Handles HTTP requests and responses.

- **Controllers**: Handle requests and invoke use cases
- **Routes**: Define API endpoints
- **Middlewares**: Request/response processing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run in development
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## 📡 API Endpoints

### Health
- `GET /api/health` - Health check
- `GET /api/ready` - Readiness check

### Authentication
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users
- `POST /api/users` - Create user
- `GET /api/users` - List users (protected)
- `GET /api/users/:id` - Get user (protected)
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (admin only)

## 🔑 Key Concepts

### Dependency Injection
Use cases receive their dependencies through constructor injection:

```typescript
class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository<User>,
    private readonly hashService: IHashService
  ) {}
}
```

### Value Objects
Encapsulate validation and behavior:

```typescript
const email = Email.create('user@example.com'); // Validates format
const password = Password.create('SecurePass1'); // Validates strength
```

### Use Cases
Single responsibility operations:

```typescript
const createUserUseCase = new CreateUserUseCase(userRepository, hashService);
const user = await createUserUseCase.execute({
  email: 'user@example.com',
  password: 'SecurePass1',
  name: 'John Doe'
});
```

### Error Handling
Domain-specific errors are caught by middleware:

```typescript
throw new EntityNotFoundError('User', userId);
throw new ConflictError('Email already exists');
throw new UnauthorizedError('Invalid credentials');
```

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Check for linting errors |
| `npm run lint:fix` | Fix linting errors |
| `npm test` | Run tests |

## 🔧 Configuration

Environment variables (`.env`):

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRES_IN` | Token expiration | `7d` |
| `DATABASE_URL` | Database connection | - |
| `LOG_LEVEL` | Logging level | `info` |

## 🎯 Best Practices

1. **Keep domain layer pure**: No external dependencies
2. **Use interfaces**: Define contracts in domain, implement in infrastructure
3. **Single responsibility**: One use case = one operation
4. **Validate early**: Use DTOs and value objects for validation
5. **Handle errors gracefully**: Use domain-specific error types
6. **Test thoroughly**: Unit test domain and use cases

## 📚 Extending the Architecture

### Adding a New Entity

1. Create entity in `src/domain/entities/`
2. Define repository interface in `src/domain/interfaces/`
3. Implement repository in `src/infrastructure/database/repositories/`
4. Create use cases in `src/application/use-cases/`
5. Add DTOs in `src/application/dtos/`
6. Create controller in `src/presentation/http/controllers/`
7. Define routes in `src/presentation/http/routes/`

### Adding External Services

1. Define interface in `src/application/interfaces/`
2. Implement in `src/infrastructure/services/`
3. Inject into use cases as needed

## 📄 License

MIT License
