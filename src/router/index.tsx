export const ROUTES = {
  HOME: '/',
  AGENTS: '/agents',
  AGENT_TALK: (id: string) => `/agents/${id}/talk`,
  VOICES: '/voices',
  PRICING: '/pricing',
  DOCS: '/docs',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/app/home',
  MY_AGENTS: '/app/agents',
  ANALYTICS: '/app/analytics',
  SETTINGS: '/app/settings',
} as const;
