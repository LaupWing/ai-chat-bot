# Clinic AI Assistant

An AI chat assistant for clinics and other service SMBs. A visitor asks a question on the
website ("Wat kost een lipfiller?", "Behandelen jullie overmatig zweten?") and the assistant
answers in natural language, grounded in the clinic's **own** website content, and guides them
to book a consult.

Built with Laravel 13 + Inertia/React, powered by the [Laravel AI SDK](https://laravel.com/ai)
(Gemini Flash). First reference deployment: **The Golden Glow**, a cosmetic clinic in Amsterdam.

## Why a clinic actually wants this

It is **not** sold as "a chatbot." It is sold as **24/7 lead capture that books into the agenda.**

- Most visitor questions are *price*, *"can you treat X?"*, and *"how do I book?"* — answered
  instantly, day or night, in Dutch.
- Aesthetics browsing happens evenings and weekends, outside clinic hours. Every answered
  question is a lead that didn't bounce to a competitor.
- Every conversation funnels to the booking link → measurable ROI.
- Safe by design: never invents prices, never gives medical advice, always grounds answers in
  real page content and defers to a consult when unsure.

## ⭐ Killer feature — Weekly Insights Report

The chatbot doesn't just answer; it **listens to the market for you.**

Every week the clinic receives an automated report built from the real conversations:

- **Top questions visitors asked** — ranked by frequency.
- **Demand signals** — which treatments people ask about most (and which they ask the *price*
  of but don't book — a pricing/positioning hint).
- **Content gaps** — questions the assistant couldn't answer well → "add this to your site / FAQ."
- **Missed leads** — conversations that showed buying intent but didn't reach the booking step.
- **Suggested actions** — concrete next steps ("3 people asked about financing this week — add a
  payment-plan page").

This turns the assistant from a cost ("another widget") into a **growth tool**: the clinic learns
what its customers actually want, in their own words, every week. It is also the feature that
justifies a recurring monthly fee instead of a one-off build.

## How it works

1. **Knowledge base** — `config/clinic.php` holds the clinic's pages (URL + short description),
   grouped by category. Swap this file (+ logo + colors) to deploy for a new client.
2. **Agent** — `App\Ai\Agents\ClinicAssistant` is a Dutch clinic assistant with the page catalog
   in its instructions and guardrails against inventing prices / giving medical advice.
3. **Retrieval** — the agent reads the relevant page content to ground its answer (see Roadmap for
   how this evolves from live-fetch to ingested content).
4. **Frontend** — a branded chat widget (`resources/js/components/clinic/chat-widget.tsx`) with a
   typewriter effect and Markdown-rendered answers.

## Roadmap

### 1. Data extraction / ingestion (replaces live fetching)
Today the assistant fetches pages live at question time — great for a demo, but slow, fragile, and
unable to search across pages. Move to an ingestion phase:

- An artisan command crawls the site on a schedule, extracts clean content per page, and stores it
  in the database.
- The assistant retrieves from the stored content (fast, reliable, no live HTTP).
- Re-crawl on a schedule so content stays fresh.
- At larger scale: chunk + embed content and use vector similarity search (RAG). Requires
  PostgreSQL + pgvector; for small sites, store cleaned text per page and skip vectors for now.

### 2. Conversation logging + Weekly Insights Report
Persist every conversation, then aggregate into the weekly report described above (email + a simple
admin view).

### 3. Client dashboard (multi-tenant)
Clinics log in to read their conversations, view the insights report, and manage their page catalog
— turning this into a sellable, recurring-revenue SaaS add-on.

## Tech stack

- Laravel 13, PHP 8.4
- Inertia v3 + React 19 + Tailwind v4
- Laravel AI SDK (`laravel/ai`) — provider-agnostic, currently Gemini Flash (`gemini-3.5-flash`)

## Local development

```bash
composer install && npm install
cp .env.example .env && php artisan key:generate
# set GEMINI_API_KEY (and AI_PROVIDER=gemini) in .env
composer run dev   # serve + queue + vite
```
