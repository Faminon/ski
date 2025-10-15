import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' });

app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/search', async (req, res) => {
  const resort = (req.query.resort as string | undefined)?.toLowerCase()?.replaceAll(' ', '-');
  let query = supabase.from('listings_public').select('id,title,nightly_price_eur,resort_slug,thumbnail_url').limit(50);
  if (resort) query = query.eq('resort_slug', resort);
  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/bookings', async (req, res) => {
  const schema = z.object({
    listing_id: z.string().uuid(),
    start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    guests: z.number().int().min(1).max(20)
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { listing_id, start, end, guests } = parsed.data;

  // TODO: check availability, pricing, create payment intent
  const { data: booking, error } = await supabase
    .from('bookings')
    .insert({ listing_id, start_date: start, end_date: end, guests })
    .select('*')
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.json({ booking, payment: { client_secret: 'demo' } });
});

app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  // Fill with Stripe webhook verification in real use
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
