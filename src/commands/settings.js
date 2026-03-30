const fs = require("fs");
const { sleep } = require("../Utils/functions");
const path = require("path");
const { cmd, commands } = require("../Utils/command");
var {
  updateCMDStore,
  isbtnID,
  getCMDStore,
  getCmdForCmdId,
  connectdb,
  addreply,
  input,
  get,
  updb,
} = require("../Utils/database");


cmd(
  {
    pattern: "antideljid",
    desc: "Set the ANti Delete Jid",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    if (!q) return await reply("Please specify a prefix.");
    await input("DELMSG", q,`+${conn.user.id.split(":")[0]}`);
    reply(`ANTI DELETE JID has been set to "${q}".`);
  }
);


cmd(
  {
    pattern: "setprefix",
    desc: "Set the command prefix",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    if (!q) return await reply("Please specify a prefix.");
    await input("PREFIX", q,`+${conn.user.id.split(":")[0]}`);
    reply(`Prefix has been set to "${q}".`);
  }
);


cmd(
  {
    pattern: "autonews",
    desc: "Set the AI MODE",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");

    const mode = q.toUpperCase(); // Convert input to uppercase

    if (mode == "ON") {
      await input("AUTO_NEWS", true,`+${conn.user.id.split(":")[0]}`);
      reply(`✅ AUTO NEWS has been turned ON.`);
    } else {
      await input("AUTO_NEWS", mode,`+${conn.user.id.split(":")[0]}`);
      reply(`✅ AUTO NEWS has been turned ON for ${mode}.`);
    }
  }
);


cmd(
  {
    pattern: "addsetting",
    desc: "Set a setting value in config",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, q,senderNumber, reply, isOwner }) => {
    if (!senderNumber === "94717775628") return await reply("❌ You are not the owner!");

    if (!q || !q.includes(" & ")) {
      return await reply("⚠️ Please use the format: `.addsetting settingName & value`");
    }

    let setting = q.split(" & ")[0]?.trim();
    let value = q.split(" & ")[1]?.trim();

    if (!setting || !value) {
      return await reply("⚠️ Invalid format or missing values.");
    }

    // Optional: If you have an input validation function
    if (typeof input === "function") {
      await input(setting, value,`+${conn.user.id.split(":")[0]}`);
    }
    reply(`✅ *${setting}* has been set to "*${value}*".`);
  }
);




cmd(
  {
    pattern: "setai",
    desc: "Set the AI MODE",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");

    const mode = q.toUpperCase(); // Convert input to uppercase

    if (mode !== "ANJU" && mode !== "RASH") {
      return await reply(
        "❌ Please specify either 'ANJU' or 'RASH' in capital letters."
      );
    }
    await input("AI_MODE", mode,`+${conn.user.id.split(":")[0]}`);
    reply(`✅ AI MODE has been set to "${mode}".`);
  }
);

cmd(
  {
    pattern: "addreply",
    desc: "Add or update autoreply messages",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");

    if (!q || !q.includes(" & ")) {
      return await reply("📝 Usage: .addreply hi & Hello! How are you?");
    }
    const [message, responseText] = q.split(" & ");
    await addreply(message, responseText,`+${conn.user.id.split(":")[0]}`);
    return await reply(`✅ Reply for *"${message}"* has been added/updated.`);
  }
);


cmd(
  {
    pattern: "setautomovie",
    desc: "Set the news jid",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    if (!q) return await reply("Please specify a jid.");
    await input("AUTO_MOVIE_JID", q,`+${conn.user.id.split(":")[0]}`);
    reply(`AUTO_MOVIE_JID has been set to "${q}".`);
  }
);


cmd(
  {
    pattern: "setnews",
    desc: "Set the news jid",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    if (!q) return await reply("Please specify a jid.");
    await input("NEWS_JID", q,`+${conn.user.id.split(":")[0]}`);
    reply(`News Jid has been set to "${q}".`);
  }
);


cmd(
  {
    pattern: "setsong",
    desc: "Set the news jid",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    if (!q) return await reply("Please specify a jid.");
    await input("SONG_JID", q,`+${conn.user.id.split(":")[0]}`);
    reply(`SONG Jid has been set to "${q}".`);
  }
);

cmd(
  {
    pattern: "addmovie",
    desc: "Add a Movie JID",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from,config, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");

    let jid = q || from; // If no JID is provided, default to `from`

    const value = config.MOVIE_JID || [];

    if (value.includes(jid)) {
      return await reply(`❌ This JID is already in the list.`);
    }

    value.push(jid);
    await input("MOVIE_JID", value,`+${conn.user.id.split(":")[0]}`);
    reply(`Movie Jid "${jid}" has been added.`);
  }
);

cmd(
  {
    pattern: "delmovie",
    desc: "Delete a Movie JID",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from,config, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");

    let jid = q || from; // If no JID is provided, default to `from`
    const value = config.MOVIE_JID || [];

    const index = config.MOVIE_JID.indexOf(jid);
    if (index === -1) {
      return await reply(`❌ This JID is not in the list.`);
    }

    value.splice(index, 1);
    await input("MOVIE_JID", value,`+${conn.user.id.split(":")[0]}`);
    reply(`Movie Jid "${jid}" has been deleted.`);
  }
);

cmd(
  {
    pattern: "resetmovie",
    desc: "Reset the Movie JID list",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    let value = [];
    await input("MOVIE_JID", false,`+${conn.user.id.split(":")[0]}`);
    reply(`Movie Jid list has been reset.`)
});


cmd(
  {
    pattern: "setadmin",
    desc: "Set the Admin name",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    await input("MNAME", q,`+${conn.user.id.split(":")[0]}`);
    reply(`Admin Name has been set to "${q}".`);
  }
);


cmd(
  {
    pattern: "ban",
    desc: "Add a JID to the banned list",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, q,config, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");

    let jid = q && q.trim() ? q.trim() : from; // Use provided JID or fallback to the current chat JID
    if (!config.BANNED) config.BANNED = []; // Ensure BANNED exists as an array

    let value = config.BANNED || [];

    if (config.BANNED.includes(jid)) {
      return await reply(`❌ The JID "${jid}" is already banned.`);
    }
    value.push(jid);
    await input("BANNED", value,`+${conn.user.id.split(":")[0]}`);
    reply(`✅ The JID "${jid}" has been added to the banned list.`);
  }
);


cmd(
  {
    pattern: "unban",
    desc: "Remove a JID from the banned list",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, q,config, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");

    let jid = q && q.trim() ? q.trim() : null;
    if (!jid) return await reply("❌ Please provide a JID to unban.");

    if (!config.BANNED || !config.BANNED.includes(jid)) {
      return await reply(`❌ The JID "${jid}" is not in the banned list.`);
    }
    let value = config.BANNED || [];
    value = value.filter((bannedJid) => bannedJid !== jid);
    await input("BANNED", value,`+${conn.user.id.split(":")[0]}`);
    reply(`✅ The JID "${jid}" has been removed from the banned list.`);
  }
);


cmd(
  {
    pattern: "addsudo",
    desc: "Add a JID to the banned list",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from,config, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    if (!q) return reply("❌ Please give me a number!");
    let jid = q;
    if (!config.SUDO) config.SUDO = []; // Ensure BANNED exists as an array

    if (config.SUDO.includes(jid)) {
      return await reply(`❌ The Number "${jid}" is already Sudo.`);
    }
    let value = config.SUDO || [];
    value.push(jid);
    await input("SUDO", value,`+${conn.user.id.split(":")[0]}`);
    reply(`✅ The Number "${jid}" has been added to the Sudo list.`);
  }
);


cmd(
  {
    pattern: "delsudo",
    desc: "Remove a JID from the banned list",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, q,config, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    if (!q) return reply("❌ Please give me a number!");
    let jid = q;
    if (!jid)
      return await reply("❌ Please provide a Number to remove from Sudo.");

    if (!config.SUDO || !config.SUDO.includes(jid)) {
      return await reply(`❌ The Number "${jid}" is not in the SUDO list.`);
    }
    let value = config.SUDO || [];
    value = value.filter((bannedJid) => bannedJid !== jid);
    await input("SUDO", value,`+${conn.user.id.split(":")[0]}`);
    reply(`✅ The Number "${jid}" has been removed from the SUDO list.`);
  }
);


cmd(
  {
    pattern: "setreact",
    desc: "Set the Owner react",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    if (!q) return await reply("Please specify emoji.");
    await input("EMOJI", q,`+${conn.user.id.split(":")[0]}`);
    reply(`Owner React has been set to "${q}".`);
  }
);


cmd(
  {
    pattern: "autoreadstatus",
    desc: "Enable or disable auto-read status",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    if (q === "on") {
      await input("AUTO_READ_STATUS", true,`+${conn.user.id.split(":")[0]}`);
      reply("AUTO READ STATUS has been turned ON.");
    } else if (q === "off") {
      await input("AUTO_READ_STATUS", false,`+${conn.user.id.split(":")[0]}`);
      reply("AUTO READ STATUS has been turned OFF.");
    } else {
      return await reply('Please specify "on" or "off".');
    }
  }
);


cmd(
  {
    pattern: "setmode",
    desc: "Set the bot mode to public,groups,inbox or private",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    if (q === "public" || q === "private" || q === "groups" || q === "inbox") {
      await input("MODE", q,`+${conn.user.id.split(":")[0]}`);
      reply(`Bot mode has been set to "${q}".`);
    } else {
      reply(
        'Please specify "public" or "private" or "groups" or "inbox" for the mode.'
      );
    }
  }
);


cmd(
  {
    pattern: "setbotnumber",
    desc: "Set the bot number",
    category: "settings",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    if (!q) return await reply("Please specify a bot number.");
    await input("OWNER_NUMBER", q,`+${conn.user.id.split(":")[0]}`);
    reply(`Bot number has been set to "${q}".`);
  }
);

// Helper function to create a command that toggles a boolean setting
function createBooleanConfigCommand(setting) {
  return async (conn, mek, m, { kee, from, q, reply, isOwner }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    try {
      if (q === "on") {
        await input(setting, true,`+${conn.user.id.split(":")[0]}`);
        reply(`${setting.replace("_", " ")} has been turned ON.`);
      } else if (q === "off") {
        await input(setting, false,`+${conn.user.id.split(":")[0]}`);
        reply(`${setting.replace("_", " ")} has been turned OFF.`);
      } else {
        reply(
          `Please specify "on" or "off" to set ${setting
            .replace("_", " ")
            .toLowerCase()}.`
        );
        return;
      }
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  };
}

// Register commands for each boolean setting

cmd(
  {
    pattern: "autovoice",
    desc: "Enable or disable auto voice messages",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("AUTO_VOICE")
);


cmd(
  {
    pattern: "automovie",
    desc: "Enable or disable auto voice messages",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("AUTO_MOVIE")
);


cmd(
  {
    pattern: "autosticker",
    desc: "Enable or disable auto sticker",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("AUTO_STICKER")
);


cmd(
  {
    pattern: "autoreply",
    desc: "Enable or disable auto-reply",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("AUTO_REPLY")
);


cmd(
  {
    pattern: "autoreact",
    desc: "Enable or disable auto-reaction",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("AUTO_REACT")
);


cmd(
  {
    pattern: "welcome",
    desc: "Enable or disable welcome messages",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("WELCOME")
);


cmd(
  {
    pattern: "antibad",
    desc: "Enable or disable anti-bad language filter",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("ANTI_BAD")
);


cmd(
  {
    pattern: "antibot",
    desc: "Enable or disable anti-bot protection",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("ANTI_BOT")
);


cmd(
  {
    pattern: "antilink",
    desc: "Enable or disable anti-link filter",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("ANTI_LINK")
);


cmd(
  {
    pattern: "anticall",
    desc: "Enable or disable anti-call filter",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("ANTI_CALL")
);


cmd(
  {
    pattern: "antidelete",
    desc: "Enable or disable anti-delete filter",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("ANTI_DELETE")
);


cmd(
  {
    pattern: "allwaysonline",
    desc: "Enable or disable always online mode",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("ALLWAYS_ONLINE")
);


cmd(
  {
    pattern: "moroccoblock",
    desc: "Enable or disable Morocco block feature",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("MOROCCO_BLOCK")
);


cmd(
  {
    pattern: "readcmd",
    desc: "Enable or disable Read Cmd feature",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("READ_CMD")
);


cmd(
  {
    pattern: "autotyping",
    desc: "Enable or disable auto Typing",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("AUTO_TYPING")
);


cmd(
  {
    pattern: "autorecording",
    desc: "Enable or disable auto Typing",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("AUTO_RECORDING")
);



cmd(
  {
    pattern: "ownerreact",
    desc: "Enable or disable owner react",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("OWNER_REACT")
);


cmd(
  {
    pattern: "aimode",
    desc: "Enable or disable AI MODE",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("AI_MODE")
);


cmd(
  {
    pattern: "nightmode",
    desc: "Enable or disable AI MODE",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("NIGHT_MODE")
);


cmd(
  {
    pattern: "autosong",
    desc: "Enable or disable AI MODE",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("AUTO_SONG")
);


cmd(
  {
    pattern: "autobirthday",
    desc: "Enable or disable AI MODE",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("AUTO_BIRTHDAY")
);


cmd(
  {
    pattern: "btnmsg",
    desc: "Enable or disable btn MODE",
    category: "settings",
    filename: __filename,
  },
  createBooleanConfigCommand("BTN_MSG")
);
