---
name: database-design
description: Schema design patterns, query optimization, indexing strategy, and migration best practices for SQL Server and PostgreSQL
---

# Database Design Skill

Reference material for database schema design, query optimization, and migrations.

## When to Use
- Designing or modifying database schemas
- Optimizing slow queries (indexing, query rewriting)
- Planning database migrations (backwards compatibility, rollback)
- Choosing between CTEs, temp tables, and subqueries

## Schema Design

### Normalization Guidelines

| Form | Rule | When to Apply |
|------|------|---------------|
| **1NF** | No repeating groups, atomic values | Always |
| **2NF** | No partial dependencies | Always |
| **3NF** | No transitive dependencies | Most tables |
| **Denormalize** | Intentional redundancy for performance | Read-heavy reporting tables |

### Naming Conventions

| Object | Convention | Example |
|--------|-----------|---------|
| Tables | PascalCase, singular or plural (be consistent) | `Customer`, `OrderDetail` |
| Columns | PascalCase | `FirstName`, `CreatedDate` |
| Primary Keys | `Id` or `TableNameId` | `Id`, `CustomerId` |
| Foreign Keys | `FK_{Child}_{Parent}` | `FK_Order_Customer` |
| Indexes | `IX_{Table}_{Columns}` | `IX_Order_CustomerId` |

## Index Strategy

### When to Create Indexes

| Create Index | Don't Create Index |
|-------------|-------------------|
| Columns in WHERE clauses | Low-selectivity columns (gender, status with 2 values) |
| JOIN columns (FK references) | Tiny tables (<100 rows) |
| ORDER BY / GROUP BY columns | Heavily updated columns (write-heavy) |
| Columns in DISTINCT queries | Already covered by existing indexes |

### Index Types

| Type | Use Case | Example |
|------|----------|---------|
| **Clustered** | Primary key, range scans | `CREATE CLUSTERED INDEX ON Orders(OrderDate)` |
| **Non-clustered** | Point lookups, covering | `CREATE INDEX IX_Orders_CustomerId ON Orders(CustomerId)` |
| **Covering** | Avoid key lookups | `INCLUDE (ColumnA, ColumnB)` |
| **Filtered** | Partial data queries | `WHERE IsActive = 1` |
| **Composite** | Multi-column queries | Put most selective column first |

## Query Optimization

### Common Anti-Patterns

| ❌ Anti-Pattern | ✅ Better | Why |
|----------------|----------|-----|
| `SELECT *` | Select only needed columns | Less I/O, can use covering index |
| Function in WHERE | Rewrite without function | `WHERE YEAR(Date) = 2024` -> `WHERE Date >= '2024-01-01'` |
| Cursor / row-by-row | Set-based operations | Performance: 100x faster |
| N+1 queries | JOIN or batch query | Reduce round trips |
| `NOT IN (subquery)` | `NOT EXISTS` or `LEFT JOIN WHERE IS NULL` | Handles NULLs correctly, often faster |
| `LIKE '%term%'` | Full-text search | Leading wildcard can't use index |

### CTE vs Temp Table vs Subquery

| Use | When |
|-----|------|
| **CTE** | Readability, recursive queries, single-use |
| **Temp Table** | Reused multiple times, needs index, large datasets |
| **Table Variable** | Small datasets (<1000 rows), simple operations |
| **Subquery** | Simple, one-off use, small result set |

## Migration Checklist

- [ ] Backwards-compatible (old code works with new schema)?
- [ ] Rollback plan defined?
- [ ] Large table ALTER tested on staging?
- [ ] Indexes created AFTER data migration?
- [ ] Foreign keys validated?
- [ ] Default values set for new NOT NULL columns?
- [ ] Data migration script tested with production-like data?

## Platform-Specific Notes

### SQL Server
- Use `WITH (NOLOCK)` only for reporting queries (dirty reads OK)
- Parameter sniffing: use `OPTION (RECOMPILE)` for variable parameter queries
- `sp_executesql` for dynamic SQL (prevents injection + plan caching)

### PostgreSQL
- Advisory locks for concurrency: `pg_advisory_lock()`
- Use `EXPLAIN ANALYZE` (not just `EXPLAIN`) for real execution stats
- Partial indexes: `CREATE INDEX ... WHERE condition`
- `jsonb` for semi-structured data (with GIN index)

## See Also

- [api-patterns](../api-patterns/SKILL.md) � REST API data layer patterns
- [security-audit](../security-audit/SKILL.md) � SQL injection prevention, schema security
- [performance-optimization](../performance-optimization/SKILL.md) � Query optimization, indexing
