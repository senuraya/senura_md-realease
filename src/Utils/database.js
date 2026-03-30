const path = require('path');
const fs = require('fs');

// ===============================
// Local Storage Paths
// ===============================
const configDir = path.join(__dirname, '../../session/database');
if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });

function getPaths(botNumber) {
    const safeNum = botNumber.replace(/[^0-9]/g, '');
    return {
        settings: path.join(configDir, `${safeNum}.config.cjs`),
        replies: path.join(configDir, `${safeNum}.autoreply.json`)
    };
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
    SUDO: ["94787751901"],
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
// Local Memory Cache
// ===============================
const localCache = {
    settings: new Map(),
    autoReplies: new Map(),
    apiAvailable: true // Start assuming API is available
};

// ===============================
// File Management Functions
// ===============================
function saveSettingsLocal(botNumber, data) {
    try {
        const { settings: filePath } = getPaths(botNumber);
        const content = `module.exports = ${JSON.stringify(data, null, 2)};`;
        fs.writeFileSync(filePath, content);
        localCache.settings.set(botNumber, data);
        return true;
    } catch (error) {
        console.error('Error saving settings locally:', error.message);
        return false;
    }
}

function saveRepliesLocal(botNumber, data) {
    try {
        const { replies: filePath } = getPaths(botNumber);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        localCache.autoReplies.set(botNumber, data);
        return true;
    } catch (error) {
        console.error('Error saving replies locally:', error.message);
        return false;
    }
}

function loadSettingsLocal(botNumber) {
    try {
        const { settings: filePath } = getPaths(botNumber);
        if (fs.existsSync(filePath)) {
            delete require.cache[require.resolve(filePath)];
            const settings = require(filePath);
            localCache.settings.set(botNumber, settings);
            return settings;
        }
    } catch (error) {
        console.error('Error loading local settings:', error.message);
    }
    return null;
}

function loadRepliesLocal(botNumber) {
    try {
        const { replies: filePath } = getPaths(botNumber);
        if (fs.existsSync(filePath)) {
            const replies = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            localCache.autoReplies.set(botNumber, replies);
            return replies;
        }
    } catch (error) {
        console.error('Error loading local replies:', error.message);
    }
    return null;
}

// ===============================
// Simple API Client (Optional - for sync)
// ===============================
const API_CONFIG = {
    BASE_URL: process.env.API_URL || "https://xpro-settings.vercel.app/api",
    API_KEY: process.env.API_KEY || "xprodata2"
};

async function callAPI(endpoint, method = 'GET', data = null) {
    if (!localCache.apiAvailable) return null;
    
    const https = require('https');
    
    return new Promise((resolve) => {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        const parsedUrl = new URL(url);
        
        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || 443,
            path: parsedUrl.pathname + parsedUrl.search,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_CONFIG.API_KEY
            },
            timeout: 3000
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => { 
                responseData += chunk; 
            });
            
            res.on('end', () => {
                try {
                    const parsed = responseData ? JSON.parse(responseData) : {};
                    resolve(parsed);
                } catch (error) {
                    resolve(null);
                }
            });
        });

        req.on('error', () => {
            localCache.apiAvailable = false;
            resolve(null);
        });

        req.on('timeout', () => {
            req.destroy();
            localCache.apiAvailable = false;
            resolve(null);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

// ===============================
// CORE FUNCTIONS (Local-first with optional API sync)
// ===============================

async function connectdb(botNumber) {
    if (!botNumber) return defaultSettings;
    
    // 1. Try local cache first
    if (localCache.settings.has(botNumber)) {
        return localCache.settings.get(botNumber);
    }
    
    // 2. Try local file
    const localSettings = loadSettingsLocal(botNumber);
    const localReplies = loadRepliesLocal(botNumber);
    
    if (localSettings) {
        if (localReplies) localCache.autoReplies.set(botNumber, localReplies);
        return localSettings;
    }
    
    // 3. Try API if available
    if (localCache.apiAvailable) {
        try {
            const response = await callAPI(`/bots/${botNumber}`);
            if (response && response.success && response.data) {
                const settings = response.data.settings || defaultSettings;
                const replies = response.data.auto_replies || defaultAutoReply;
                
                saveSettingsLocal(botNumber, settings);
                saveRepliesLocal(botNumber, replies);
                
                return settings;
            }
        } catch (error) {
            console.log('API connectdb failed, using defaults');
            localCache.apiAvailable = false;
        }
    }
    
    // 4. Create local defaults
    saveSettingsLocal(botNumber, defaultSettings);
    saveRepliesLocal(botNumber, defaultAutoReply);
    
    return defaultSettings;
}

async function get(botNumber, setting) {
    // Get from cache or load
    let settings = localCache.settings.get(botNumber);
    if (!settings) {
        settings = await connectdb(botNumber);
    }
    
    return settings[setting] ?? defaultSettings[setting];
}

async function getAllSettings(botNumber) {
    return await connectdb(botNumber);
}

async function input(setting, value, botNumber) {
    if (!botNumber) return false;
    
    // Update local
    let settings = localCache.settings.get(botNumber);
    if (!settings) {
        settings = await connectdb(botNumber);
    }
    
    settings[setting] = value;
    localCache.settings.set(botNumber, settings);
    saveSettingsLocal(botNumber, settings);
    
    // Try to update API in background (silently fail if offline)
    if (localCache.apiAvailable) {
        setTimeout(async () => {
            try {
                await callAPI(`/bots/${botNumber}/settings/${setting}`, 'PUT', { value });
            } catch (error) {
                // Silently fail
            }
        }, 100);
    }
    
    return true;
}

async function addreply(botNumber, key, message) {
    if (!botNumber) return false;
    
    // Update local
    let replies = localCache.autoReplies.get(botNumber);
    if (!replies) {
        replies = await getAllAutoReplies(botNumber);
    }
    
    replies[key.toLowerCase()] = message;
    localCache.autoReplies.set(botNumber, replies);
    saveRepliesLocal(botNumber, replies);
    
    // Try to update API in background
    if (localCache.apiAvailable) {
        setTimeout(async () => {
            try {
                await callAPI(`/bots/${botNumber}/auto-replies`, 'POST', { key, message });
            } catch (error) {
                // Silently fail
            }
        }, 100);
    }
    
    return true;
}

async function getAutoReply(botNumber, key) {
    let replies = localCache.autoReplies.get(botNumber);
    if (!replies) {
        replies = await getAllAutoReplies(botNumber);
    }
    return replies[key.toLowerCase()] || null;
}

async function getAllAutoReplies(botNumber) {
    if (localCache.autoReplies.has(botNumber)) {
        return localCache.autoReplies.get(botNumber);
    }
    
    const localReplies = loadRepliesLocal(botNumber);
    if (localReplies) {
        return localReplies;
    }
    
    if (localCache.apiAvailable) {
        try {
            const response = await callAPI(`/bots/${botNumber}/auto-replies`);
            if (response && response.success && response.data) {
                const replies = response.data.auto_replies || defaultAutoReply;
                saveRepliesLocal(botNumber, replies);
                return replies;
            }
        } catch (error) {
            localCache.apiAvailable = false;
        }
    }
    
    saveRepliesLocal(botNumber, defaultAutoReply);
    return defaultAutoReply;
}

// ===============================
// CMD STORE Functions
// ===============================
const dbFilePath = path.join(__dirname, "data.json");

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

const writeDB1 = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing to database: ${error.message}`);
  }
};

async function updateCMDStore(MsgID, CmdID) {
  try {
    let db = readDB1(dbFilePath);
    db.push({ [MsgID]: CmdID });
    writeDB1(dbFilePath, db);
    return true;
  } catch (error) {
    console.error("Error updating CMD store:", error);
    return false;
  }
}

async function isbtnID(MsgID) {
  try {
    let db = readDB1(dbFilePath);
    return db.some((item) => item[MsgID]);
  } catch (error) {
    console.error("Error checking button ID:", error);
    return false;
  }
}

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

function getCmdForCmdId(CMD_ID_MAP, cmdId) {
  const result = CMD_ID_MAP.find((entry) => entry.cmdId === cmdId);
  return result ? result.cmd : null;
}

// Test API connection
async function testAPIConnection() {
    try {
        const response = await callAPI('/test');
        localCache.apiAvailable = response && response.success;
        return localCache.apiAvailable;
    } catch (error) {
        localCache.apiAvailable = false;
        return false;
    }
}

// Test on startup
setTimeout(testAPIConnection, 2000);

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
    getCmdForCmdId,
    testAPIConnection
};