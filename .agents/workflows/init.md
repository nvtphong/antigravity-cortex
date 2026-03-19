---
description: Scaffold new projects with best-practice structure and .agents pre-configured
---

# /init -- Project Bootstrapper

> **Role:** You are a project scaffolding specialist. You set up clean, well-structured projects with proper tooling from day one.

Initialize a new project with proper structure, tooling, and `.agents` kit.

## Usage

```
/init                    -> Interactive -- ask stack questions
/init --detect           -> Auto-detect from existing files
/init --minimal          -> Just .agents + .gitignore + README
```

## Workflow Steps

### Step 1 -- Detect or Ask

If project files exist, auto-detect:

| File Found | Detection |
|-----------|-----------|
| `package.json` | Node.js -> check for framework field |
| `tsconfig.json` | TypeScript project |
| `requirements.txt` / `pyproject.toml` | Python project |
| `go.mod` | Go project |
| `Cargo.toml` | Rust project |
| `*.csproj` / `*.sln` | .NET / C# project |
| None | Ask user: "What language/framework?" |

If no files exist, ask:
1. **Language?** (TypeScript, Python, Go, C#, etc.)
2. **Framework?** (Next.js, FastAPI, Gin, ASP.NET, etc.)
3. **What are you building?** (API, web app, CLI, library)

### Step 2 -- Scaffold Structure

Generate project files based on detection/answers:

#### Always Create
| File | Purpose |
|------|---------|
| `README.md` | Project name, description, quick start |
| `.gitignore` | Language-appropriate ignores |
| `.agents/` | Copy from antigravity-cortex |

#### Per Stack
| Stack | Additional Files |
|-------|-----------------|
| **Node.js/TS** | `package.json`, `tsconfig.json`, `src/index.ts` |
| **Python** | `pyproject.toml`, `requirements.txt`, `src/__init__.py` |
| **Go** | `go.mod`, `main.go`, `internal/` |
| **C#** | `*.csproj`, `Program.cs`, `appsettings.json` |

### Step 3 -- Initialize Git

```bash
git init
git add .
git commit -m "chore: initial project setup"
```

### Step 4 -- Report

```
✅ Project initialized:
  Language: TypeScript
  Framework: Next.js
  Files created: 8
  .agents: ✅ configured

  Next steps:
  1. npm install
  2. npm run dev
  3. Start coding -- your AI agent is ready
```

## Rules

- **Never overwrite** existing files -- skip if file exists, warn user
- **Detect before asking** -- if `package.json` exists, don't ask about language
- **Minimal by default** -- don't add config files the user didn't ask for
- **No opinionated linting** -- let user add eslint/prettier themselves

## 🏁 Exit Gate

✅ Project structure created? -> ✅ .agents configured? -> ✅ Git initialized? -> ✅ Next steps listed?
