# System Dependencies

> All shared identifiers, IDs, credentials, and service references.
> Fields marked ⚠️ KEEP SECRET should only be referenced by name.

---

## Account & Infrastructure

| Resource | Dev Value | Prod Value | Status | Notes |
|----------|-----------|------------|--------|-------|
| Yahoo Finance | via `yahoo-finance2` | Same | Active | Used for live pricing, FX rates, and asset discovery. |
| CapRover | N/A | `captain.[YOUR-SUBDOMAIN]` | Active | Deployment orchestration & SSL management. |
| Hetzner Cloud | N/A | CX22 Instance | Active | Production hosting environment. |

## Notes

- Replace placeholders the moment real values exist.
- Never paste raw secret values into this file.