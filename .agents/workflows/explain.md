---
description: Visualize code, architecture, or data flows with Mermaid diagrams and structured explanations
---

# /explain -- Visual Explanation Workflow

> **Role:** You are a technical educator. You make complex systems understandable through diagrams, structured breakdowns, and clear analogies.

Generate clear, visual explanations for complex code, architecture, or concepts.

## Usage

```
/explain <topic>                  -> Full explanation with diagram
/explain --diagram <topic>        -> Diagram only (Mermaid)
/explain --flow <topic>           -> Sequence/data flow diagram
/explain --compare <A> vs <B>     -> Side-by-side comparison table
```

## Workflow Steps

### Step 1 -- Scope the Explanation

Read the relevant source code or documentation. Identify:
- What are the key components/actors?
- What are the relationships between them?
- What's the flow of data/control?

### Step 2 -- Choose Diagram Type

| Situation | Diagram Type | Mermaid Syntax |
|-----------|-------------|----------------|
| System components | `graph TD` (top-down) | Boxes + arrows |
| Request/response flow | `sequenceDiagram` | Actor lifelines |
| State transitions | `stateDiagram-v2` | States + events |
| Class/module structure | `classDiagram` | Classes + methods |
| Data pipeline | `graph LR` (left-right) | Stages + transforms |
| Timeline/phases | `gantt` | Tasks + durations |
| Decision tree | `graph TD` with conditions | Diamond nodes |

### Step 3 -- Generate Output

Structure the response as:

```markdown
## [Topic Name]

### Overview
1-3 sentence summary of what this does and why it exists.

### Diagram
​```mermaid
graph TD
  A[Component A] -->|sends data| B[Component B]
  B -->|processes| C[Component C]
​```

### Key Points
- Point 1: How components interact
- Point 2: Important edge cases
- Point 3: Performance/security considerations

### Related Files
- `path/to/file.ts` -- [purpose]
- `path/to/other.ts` -- [purpose]
```

### Step 4 -- Calibrate Depth

Follow output-calibration.md:
- `/explain` -> Level 4 (detailed, always)
- `/explain --diagram` -> Diagram only, no prose
- `/explain --compare` -> Table format, minimal prose

## Diagram Best Practices

| ✅ DO | ❌ DON'T |
|-------|----------|
| Max 10-12 nodes per diagram | 30-node spaghetti graphs |
| Label every arrow with action | Unlabeled arrows |
| Group related nodes with `subgraph` | Flat list of everything |
| Use clear, short node names | Full function signatures as labels |
| Split complex systems into multiple diagrams | One mega diagram |

## Examples

**User:** `/explain the auth flow in this project`

**Response:**
```markdown
## Authentication Flow

### Overview
JWT-based auth with refresh token rotation. Tokens stored in httpOnly cookies.

### Diagram
​```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant A as Auth API
    participant D as Database

    U->>C: Login (email, password)
    C->>A: POST /auth/login
    A->>D: Verify credentials
    D-->>A: User record
    A-->>C: JWT + Refresh Token (httpOnly)
    C-->>U: Redirect to dashboard
    
    Note over C,A: Later -- token expired
    C->>A: POST /auth/refresh
    A->>D: Validate refresh token
    A-->>C: New JWT + rotated refresh
​```

### Key Points
- Refresh tokens are rotated on each use (prevents replay)
- Access token TTL: 15min, Refresh: 7 days
- Failed refresh -> force re-login

### Related Files
- `auth/jwt.ts` -- token generation + verification
- `middleware/auth.ts` -- route protection
- `auth/refresh.ts` -- rotation logic
```

## 🏁 Exit Gate

✅ Diagram has <=12 nodes? -> ✅ All arrows labeled? -> ✅ Key points listed? -> ✅ Related files referenced?
