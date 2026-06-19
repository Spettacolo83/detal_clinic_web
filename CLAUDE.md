# DentalIA — sotto-sito di Follow The Flow AI

Vetrina commerciale per vendere automazione AI a **cliniche dentali**. Stessa filosofia di CasAI ma su un mercato verticale diverso (healthcare invece di real estate).

> Obiettivo: dimostrare cosa Follow The Flow AI può costruire per una catena di cliniche dentali — soprattutto **agente vocale AI multilingua + automazione prenotazione appuntamenti + design clinical professional**.

## Repo & deploy

- **Directory locale**: `/Users/stefanorussello/Documents/Projects/FollowTheFlow/DentalClinic_web`
- **Repo GitHub**: `git@github.com:Spettacolo83/detal_clinic_web.git` (refuso "detal" nel nome remoto, lasciato così)
- **Dominio target**: `dentalia.followtheflowai.com`
- **Hosting**: VPS Contabo `161.97.125.230` via EasyPanel — **stesso server di CasAI e FTFAI**
- **DNS**: record A `dentalia` su Hostinger → `161.97.125.230`

## Stack (mirror CasAI)

- **Next.js 16** App Router + **next-intl** (EN/IT/ES, EN default no prefix)
- **Tailwind CSS v4** con `@theme` CSS-first
- **TypeScript** strict + **Framer Motion** + **Node 22 alpine** Dockerfile
- Deploy auto via webhook GitHub → EasyPanel

## Design system: Clean Medical Modern

**Palette** (vs Maison Mediterranean di CasAI):
- `bg.canvas` `#F7FAFC` (cool whitesmoke)
- `bg.surface` `#FFFFFF`
- `text.ink` `#0F172A` (slate-900)
- `text.muted` `#64748B`
- `border.hairline` `#E2E8F0`
- `primary.deep` `#0D9488` (teal-600 — signature medical)
- `primary.light` `#5EEAD4`
- `accent.coral` `#FB7185` (warm CTA)
- `success.green` `#10B981`

**Typography**: Plus Jakarta Sans (heading) + Inter (body) — sans-serif moderno, non serif luxury

**Radius**: 8px (soft) vs 2px (sharp) di CasAI

## Brand: DentalIA

- Naming: **DentalIA** = Dental + IA, capitalization "D-e-n-t-a-l-I-A"
- Brand reference: **Vitaldent** (chain accessibile premium IT+ES), NON luxury boutique
- Tone: empatico ma autorevole, premium ma accessibile, professionale e sereno
- Assistente vocale: **Sofia** (diverso da Ariel di CasAI)

## 3 sedi fittizie

- **Roma** (sede centrale, zona Prati)
- **Palma de Mallorca** (boutique balear, centro Palma)
- **Londra** (premium UK, Marylebone/Fitzrovia)

Indirizzi realistici, telefoni fittizi del paese, orari Lun-Sab, mappa coordinate vere.

## 12 prestazioni standard

Preventiva (visita, igiene, parodontologia), conservativa (endodonzia, otturazioni, protesi), estetica (sbiancamento, faccette), ortodonzia (fissa, Invisalign), chirurgia (implantologia), pediatrica.

**Prezzi**: solo orientativi nei dati root, NESSUN prezzo fisso nelle descrizioni (best practice cliniche serie + ragioni legali).

## ElevenLabs setup (mirror CasAI pipeline)

- 3 agenti IT/ES/EN identici per pattern a CasAI ma:
  - Personalità: **Sofia, l'assistente AI di DentalIA**
  - LLM: `gpt-4o-mini`
  - KB con 12 servizi + 3 cliniche + team
  - Cal.com tools **dedicati** (`dentalia_get_available_slots`, `dentalia_create_booking`)
  - Dynamic variables `agent_lang`, `agent_tz`
  - End_call rules + date interpretation + anti-silence + TTS tunato (0.35/0.85)
  - max_duration 180s, silence_end 12s, transcript_enabled true

## Cal.com setup

3 event types nuovi (1 per lingua) sullo stesso account `stefano-russello`:
- IT: "Visita Dentalia IT" 30min
- ES: "Cita Dentalia ES" 30min
- EN: "Dentalia Appointment EN" 30min

Tipo di prestazione passato nel campo `bookingFieldsResponses.notes` (pattern CasAI).

## Regole commit (TASSATIVE)

- Commit in **italiano**, bullet point
- **MAI** co-author, **MAI** riferimenti a Claude/AI nei commit
- **MAI** `--no-verify`

## Lingua comunicazione

- Parlare **sempre in italiano** con l'utente (Stefano Russello)

## Pattern di riferimento

Da CasAI (`/Users/stefanorussello/Documents/Projects/FollowTheFlow/RealEstateAgency_web/`):
- Tutto il design system (Container, Eyebrow, Button) — adattare radius da 2px a 8px
- next-intl setup
- VoiceAgent.tsx + types/elevenlabs.d.ts
- Dockerfile + .dockerignore
- ElevenLabs agent prompt structure (date rule, end_call rule, anti-silence, dynamic variables)
- Cal.com booking flow + tool schema
