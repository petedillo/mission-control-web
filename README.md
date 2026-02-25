# Mission Control Web UI

**Version**: 2.0.0 (Phase 3 - Infrastructure & LLM Integration)
**Last Updated**: February 24, 2026
**Status**: Phase 3A ✅ Complete | Phase 3B ✅ M1 Complete | Phase 3C 🟢 M1 Ready

---

## Overview

Web application for managing homelab infrastructure and LLM-powered automation.

**Current Features**:
- Infrastructure inventory (K8s, Proxmox, ArgoCD, Prometheus)
- LLM-powered task execution with Ollama (Gemini/Claude coming)
- Real-time task streaming via SSE
- Token usage tracking and cost visualization
- Dark mode with Apple glassmorphism design

---

## Quick Start

### Prerequisites
- **Bun**: v1.0+ ([install](https://bun.sh/))
- **Backend**: Running and accessible

### Setup

```bash
cd mission-control-web
bun install
cp .env.example .env.local
# Edit .env.local with your backend URL
```

### Development

```bash
bun dev                # Start dev server (http://localhost:5173)
bun run build          # Production build
bun test               # Run tests
bun run lint           # Lint code
```

---

## Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript 5+ (strict)
- **UI**: shadcn/ui + Tailwind CSS
- **Data Fetching**: SWR (caching, auto-refresh)
- **Real-time**: SSE via EventSource
- **Build**: Bun (3x faster than npm)
- **Testing**: Vitest + React Testing Library

---

## Project Structure

```
src/
├── pages/              # Page components (index, inventory, tasks, usage, settings)
├── components/
│   ├── dashboard/      # Dashboard cards & widgets
│   ├── inventory/      # Inventory tables & filters
│   ├── tasks/          # Task creation & execution
│   ├── layout/         # Header, sidebar, navigation
│   └── ui/             # shadcn/ui components
├── hooks/              # Data fetching hooks (useInventory, useProxmox, useArgocd)
├── lib/
│   ├── api/            # API client and endpoints
│   ├── utils/          # Formatters, constants
│   └── styles/         # Global styles, dark mode
└── types/              # TypeScript interfaces
```

---

## Phase 3C.1 - Ready for Copilot

**Components to build** (via GitHub Copilot):
- `useProxmox.ts` - SWR hook for Proxmox data
- `useArgocd.ts` - SWR hook for ArgoCD applications
- `ProxmoxStatus.tsx` - Infrastructure card (~250 lines)
- `ArgocdStatus.tsx` - Application status card (~180 lines)
- `ResourceCard.tsx` - Reusable resource card (~80 lines)

**Documentation**:
📄 [PHASE3C_MILESTONE1_COPILOT_GUIDE.md](../docs/PHASE3C_MILESTONE1_COPILOT_GUIDE.md) - Comprehensive implementation guide

---

## API Integration

Backend endpoints used:
- `GET /api/v1/proxmox/status` - Proxmox connection
- `GET /api/v1/proxmox/resources?type=lxc` - LXCs/VMs
- `GET /api/v1/argocd/applications` - ArgoCD apps
- `GET /api/v1/argocd/status` - ArgoCD connection
- `GET /api/v1/inventory` - Full inventory
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks/:id/events` - SSE stream

---

## Environment Variables

```bash
# Backend API URL
VITE_API_URL=http://localhost:3000

# Or use Tailscale
VITE_API_URL=https://mission-control.your-tailscale-domain.ts.net
```

---

## Development Tips

### Add Components
Components use shadcn/ui + Tailwind:
```bash
# Already installed: button, card, table, badge, dialog, select, tabs
```

### Add Data Hooks
Follow SWR pattern in `src/hooks/`:
```typescript
import useSWR from 'swr'
import { apiClient } from '@/lib/api/client'

export function useMyData() {
  const { data, error, isLoading } = useSWR('/api/v1/endpoint', apiClient.get)
  return { data, error, isLoading }
}
```

### Dark Mode
Uses CSS variables in `src/lib/styles/globals.css`:
- Primary: `#0a84ff` (vibrant blue)
- Glass effects: `.glass-card`, `.glass-panel` Tailwind classes
- Status colors: Green (healthy), Yellow (warning), Red (error)

---

## Testing

```bash
bun test                # Run once
bun test --watch        # Watch mode
bun test --coverage     # Coverage report
```

---

## Build & Deploy

### Docker

```bash
bun run docker:build    # Build image
bun run docker:run      # Run container (port 8080)
```

### Vercel (Cloud)

```bash
bun run deploy          # Deploy to Vercel
```

---

## Common Issues

**Cannot connect to backend**:
- Check `VITE_API_URL` in `.env.local`
- Verify backend is running: `curl $VITE_API_URL/api/v1/health`
- Check CORS headers

**Vite dev server issues**:
- Clear: `rm -rf .vite node_modules && bun install`
- Restart: `bun dev`

**Type errors**:
- Run: `bun run type-check`

---

## Documentation

- [Backend README](../mission-control-backend/README.md)
- [Architecture Guide](../docs/guides/ARCHITECTURE.md)
- [Design System](../docs/api-reference/DESIGN_SYSTEM_REFERENCE.md)
- [Phase 3C Guide](../docs/PHASE3C_MILESTONE1_COPILOT_GUIDE.md)

---

## Next Steps

1. **Phase 3C.1 Dashboard Cards** (Copilot ready)
   - Use PHASE3C_MILESTONE1_COPILOT_GUIDE.md
   - Build 5 components + dashboard update
   - Create PR to feature/phase3a.1-milestone

2. **Phase 3B Backend** (In parallel)
   - Implement Gemini & Claude adapters
   - Build Task Execution Engine
   - Add SSE streaming

3. **Phase 3C.2-5** (After M1)
   - ArgoCD management page
   - Task creation/execution pages
   - Usage dashboard
   - Settings page

---

**Need help?** Check [COPILOT_REQUEST.md](../COPILOT_REQUEST.md) for Copilot implementation details.
