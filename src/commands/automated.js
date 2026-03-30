const fs = require("fs");
const path = require("path");
const { cmd, commands } = require("../Utils/command");
//auto_voice

cmd(
  {
    on: "body",
  },
  async (conn, mek, m, { kee, from, body,config, isOwner }) => {
    const filePath = path.join(__dirname, "../data/autovoice.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    for (const text in data) {
      if (body.toLowerCase() === text.toLowerCase()) {
        if (config.AUTO_VOICE === true) {
          //if (isOwner) return;
          await conn.sendPresenceUpdate("recording", from);
          await conn.sendMessage(
            from,
            { audio: { url: data[text] }, mimetype: "audio/aac", ptt: true },
            { quoted: mek }
          );
        }
      }
    }
  }
);

//auto sticker

cmd(
  {
    on: "body",
  },
  async (conn, mek, m, { kee, from, body,config, isOwner }) => {
    const filePath = path.join(__dirname, "../data/autosticker.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    for (const text in data) {
      if (body.toLowerCase() === text.toLowerCase()) {
        if (config.AUTO_STICKER === true) {
          //if (isOwner) return;
          await conn.sendMessage(
            from,
            { sticker: { url: data[text] }, package: "yourName" },
            { quoted: mek }
          );
        }
      }
    }
  }
);

//auto reply
const {getAutoReply,getAllAutoReplies} = require("../Utils/database");
cmd(
  {
    on: "body",
  },
  async (conn, mek, m, { kee, from, body,config, isOwner }) => {
    //const filePath = path.join(__dirname, "../data/autoreply.json");
    const data = await getAllAutoReplies(`+${conn.user.id.split(":")[0]}`);
    for (const text in data) {
      if (body.toLowerCase() === text.toLowerCase()) {
        if (config.AUTO_REPLY === true) {
          //if (isOwner) return;
          await m.reply(data[text]);
        }
      }
    }
  }
);

cmd(
  { on: "body" },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      config,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    let prefix = config.PREFIX;
    if (config.AUTO_REACT === true && !isCmd) {
      const emojis = [
        "❤",
        "💕",
        "😻",
        "🧡",
        "💛",
        "💚",
        "💙",
        "💜",
        "🖤",
        "❣",
        "💞",
        "💓",
        "💗",
        "💖",
        "💘",
        "💝",
        "💟",
        "♥",
        "💌",
        "🙂",
        "🤗",
        "😌",
        "😉",
        "🤗",
        "😊",
        "🎊",
        "🎉",
        "🎁",
        "🎈",
        "👋",
      ];
      const emokis = emojis[Math.floor(Math.random() * emojis.length)];
      conn.sendMessage(from, {
        react: {
          text: emokis,
          key: mek.key,
        },
      });
    }
  }
);

cmd(
  { on: "body" },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      config,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    let prefix = config.PREFIX;
    if (config.OWNER_REACT === true && isOwner) {
      await conn.sendMessage(from, {
        react: {
          text: config.EMOJI,
          key: mek.key,
        },
      });
    }
  }
);


cmd(
  { on: "body" },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      config,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    if (config.AUTO_TYPING === true) {
      conn.sendPresenceUpdate("composing", from);
      setTimeout(() => conn.sendPresenceUpdate("paused", from), 3000); // stops "typing" after 3 seconds
    }
  }
);


cmd(
  { on: "body" },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      config,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    if (config.AUTO_RECORDING === true) {
      conn.sendPresenceUpdate("recording", from);
      setTimeout(() => conn.sendPresenceUpdate("paused", from), 3000); // stops "typing" after 3 seconds
    }
  }
);