export interface ScriptInputs {
  clientName: string;
  projectDetails: string;
  schedule: string; // e.g., "four days" or "four"
  price: string; // e.g., "twelve thousand dollars"
  notes?: string; // customer interest / notes
}

export function generateScript({ clientName, projectDetails, schedule, price, notes }: ScriptInputs): string {
  const name = (clientName || '').trim();
  const details = (projectDetails || '').trim();
  const when = (schedule || '').trim();
  const cost = (price || '').trim();
  const extra = (notes || '').trim();

  const scheduleText = when ? ` by ${normalizeSchedule(when)}` : '';
  const notesText = extra ? ` ${capitalize(extra)}` : '';

  return `"${opening(name)} ${bridge()} ${normalizeDetails(details)} We can complete the work${scheduleText}. Our price would be ${normalizePrice(cost)}, and that includes taxes and materials.${notesText}"`;
}

function opening(name: string): string {
  if (!name) return `Our assistant here to break down your quote.`;
  return `${name}'s personal assistant here to break down your quote.`;
}

function bridge(): string {
  return `Here’s how we plan to handle it.`;
}

function normalizeDetails(details: string): string {
  if (!details) return `We'll handle the full scope of work professionally from start to finish.`;
  const sanitized = details.replace(/^\W+|\W+$/g, '');
  return `${capitalized(sanitized)}`;
}

function normalizeSchedule(raw: string): string {
  const t = raw.toLowerCase().trim();
  if (/day|week|month/.test(t)) return t;
  if (t === 'four') return 'four days';
  return t;
}

function normalizePrice(raw: string): string {
  if (!raw) return 'provided after final confirmation';
  const t = raw.trim();
  return t.endsWith('.') ? t : `${t}`;
}

function capitalized(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function capitalize(text: string): string {
  return capitalized(text);
}
