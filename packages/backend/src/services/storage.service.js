import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', '..', 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

export async function initStorage() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(SUBMISSIONS_FILE);
  } catch {
    await fs.writeFile(SUBMISSIONS_FILE, '[]', 'utf8');
    console.log('[init] created', SUBMISSIONS_FILE);
  }
}

export async function readSubmissions() {
  try {
    const raw = await fs.readFile(SUBMISSIONS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function appendSubmission(entry) {
  const list = await readSubmissions();
  list.push(entry);
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(list, null, 2), 'utf8');
}

export async function writeSubmissions(list) {
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(list, null, 2), 'utf8');
}

export async function updateSubmission(id, updates) {
  const list = await readSubmissions();
  const idx = list.findIndex((s) => s.id === id);
  if (idx === -1) return null;

  Object.assign(list[idx], updates);
  await writeSubmissions(list);
  return list[idx];
}

export async function deleteSubmission(id) {
  const list = await readSubmissions();
  const idx = list.findIndex((s) => s.id === id);
  if (idx === -1) return false;

  list.splice(idx, 1);
  await writeSubmissions(list);
  return true;
}
