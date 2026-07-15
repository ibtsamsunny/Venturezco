import { mkdir, appendFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.jsonl");

export type LeadType = "contact" | "booking" | "newsletter";

/** Appends one JSON line per lead to data/leads.jsonl (gitignored). A simple,
 * dependency-free local store — swap for a real database later without
 * touching the API routes that call this. */
export async function appendLead(type: LeadType, payload: Record<string, unknown>) {
  await mkdir(DATA_DIR, { recursive: true });
  const record = { type, receivedAt: new Date().toISOString(), ...payload };
  await appendFile(LEADS_FILE, JSON.stringify(record) + "\n", "utf8");
}
