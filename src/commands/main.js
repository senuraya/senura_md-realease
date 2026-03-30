const castem = require("../../customization");
const os = require("os");
const { cmd, commands } = require("../Utils/command");
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
} = require("../Utils/functions");

cmd(
  {
    pattern: "alive",
    react: "🍬",
    alias: ["online", "test", "bot"],
    desc: "Check bot online or no.",
    category: "main",
    use: ".alive",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      prefix,
      l,
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
    try {
      if (os.hostname().length == 12) hostname = "replit";
      else if (os.hostname().length == 36) hostname = "heroku";
      else if (os.hostname().length == 8) hostname = "koyeb";
      else hostname = os.hostname();
      let captionHeader;
      let alivevoice;
      let aliveimg;
      if (config.isPremium === true){
        captionHeader = castem.ALIVEMSG(config, pushname, runtime);
        alivevoice = castem.ALIVEVOICE;
        aliveimg = castem.IMG
      }else{
        captionHeader = `
> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> [  A  L  I  V  E  ]
> =======================
> 𝗜'𝗺 𝗔𝗹𝗶𝘃𝗲, 𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝗔𝘀𝗸𝗶𝗻𝗴!
>>>>>>>>>>>>>>>>>>>>>>>>>
┏━━━━❮𝑻𝑶𝑫𝑎𝒚❯━━━━
┃ *${new Date().toLocaleDateString("en-GB", {timeZone: "Asia/Colombo",})}*
┃ *${new Date().toLocaleTimeString("en-GB", {timeZone: "Asia/Colombo",})}*
┗━━━━━━━━━━━━━━━
>>>>>>>>>>>>>>>>>>>>>>>>>
┏━━━━❮𝗦𝘁𝗮𝘁𝘂𝘀 𝗗𝗲𝘁𝗮𝗶𝗹𝘀❯━━━
┃𝙼𝚘𝚍𝚎 : ${config.MODE}
┃𝚄𝚙𝚝𝚒𝚖𝚎 : ${runtime(process.uptime())}
┃𝙼𝚎𝚖 : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require("os").totalmem / 1024 / 1024)}MB
┗━━━━━━━━━━━━━━━
> ======================`
      alivevoice = "./src/media/Auto_voice/alive.aac"
      aliveimg = "https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg"
    }
      await conn.sendMessage(
        from,
        {
          audio: { url: alivevoice },
          mimetype: "audio/mp4",
          //ptt: true,
        },
        { quoted: mek }
      );
      const buttons = [
        {
          buttonId: prefix + "menu",
          buttonText: { displayText: "*COMMANDS MENU*" },
          type: 1,
        },
        {
          buttonId: prefix + "ping",
          buttonText: { displayText: "*BOT'S SPEED*" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: { url: aliveimg },
        caption: captionHeader,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };
      if(config.BTN_MSG === false){
        return await conn.nonbuttonMessage(from, buttonMessage);
      } else {
        return await conn.newButton(from, buttonMessage);
      }
    } catch (e) {
      reply("*Error !!*");
      l(e);
    }
  }
);

//system

cmd(
  {
    pattern: "system",
    alias: ["status", "botinfo"],
    react: "🏷️",
    desc: "To Check uptime , ram and more.",
    category: "main",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      prefix,
      quoted,
      body,
      config,
      isCmd,
      command,
      args,
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
    try {
      let status = `
> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> [  S  Y  S  T  E  M  ]
> [  S  T  A  T  U  S  ]
> =======================
> *UPTIME*: ${runtime(process.uptime())}
> *RAM USAGE*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require("os").totalmem / 1024 / 1024)}MB
> *HOST NAME*: ${os.hostname()}
> *BOT OWNER*: ${config.OWNERNAME}
> =======================`;
      const buttons = [
        {
          buttonId: prefix + "menu",
          buttonText: { displayText: "*COMMANDS MENU*" },
          type: 1,
        },
        {
          buttonId: prefix + "ping",
          buttonText: { displayText: "*BOT'S SPEED*" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: { url: "https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg" },
        caption: status,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };
      if(config.BTN_MSG === false){
        return await conn.nonbuttonMessage(from, buttonMessage);
      } else {
        return await conn.newButton(from, buttonMessage);
        //return await conn.oldButton(from, buttonMessage);
      }
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);

//ping

cmd(
  {
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "❤️‍🩹",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      kee,
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
    try {
      const startTime = Date.now();
      const message = await conn.sendMessage(
        from,
        { text: "𝗣𝗶𝗻𝗴𝗶𝗻𝗴..." },
        { quoted: kee }
      );
      const endTime = Date.now();
      const ping = endTime - startTime;
      await conn.sendMessage(
        from,
        { text: `⏰ 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝗧𝗶𝗺𝗲 : ${ping}ms`, edit:message.key },
        { quoted: kee }
      );
    } catch (e) {
      console.error(e);
      reply(`❌ An error occurred: ${e.message}`);
    }
  }
);

//owner

cmd(
  {
    pattern: "owner",
    react: "👨‍💻",
    alias: ["dev", "createor", "developer"],
    desc: "Get bot's command list.",
    category: "main",
    use: ".menu",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      config,
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
    try {
      let tex = `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> *MY 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢*
> ======================
> *⚡ηαмє -: ${config.OWNERNAME || "KING SENURA*"}
> *⚡αgє -: 17*
> *⚡ηυмвєя* -: +${config.OWNER_NUMBER || "94787751901"}
> *⚡уσυтυвє* -: https://www.youtube.com/@Musichubsen
> >>>>>>>>>>>>>>>>>>>>>>💗*
> ======================`;

      // send a contact!
      const vcard =
        "BEGIN:VCARD\n" + // metadata of the contact card
        "VERSION:3.0\n" +
        "FN:MR RASHMIKA\n" + // full name
        "ORG:JANITH RASHMIKA;\n" + // the organization of the contact
        "TEL;type=CELL;type=VOICE;waid=94717775628:+94 71777 5628\n" + // WhatsApp ID + phone number
        "END:VCARD";
await conn.sendMessage(from, {
        contacts: {
          displayName: "Janith Rashmika",
          contacts: [{ vcard }],
        },
      });

await conn.sendMessage(
        from,
        {
          image: { url: "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png" },
          caption: tex,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);

//
