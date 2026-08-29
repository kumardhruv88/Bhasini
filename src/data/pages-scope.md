# Bhasini — Page & Feature Scope

## Public Pages (no auth)

### / — Landing Page
Sections in order:
1. Navbar (sticky)
2. Hero — headline + CTA + floating orb
3. Product Tabs — BhasiniCreative / BhasiniAgents / BhasiniAPI
4. Trusted By — logo marquee (Indian enterprises)
5. Two Platforms — side-by-side dashboard mockups
6. BhasiniCreative detail — voice demo cards
7. Feature Grid — Music / SFX / Voices / Image & Video
8. BhasiniAgents detail — chat demo + resolution chart
9. Pricing teaser — link to /pricing
10. CTA banner — "Start building in Hindi today"
11. Footer

### /agents — Agent Explorer
- Industry filter tabs: All | Health & Medical | Tourism | Customer Support | Real Estate | Travel | Mental Health
- Agent cards grid: avatar orb (gradient per category) + name + language badges + description + "Try Agent" button
- Click → Agent Detail Modal: full description, sample conversation, voices available, "Start Conversation" CTA

### /agents/:agentId/talk — Agent Conversation Page  
- Full-screen conversation interface
- Two orbs: left = user (white/neutral), right = agent (category gradient)
- Particles emit from whichever orb is speaking (Web Audio API visualizer)
- Right side panel: live transcript with speaker labels + timestamps
- Bottom: Mute / End / Language selector
- Top bar: agent name + status indicator + back button

### /voices — Voice Library
- Search bar + filter chips (Language, Accent, Style, Gender)
- Voice cards list (like ElevenLabs voice library screenshot you showed)
- Each card: avatar, name, language tags, style tag, usage count, play preview button

### /pricing — Pricing Page
- Toggle: Monthly / Annual
- 4 tiers: Free | Starter (₹999/mo) | Growth (₹4,999/mo) | Enterprise (custom)
- Feature comparison table below cards

### /docs — Docs Landing
- Quick start guide
- API reference links
- SDK install snippets (JS, Python)

### /login & /signup — Auth Pages
- Minimal, centered card
- Google OAuth + email/password

## App Pages (post-auth, sidebar layout)

### /app/home — Dashboard
- Good afternoon, {name}
- Agent performance metrics: Calls, Latency, CSAT, Avg Resolution
- Alert cards (high severity issues)
- Resolution rate chart
- Recent conversations list

### /app/agents — My Agents
- List of created agents with status badges
- "+ Create Agent" button
- Each row: agent name, type, language, calls today, status

### /app/voices — My Voices  
- Cloned voices + library voices in use
- Upload to clone + "Design from prompt" entry points

### /app/analytics — Analytics
- Calls over time chart
- Language distribution pie
- CSAT trend
- Top intents detected

### /app/settings — Settings
- API key management
- Webhook config
- Team members (for paid tiers)
- Billing
