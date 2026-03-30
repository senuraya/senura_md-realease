const { Pool } = require("pg");
const sess = require("../../session");
const path = require('path');
const fs = require('fs');
// ===============================
// PostgreSQL Connection
// ===============================
// AUTO CREATE TABLES IF NOT EXIST
async function initTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS bot_settings (
      bot_number TEXT PRIMARY KEY,
      settings JSONB NOT NULL
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS auto_replies (
      bot_number TEXT,
      key TEXT,
      message TEXT,
      PRIMARY KEY (bot_number, key)
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS cmd_store (
      msg_id TEXT PRIMARY KEY,
      cmd_id TEXT
    );
  `);

  console.log("✅ PostgreSQL tables ready");
}

//================================

const pool = new Pool({
  connectionString: "postgresql://xprodb_user:1QFWp6P9qZSvetLnd5yEVtoe9YJR9cpZ@dpg-d4p8ea7gi27c73ejquh0-a.singapore-postgres.render.com/xprodb", // Render gives this
  ssl: { rejectUnauthorized: false }
});

// Function to run SQL safely
async function query(sql, params = []) {
  const client = await pool.connect();
  try {
    const res = await client.query(sql, params);
    return res.rows;
  } finally {
    client.release();
  }
}

// ===============================
// Default Settings
// ===============================

const defaultSettings = {
  PREFIX: ".",
  AUTO_READ_STATUS: false,
  MODE: "public",
  OWNER_NUMBER: "94787751901",
  READ_CMD: true,
  AUTO_VOICE: false,
  AUTO_STICKER: false,
  AUTO_REPLY: false,
  AUTO_REACT: false,
  WELCOME: false,
  DELMSG: "public",
  MNAME: "❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤",
  ANTI_BAD: [],
  ANTI_BOT: [],
  ANTI_LINK: [],
  ANTI_CALL: false,
  ANTI_DELETE: false,
  ALWAYS_ONLINE: true,
  MOROCCOBLOCK: true,
  BTN_MSG: false,
  OWNER_NAME: "MR.SENURA",
  NEWS_JID: false,
  MOVIE_JID: false,
  ANIME_JID: false,
  AUTO_TYPING: false,
  AUTO_RECORDING: true,
  AUTO_NEWS: false,
  FOOTER: "> ❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤\n> `Developed by Mr. Senura Herath`",
  OWNER_REACT: false,
  EMOJI: "🏷",
  AI_MODE: false,
  AI: "Boy",
  BANNED: [],
  SUDO: ["94717775628"],
  LANG: "EN",
  isPremium: false
};

const defaultAutoReply = {
  gm: "Good Morning Suduu! 😊💖",
  gn: "Good Night Sweetheart! 🌙",
  mk: "Mukuth na! 😌",
  hi: "Hey Sudu! 😁",
  bye: "Take care! 😘",
  "love you": "Love you too! 😘💖",
  "hate you": "Ado hari glt 😢"
};

// ===============================
// BOT SETTINGS SYSTEM (JSONB)
// ===============================

// Init settings (create if not exists)
async function connectdb(botNumber) {
    //await initTables();
  const existing = await query(
    "SELECT settings FROM bot_settings WHERE bot_number = $1",
    [botNumber]
  );

  if (existing.length === 0) {
    // Insert Fresh Default
    await query(
      "INSERT INTO bot_settings (bot_number, settings) VALUES ($1, $2)",
      [botNumber, defaultSettings]
    );
    return defaultSettings;
  }

  return { ...defaultSettings, ...existing[0].settings };
}

// Get one setting
async function get(botNumber, setting) {
  const rows = await query(
    "SELECT settings FROM bot_settings WHERE bot_number=$1",
    [botNumber]
  );

  if (rows.length === 0) return defaultSettings[setting];

  return rows[0].settings[setting] ?? defaultSettings[setting];
}

// Get all settings
async function getAllSettings(botNumber) {
  const rows = await query(
    "SELECT settings FROM bot_settings WHERE bot_number=$1",
    [botNumber]
  );

  if (rows.length === 0) return defaultSettings;

  return { ...defaultSettings, ...rows[0].settings };
}

// Update setting
async function input(setting, value) {
  const botNumber = sess.BOT_NUMBER;

  await query(
    "UPDATE bot_settings SET settings = jsonb_set(settings, $1, $2) WHERE bot_number=$3",
    [`{${setting}}`, JSON.stringify(value), botNumber]
  );

  return true;
}

// ===============================
// AUTO REPLY SYSTEM
// ===============================

// Add reply
async function addreply(botNumber, key, message) {
  await query(
    `INSERT INTO auto_replies (bot_number, key, message)
     VALUES ($1,$2,$3)
     ON CONFLICT (bot_number, key) DO UPDATE SET message=$3`,
    [botNumber, key.toLowerCase(), message]
  );

  return true;
}

// Get auto reply key
async function getAutoReply(botNumber, key) {
  const rows = await query(
    "SELECT message FROM auto_replies WHERE bot_number=$1 AND key=$2",
    [botNumber, key.toLowerCase()]
  );

  return rows.length ? rows[0].message : defaultAutoReply[key.toLowerCase()];
}

// Get all replies
async function getAllAutoReplies(botNumber) {
  const rows = await query(
    "SELECT key, message FROM auto_replies WHERE bot_number=$1",
    [botNumber]
  );

  let replies = { ...defaultAutoReply };

  rows.forEach(r => replies[r.key] = r.message);

  return replies;
}

// ===============================
// CMD STORE
// ===============================

// Define the local database file path
const dbFilePath = path.join(__dirname, "data.json");

// Function to read the database file (if exists)
const readDB1 = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error(`Error reading database: ${error.message}`);
    return [];
  }
};

// Function to write data to the database file
const writeDB1 = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing to database: ${error.message}`);
  }
};

// Update CMD Store
async function updateCMDStore(MsgID, CmdID) {
  try {
    let db = readDB1(dbFilePath);
    // Add the new entry
    db.push({ [MsgID]: CmdID });
    writeDB1(dbFilePath, db);
    return true;
  } catch (error) {
    console.error("Error updating CMD store:", error);
    return false;
  }
}

// Check if MsgID exists
async function isbtnID(MsgID) {
  try {
    let db = readDB1(dbFilePath);
    return db.some((item) => item[MsgID]);
  } catch (error) {
    console.error("Error checking button ID:", error);
    return false;
  }
}

// Retrieve CMD Store data
async function getCMDStore(MsgID) {
  try {
    let db = readDB1(dbFilePath);
    let found = db.find((item) => item[MsgID]);
    return found ? found[MsgID] : false;
  } catch (error) {
    console.error("Error retrieving CMD Store:", error);
    return false;
  }
}

// Find command by cmdId
function getCmdForCmdId(CMD_ID_MAP, cmdId) {
  const result = CMD_ID_MAP.find((entry) => entry.cmdId === cmdId);
  return result ? result.cmd : null;
}

// ===============================

module.exports = {
  connectdb,
  get,
  input,
  getAllSettings,
  addreply,
  getAutoReply,
  getAllAutoReplies,
  updateCMDStore,
  isbtnID,
  getCMDStore,
  getCmdForCmdId
};
// ===============================