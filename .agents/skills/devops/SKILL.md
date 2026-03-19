---
name: devops
description: Docker, CI/CD pipelines, deployment patterns, environment management, and infrastructure best practices
---

# DevOps Patterns

Stack-agnostic infrastructure and deployment best practices.

## Docker

### Dockerfile Best Practices

```dockerfile
# ✅ Multi-stage build (small final image)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER appuser
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

| Rule | Why |
|------|-----|
| **Multi-stage builds** | Builder stage has devDeps, runtime only has production |
| **Non-root user** | Security -- never run as root in production |
| **`npm ci` not `npm install`** | Deterministic, respects lockfile |
| **`.dockerignore`** | Exclude `node_modules`, `.git`, `.env`, `tests/` |
| **Alpine base** | 5MB vs 900MB for full Debian |
| **COPY package.json first** | Layer caching -- dependencies cached separately from code |

### Docker Compose (Development)

```yaml
services:
  app:
    build: .
    ports: ["3000:3000"]
    volumes: ["./src:/app/src"]     # Hot reload
    env_file: .env
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes: ["pgdata:/var/lib/postgresql/data"]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  pgdata:
```

---

## CI/CD Pipelines

### GitHub Actions Template

```yaml
name: CI/CD
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t ${{ github.repository }}:${{ github.sha }} .
      - run: docker push ${{ github.repository }}:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - run: echo "Deploy to production"
```

### Pipeline Stages

```
Push -> Lint -> Test -> Build -> Stage -> Approve -> Deploy -> Verify
```

| Stage | Fails fast on | Blocks |
|-------|---------------|--------|
| **Lint** | Style issues | Build |
| **Test** | Logic bugs | Build |
| **Build** | Compile errors, Docker issues | Deploy |
| **Stage** | Integration failures | Production |
| **Deploy** | Runtime errors | -- |

---

## Environment Management

### .env Pattern

```bash
# .env.example (committed to git)
DATABASE_URL=postgresql://user:password@localhost:5432/myapp
JWT_SECRET=change-me-in-production
API_KEY=your-api-key-here
NODE_ENV=development

# .env (NEVER committed -- in .gitignore)
DATABASE_URL=postgresql://prod-user:s3cur3@db.host:5432/myapp
JWT_SECRET=a1b2c3d4e5f6...
```

| Rule | Why |
|------|-----|
| `.env.example` -> committed | Documents required vars |
| `.env` -> gitignored | Contains real secrets |
| Validate on startup | Fail fast if vars missing |
| Different per environment | dev/staging/prod configs |

---

## Deploy Checklist

### Pre-Deploy
- [ ] All tests pass on CI
- [ ] Database migrations ready and tested
- [ ] Environment variables set in production
- [ ] Feature flags configured
- [ ] Rollback plan documented

### Post-Deploy
- [ ] Health check endpoint responds
- [ ] Logs are flowing (no errors)
- [ ] Key metrics normal (latency, error rate)
- [ ] Smoke test critical user flows
- [ ] Notify team of deployment

### Rollback Triggers
| Signal | Action |
|--------|--------|
| Error rate > 5% | Immediate rollback |
| P95 latency > 2x baseline | Investigate, 10min to rollback |
| Health check fails | Auto-rollback |
| User-reported critical bug | Evaluate, manual rollback |

## See Also

- [git-patterns](../git-patterns/SKILL.md) � Branching strategies, CI/CD triggers
- [security-audit](../security-audit/SKILL.md) � Container security, secrets management
- [performance-optimization](../performance-optimization/SKILL.md) � Build optimization, caching
