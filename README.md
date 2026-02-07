# Mission Control (Web UI)

**Version**: 1.0.0 (MVP - Phase 1)
**Last Updated**: February 6, 2026
**Status**: Initial Setup

---

## Overview

Modern web application built with Next.js for managing homelab infrastructure. Provides:
- Dashboard view of Kubernetes + Proxmox + Prometheus inventory
- Task creation and execution with LLM-powered automation (Ollama + Gemini)
- Real-time task progress streaming via SSE
- Token usage tracking and cost visualization
- Cross-platform access (works on any device with a browser)
- Responsive design (desktop, tablet, mobile)

---

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **UI Library**: shadcn/ui + Tailwind CSS
- **State Management**: Zustand (lightweight, performant)
- **Real-time**: Server-Sent Events (SSE via EventSource API)
- **Charts**: Recharts
- **HTTP Client**: Fetch API + SWR (for caching)
- **Authentication**: Simple token in localStorage (Tailscale-secured)
- **Testing**: Vitest + React Testing Library
- **Deployment**: Docker (static export) or Vercel

---

## Project Structure

```
mission-control-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Dashboard (/)
│   │   ├── inventory/
│   │   │   └── page.tsx            # Inventory view
│   │   ├── tasks/
│   │   │   ├── page.tsx            # Tasks list
│   │   │   ├── new/
│   │   │   │   └── page.tsx        # New task form
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Task run view
│   │   ├── usage/
│   │   │   └── page.tsx            # Token usage dashboard
│   │   └── settings/
│   │       └── page.tsx            # Settings
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── table.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ...
│   │   ├── dashboard/
│   │   │   ├── InventorySummary.tsx
│   │   │   ├── RecentTasks.tsx
│   │   │   └── TokenUsageChart.tsx
│   │   ├── inventory/
│   │   │   ├── HostsList.tsx
│   │   │   ├── WorkloadsList.tsx
│   │   │   └── DetailPane.tsx
│   │   ├── tasks/
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskRunLog.tsx
│   │   │   └── ToolApprovalModal.tsx
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── ConnectionStatus.tsx
│   │   └── shared/
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorBoundary.tsx
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts           # API client wrapper
│   │   │   ├── inventory.ts        # Inventory API calls
│   │   │   ├── tasks.ts            # Task API calls
│   │   │   └── usage.ts            # Usage API calls
│   │   ├── sse/
│   │   │   └── listener.ts         # SSE event handler
│   │   ├── store/
│   │   │   ├── auth.ts             # Auth state (Zustand)
│   │   │   ├── inventory.ts        # Inventory state
│   │   │   └── tasks.ts            # Tasks state
│   │   └── utils/
│   │       ├── format.ts           # Formatters (dates, numbers)
│   │       └── constants.ts        # App constants
│   └── types/
│       ├── api.ts                  # API response types
│       ├── models.ts               # Domain models
│       └── events.ts               # SSE event types
├── public/
│   ├── favicon.ico
│   └── logo.svg
├── tests/
│   ├── components/
│   └── lib/
├── .env.example
├── .env.local                      # Local environment (not committed)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── Dockerfile
├── .gitignore
└── README.md                       # This file
```

---

## Prerequisites

- **Node.js**: v18+ (LTS recommended)
- **pnpm** (or npm/yarn): Package manager
- **Backend**: Mission Control backend running and accessible (see `../mission-control-backend/`)
- **Network**: Tailscale (or VPN) for secure backend access

---

## Getting Started

### 1. Install Dependencies

```bash
cd mission-control-web
pnpm install
# or
npm install
```

### 2. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Backend API URL (accessible via Tailscale)
NEXT_PUBLIC_API_URL=https://mission-control.your-tailscale-domain.ts.net

# Or local development
# NEXT_PUBLIC_API_URL=http://localhost:3000

# App Config
NEXT_PUBLIC_APP_NAME=Mission Control
NEXT_PUBLIC_APP_VERSION=1.0.0

# Optional: Analytics, error tracking, etc.
# NEXT_PUBLIC_ANALYTICS_ID=...
```

**Note**: `NEXT_PUBLIC_*` variables are exposed to the browser.

### 3. Run Development Server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### 4. First-Time Setup

On first visit, you'll be prompted to configure:
1. **Backend URL**: Pre-filled from `.env.local`
2. **Auth Token**: Enter your backend API token (from backend `.env` file)

These are stored in **localStorage** (secure over Tailscale).

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (port 3001) |
| `pnpm build` | Build for production |
| `pnpm start` | Run production build |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run Vitest tests |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm type-check` | Check TypeScript types |

---

## Features (MVP - Phase 1)

### Dashboard (`/`)
- **Inventory Summary**: Count of K8s nodes, Proxmox VMs/LXCs, ArgoCD apps
- **Recent Tasks**: Last 10 task runs with status badges
- **Token Usage Chart**: Today's usage by provider (bar chart)
- **Backend Status**: Connection indicator (green dot = connected)

### Inventory (`/inventory`)
- **Tabs**: Hosts | Workloads
- **Hosts Table**: Type, Name, Status, CPU, Memory, Actions
- **Workloads Table**: Type, Name, Namespace, Status, Replicas, Actions
- **Detail Drawer**: Click row → slide-out panel with full details
- **Filters**: Search, type filter, status filter
- **Actions**: View logs, restart (with approval)

### Tasks (`/tasks`)
- **Tasks List**: All tasks with status, provider, created date
- **Create Task** (`/tasks/new`):
  - Prompt textarea (natural language input)
  - Provider selector (Ollama / Gemini - radio buttons)
  - Model dropdown (populated from backend)
  - Submit button
- **Task Run View** (`/tasks/[id]`):
  - Real-time log stream (SSE-driven, auto-scrolls)
  - Tool approval modals:
    - **READ_ONLY**: Auto-execute (no prompt)
    - **SAFE_MUTATE**: Show confirmation dialog
    - **DESTRUCTIVE**: Red warning modal + explicit confirm
  - Status badge (Queued → Planning → Executing → Succeeded/Failed)
  - Pause/Cancel buttons

### Usage (`/usage`)
- **Table**: Date | Provider | Model | Input Tokens | Output Tokens | Cost
- **Chart**: Tokens over time (last 7 days) - line or bar chart
- **Filters**: Date range picker, provider filter, model filter
- **Export**: CSV download button

### Settings (`/settings`)
- **Backend URL**: Edit connection URL
- **Auth Token**: Update API token
- **Auto-refresh**: Toggle (30s interval for inventory)
- **Theme**: Light / Dark / System (Phase 2)
- **Clear Cache**: Button to clear localStorage

---

## UI Design (Tailwind + shadcn/ui)

### Color Palette

```typescript
// Tailwind config (tailwind.config.js)
colors: {
  // Main brand colors
  primary: '#3b82f6',    // Blue
  secondary: '#6366f1',  // Indigo
  success: '#10b981',    // Green
  warning: '#f59e0b',    // Amber
  error: '#ef4444',      // Red

  // Status colors
  online: '#10b981',
  offline: '#ef4444',
  degraded: '#f59e0b',

  // Provider colors
  ollama: '#8b5cf6',     // Purple
  gemini: '#06b6d4',     // Cyan
  claude: '#f97316',     // Orange
}
```

### Component Library (shadcn/ui)

Using shadcn/ui components (copy-paste, not npm package):
- **Button**: Primary, secondary, ghost, destructive variants
- **Card**: Container for sections
- **Table**: Data tables with sorting
- **Badge**: Status indicators (pill-shaped)
- **Dialog**: Modals for approvals
- **Select**: Dropdowns for providers/models
- **Textarea**: Task prompt input
- **Tabs**: Hosts/Workloads switcher

Install components:
```bash
npx shadcn-ui@latest add button card table badge dialog select textarea tabs
```

---

## State Management (Zustand)

### Auth Store (`lib/store/auth.ts`)

```typescript
interface AuthState {
  token: string | null
  backendUrl: string
  setToken: (token: string) => void
  setBackendUrl: (url: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>(/* ... */)
```

### Inventory Store (`lib/store/inventory.ts`)

```typescript
interface InventoryState {
  hosts: Host[]
  workloads: Workload[]
  loading: boolean
  error: string | null
  fetchInventory: () => Promise<void>
  refreshInterval: number
}

export const useInventoryStore = create<InventoryState>(/* ... */)
```

### Tasks Store (`lib/store/tasks.ts`)

```typescript
interface TasksState {
  tasks: Task[]
  currentRun: TaskRun | null
  events: TaskEvent[]
  createTask: (prompt: string, provider: string) => Promise<string>
  subscribeToRun: (runId: string) => void
}

export const useTasksStore = create<TasksState>(/* ... */)
```

---

## API Client (`lib/api/client.ts`)

```typescript
class APIClient {
  private baseUrl: string
  private token: string | null

  async get<T>(path: string): Promise<T> { /* ... */ }
  async post<T>(path: string, body: any): Promise<T> { /* ... */ }

  // SSE stream
  createEventSource(path: string): EventSource { /* ... */ }
}

export const apiClient = new APIClient()
```

### Example Usage

```typescript
// In a component
import { apiClient } from '@/lib/api/client'

const inventory = await apiClient.get<Inventory>('/api/v1/inventory')
```

---

## SSE Event Handling (`lib/sse/listener.ts`)

```typescript
export class SSEListener {
  private eventSource: EventSource | null = null

  connect(runId: string, onEvent: (event: TaskEvent) => void) {
    this.eventSource = new EventSource(
      `${API_URL}/api/v1/task-runs/${runId}/events/stream`,
      { withCredentials: false }
    )

    this.eventSource.addEventListener('tool_call', (e) => {
      const event = JSON.parse(e.data)
      onEvent(event)
    })

    this.eventSource.addEventListener('tool_result', (e) => { /* ... */ })
    this.eventSource.addEventListener('status_change', (e) => { /* ... */ })
  }

  disconnect() {
    this.eventSource?.close()
  }
}
```

---

## Responsive Design

### Breakpoints (Tailwind defaults)

- **sm**: 640px (tablet portrait)
- **md**: 768px (tablet landscape)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)

### Layout Strategy

**Mobile (< 768px)**:
- Sidebar collapses to hamburger menu
- Tables scroll horizontally
- Cards stack vertically

**Tablet (768px - 1024px)**:
- Sidebar always visible (narrow)
- Tables use responsive columns
- Dashboard 2-column grid

**Desktop (> 1024px)**:
- Full sidebar with labels
- Tables show all columns
- Dashboard 3-column grid

---

## Development

### Run Locally

```bash
pnpm dev
```

Access at `http://localhost:3001`

### Type Checking

```bash
pnpm type-check
```

### Linting

```bash
pnpm lint
pnpm lint --fix  # Auto-fix
```

### Testing

```bash
pnpm test              # Run once
pnpm test:watch        # Watch mode
pnpm test:coverage     # With coverage
```

### Code Style

- **Prettier**: Auto-format on save (configure in VSCode)
- **ESLint**: Extends `next/core-web-vitals` + TypeScript
- **File naming**: kebab-case for files, PascalCase for components

---

## Building for Production

### Static Export (Recommended for MVP)

```bash
pnpm build
pnpm export
```

Output: `out/` directory (static HTML/CSS/JS)

Deploy to:
- **Nginx/Apache**: Serve `out/` directory
- **Docker**: Copy `out/` to Nginx container
- **Vercel**: Auto-deploy from Git (no export needed)

### Docker Build

```dockerfile
# Dockerfile (already in repo)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build && pnpm export

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build & run:
```bash
docker build -t mission-control-web .
docker run -p 8080:80 mission-control-web
```

---

## Deployment Options

### Option 1: Nginx (Same Server as Backend)

```nginx
# /etc/nginx/sites-available/mission-control
server {
    listen 80;
    server_name mission-control.your-domain.ts.net;

    # Frontend (static files)
    location / {
        root /var/www/mission-control-web/out;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API to backend
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Option 2: Docker Compose (with Backend)

```yaml
# docker-compose.yml (in project root)
version: '3.8'
services:
  backend:
    build: ./mission-control-backend
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://...
      - OLLAMA_BASE_URL=http://ollama:11434

  frontend:
    build: ./mission-control-web
    ports:
      - "8080:80"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:3000

  postgres:
    image: postgres:14
    # ...
```

### Option 3: Vercel (Easiest, but requires internet)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd mission-control-web
vercel
```

Set environment variable in Vercel dashboard:
- `NEXT_PUBLIC_API_URL` → `https://your-backend.ts.net`

---

## Security

### Authentication

- **Token Storage**: localStorage (acceptable over Tailscale)
- **HTTPS Only**: Backend must use HTTPS (even self-signed)
- **CORS**: Backend allows web UI origin

### Best Practices

- Never log auth tokens
- Validate all API responses
- Sanitize user input (task prompts)
- Use `httpOnly` cookies for production (Phase 2)

---

## Troubleshooting

### Cannot connect to backend

- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify backend is running: `curl $API_URL/api/v1/health`
- Check CORS headers on backend
- Ensure Tailscale is connected

### SSE events not streaming

- Check browser console for EventSource errors
- Verify backend SSE endpoint works: `curl $API_URL/api/v1/task-runs/:id/events/stream`
- Check for network proxies blocking `text/event-stream`

### Build fails

- Clear `.next` cache: `rm -rf .next`
- Delete `node_modules`: `rm -rf node_modules && pnpm install`
- Check Node version: `node -v` (should be 18+)

### Hydration errors

- Ensure no `localStorage` access during SSR
- Use `useEffect` for client-only code
- Check for mismatched HTML tags

---

## Roadmap

### Phase 1 (Current - Week 1)
- [x] Project setup + dependencies
- [ ] API client + SSE listener
- [ ] Zustand stores (auth, inventory, tasks)
- [ ] Dashboard page
- [ ] Inventory page
- [ ] Task creation page
- [ ] Task run page with real-time logs
- [ ] Usage dashboard

### Phase 2 (Week 2)
- [ ] Dark mode support
- [ ] Keyboard shortcuts (Cmd+K command palette)
- [ ] Toast notifications (task completion)
- [ ] Offline indicator + auto-reconnect
- [ ] Advanced filters (multi-select, search)

### Phase 3 (Weeks 3-4)
- [ ] Task templates (saved favorites)
- [ ] Export logs/reports (CSV, JSON)
- [ ] Mobile-optimized views

### Phase 4+ (Weeks 5+)
- [ ] Progressive Web App (PWA) - install on mobile
- [ ] WebSocket upgrade (replace SSE for bi-directional)
- [ ] Advanced charts (Recharts → D3.js)

---

## Comparison: Web UI vs macOS Native

| Feature | Web UI | macOS Native |
|---------|--------|--------------|
| **Development Speed** | ✅ Faster (1 week) | ⚠️ Slower (2+ weeks) |
| **Cross-Platform** | ✅ Any device | ❌ macOS only |
| **Native Feel** | ⚠️ Web-like | ✅ True native |
| **Offline Mode** | ⚠️ Limited (localStorage) | ✅ Full (Core Data) |
| **Keychain Integration** | ❌ No (uses localStorage) | ✅ Yes (secure) |
| **Notifications** | ⚠️ Browser notifications | ✅ macOS Notification Center |
| **Distribution** | ✅ URL (no install) | ⚠️ DMG + notarization |
| **Maintenance** | ✅ Easier (one codebase) | ⚠️ Xcode updates |

**Recommendation**: Start with **Web UI** for MVP, optionally add **macOS app** in Phase 2 if you want native experience.

---

## Contributing

This is a personal homelab project, but contributions are welcome:

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

MIT

---

## References

- [Master Plan](../MISSION_CONTROL_MASTER_PLAN.md)
- [App Brief](../CLAUDE_MISSION_CONTROL_APP_BRIEF.md)
- [Backend README](../mission-control-backend/README.md)
- [macOS App README](../mission-control-macos/README.md) (alternative UI)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Questions?** Open an issue or reach out!
