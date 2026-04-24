"use server";

import fs from "fs/promises";
import path from "path";
import { BuxTransaction } from "@/lib/parsers/bux";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "database.json");

export interface DatabaseSchema {
  transactions: BuxTransaction[];
  settings: {
    tickerAliases: Record<string, string>;
  };
}

const DEFAULT_DB: DatabaseSchema = {
  transactions: [],
  settings: {
    tickerAliases: {
      "BTC": "BTC-USD",
      "ETH": "ETH-USD",
      "NL0015002AG2": "EBUS.AS",
      "IE00B4L5Y983": "IWDA.AS",
      "IE00B0M62Y33": "IQQH.DE",
      "US4581401001": "INTC",
      "IE0031442068": "IUSA.AS",
      "FR0010361683": "PE500.PA",
      "US7561091049": "RVLV",
      "US4435731009": "HUBS",
      "US60741F1049": "MBLY",
      "IE00BYZK4776": "XDWD.DE",
      "NL0012747059": "CMCOM.AS",
      "NL00150002Q7": "VVY.AS"
    }
  }
};

/**
 * Initializes the data directory explicitly just in case it was deleted
 */
async function ensureDbExists() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DB_FILE);
    } catch {
      await fs.writeFile(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}

/**
 * Reads entire state directly from hard drive
 */
export async function getFullStateFromDB(): Promise<DatabaseSchema> {
  await ensureDbExists();
  try {
    const rawData = await fs.readFile(DB_FILE, "utf-8");
    const parsed = JSON.parse(rawData);
    
    // Migration logic: If it's an array, it's an old DB. Convert to new schema.
    if (Array.isArray(parsed)) {
       return { ...DEFAULT_DB, transactions: parsed };
    }
    
    return {
        ...DEFAULT_DB,
        ...parsed,
        settings: { ...DEFAULT_DB.settings, ...parsed.settings }
    };
  } catch (error) {
    console.error("Failed to read DB:", error);
    return DEFAULT_DB;
  }
}

/**
 * Commits the entire state to the JSON flat file.
 */
export async function saveFullStateToDB(state: DatabaseSchema) {
  await ensureDbExists();
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(state, null, 2), "utf-8");
    return { success: true };
  } catch (error) {
    console.error("Failed to write DB:", error);
    return { success: false, error };
  }
}
