# Ski P2P – Starter (React Native + Supabase + Express)

Une base pour une appli de location P2P spécialisée ski (type Airbnb).

## Structure
- `mobile/` – App Expo React Native (RN 0.74, TypeScript) utilisant Supabase (auth/DB).
- `server/` – API Express pour logique serveur (recherche, réservations, webhooks Stripe).
- `supabase/schema.sql` – Schéma Postgres + RLS pour Supabase.

## Mise en route

### Supabase
1. Crée un projet Supabase.
2. Exécute `schema.sql` dans SQL Editor.
3. Dans **Authentication**, active Email OTP ou Magic Link.
4. Crée des buckets de stockage si tu veux gérer des photos.

Variables côté **mobile** (EAS ou `.env` en dev) :
```
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

Variables côté **server** :
```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
STRIPE_SECRET_KEY=...
PORT=4000
```

### Mobile
```
cd mobile
npm i
npm run start
```

### Server
```
cd server
npm i
npm run dev
```

## Notes
- L’appli mobile lit `public.listings_public` (vue) pour limiter l’exposition de colonnes sensibles.
- Les réservations passent par une route `/bookings`. Remplacer la logique d’exemple par votre vraie vérification de dispo et paiement.
- Pour une intégration type « LeBonCoin », vois plutôt un site/app indépendant avec deeplinks et SEO. LBC n’offre pas d’intégration officielle « dans le site ».
