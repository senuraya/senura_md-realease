const { cmd } = require("../Utils/command");
const { runtime, fetchJson } = require("../Utils/functions");
const castem = require('../../customization')
const { getRegistry } = require("../Utils/registry");
let ooo = "`";
cmd(
  {
    pattern: "menu",
    desc: "To get the menu.",
    react: "😚",
    category: "main",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      users,
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
const prefix = config.PREFIX;
let menumsg;
let IMG;
if(config.isPremium === true){
  menumsg = castem.MENUMSG(pushname,config);
  IMG = castem.IMG;
}else{
  menumsg = `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> ==========================
> ♠ 𝙾𝚠𝚗𝚎𝚛  : ${config.OWNER_NAME}
> ♠ 𝙼𝚎𝚖    : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require("os").totalmem / 1024 / 1024)}MB
> ==========================`;
  IMG = "https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg"
    }
      const buttons = [
        {
          buttonId: `${prefix}list 1`,
          buttonText: { displayText: "*Search Menu*" },
          type: 1,
        },
        {
          buttonId: `${prefix}list 2`,
          buttonText: { displayText: "*Download Menu*" },
          type: 1,
        },
        {
          buttonId: `${prefix}list 3`,
          buttonText: { displayText: "*Movie Menu*" },
          type: 1,
        },
        {
          buttonId: `${prefix}list 4`,
          buttonText: { displayText: "*Group Menu*" },
          type: 1,
        },
        {
          buttonId: `${prefix}list 5`,
          buttonText: { displayText: "*Owner Menu*" },
          type: 1,
        },
        {
          buttonId: `${prefix}list 6`,
          buttonText: { displayText: "*Convert Menu*" },
          type: 1,
        },
        {
          buttonId: `${prefix}list 7`,
          buttonText: { displayText: "*Ai Menu*" },
          type: 1,
        },
        {
          buttonId: `${prefix}list 8`,
          buttonText: { displayText: "*NSFW Menu*" },
          type: 1,
        },
        {
          buttonId: `${prefix}list 9`,
          buttonText: { displayText: "*Main Menu*" },
          type: 1,
        },
        {
          buttonId: `${prefix}list 10`,
          buttonText: { displayText: "*Logo Menu*" },
          type: 1,
        },
        {
          buttonId: `${prefix}list 10`,
          buttonText: { displayText: "*Tools Menu*" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: { url: IMG },
        caption: menumsg,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };
    if (config.BTN_MSG === false){
      return await conn.nonbuttonMessage(from, buttonMessage);
    } else {
      return await conn.newlist(from,buttonMessage )
    }
    } catch (e) {
      console.error(e);
      reply(`${e}`);
    }
  }
);


//=====================================================================================


cmd(
  {
    pattern: "list",
    desc: "To get the menu.",
    category: "no",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      users,
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
      const commands = await getRegistry();
let menutxt;
let IMG;
if(config.isPremium === true){
  menutxt = castem.MENUMSG(pushname,config);
  IMG = castem.IMG;
}else{
  menutxt = `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> ==========================
> ♠ 𝙾𝚠𝚗𝚎𝚛  : ${config.OWNER_NAME}
> ♠ 𝙼𝚎𝚖    : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require("os").totalmem / 1024 / 1024)}MB
> ==========================`;
  IMG = "https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg"
      }

      let ownerMenu = `
${config.OWNERMENU || "*𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗡𝗨*"}
${menutxt}`;
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].category === "owner") {
          if (!commands[i].dontAddCommandList) {
            ownerMenu += `> ${ooo}*${commands[i].pattern}*${ooo}\n`;
          }
        }
      }

      let convertMenu = `
${config.CONVERTMENU || "*𝗖𝗢𝗡𝗩𝗘𝗥𝗧 𝗠𝗘𝗡𝗨*"}
${menutxt}`;
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].category === "convert") {
          if (!commands[i].dontAddCommandList) {
            convertMenu += `> ${ooo}*${commands[i].pattern}*${ooo}\n`;
          }
        }
      }

      let downloadMenu = `
${config.DOWNLOADMENU || "*𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 𝗠𝗘𝗡𝗨*"}
${menutxt}`;
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].category === "download") {
          if (!commands[i].dontAddCommandList) {
            downloadMenu += `> ${ooo}*${commands[i].pattern}*${ooo}\n`;
          }
        }
      }

      let mainHub = `
${config.MAINMENU || "*𝗠𝗔𝗜𝗡 𝗠𝗘𝗡𝗨*"}

${menutxt}`;
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].category === "main") {
          if (!commands[i].dontAddCommandList) {
            mainHub += `> ${ooo}*${commands[i].pattern}*${ooo}\n`;
          }
        }
      }

      let logoMenu = `
${config.LOGOMENU || "*𝗟𝗢𝗚𝗢 𝗠𝗘𝗡𝗨*"}
${menutxt}`;
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].category === "anime") {
          if (!commands[i].dontAddCommandList) {
            logoMenu += `> ${ooo}*${commands[i].pattern}*${ooo}\n`;
          }
        }
      }
      let groupMenu = `
${config.GROUPMENU || "*𝗚𝗥𝗢𝗨𝗣 𝗠𝗘𝗡𝗨*"}
${menutxt}`;
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].category === "group") {
          if (!commands[i].dontAddCommandList) {
            groupMenu += `> ${ooo}*${commands[i].pattern}*${ooo}\n`;
          }
        }
      }

      let aiMenu = `
${config.AIMENU || "*𝗔𝗜 𝗠𝗘𝗡𝗨*"}
${menutxt}`;
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].category === "ai") {
          if (!commands[i].dontAddCommandList) {
            aiMenu += `> ${ooo}*${commands[i].pattern}*${ooo}\n`;
          }
        }
      }

      let searchMenu = `
${config.SEARCHMENU || "*𝗦𝗘𝗔𝗥𝗖𝗛 𝗠𝗘𝗡𝗨*"}
${menutxt}`;
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].category === "search") {
          if (!commands[i].dontAddCommandList) {
            searchMenu += `> ${ooo}*${commands[i].pattern}*${ooo}\n`;
          }
        }
      }

      let usefulTools = `
${config.USEFULLMENU || "*𝗧𝗢𝗢𝗟𝗦 𝗠𝗘𝗡𝗨*"}
${menutxt}`;
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].category === "other") {
          if (!commands[i].dontAddCommandList) {
            usefulTools += `> ${ooo}*${commands[i].pattern}*${ooo}\n`;
          }
        }
      }
      let movieMenu = `
${config.MOVIEMENU || "*𝗠𝗢𝗩𝗜𝗘 𝗠𝗘𝗡𝗨*"}
${menutxt}`;
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].category === "movie") {
          if (!commands[i].dontAddCommandList) {
            movieMenu += `> ${ooo}*${commands[i].pattern}*${ooo}\n`;
          }
        }
      }

      let nsfwMenu = `
${config.NSFWMENU || "*𝗡𝗦𝗙𝗪 𝗠𝗘𝗡𝗨*"}
${menutxt}`;
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].category === "nsfw") {
          if (!commands[i].dontAddCommandList) {
            nsfwMenu += `> ${ooo}*${commands[i].pattern}*${ooo}\n`;
          }
        }
      }
      let messageType = q;

      if (messageType === "5") {
        // Handle option 1 (Audio File)
        await conn.sendMessage(from, {
          image: { url: IMG || "https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg" }, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
          caption: ownerMenu,
        });
      } else if (messageType === "6") {
        // Handle option 2 (Document File)
        await conn.sendMessage(from, {
          image: { url: IMG || "https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg" }, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
          caption: convertMenu,
        });
      } else if (messageType === "7") {
        await conn.sendMessage(from, {
          image: { url: IMG || 'https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg' }, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
          caption: aiMenu,
        });
      } else if (messageType === "1") {
        await conn.sendMessage(from, {
          image: { url: IMG || 'https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg' }, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
          caption: searchMenu,
        });
      } else if (messageType === "2") {
        await conn.sendMessage(from, {
          image: { url: IMG || 'https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg' }, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
          caption: downloadMenu,
        });
      } else if (messageType === "9") {
        await conn.sendMessage(from, {
          image: { url: IMG || 'https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg' }, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
          caption: mainHub,
        });
      } else if (messageType === "4") {
        await conn.sendMessage(from, {
          image: { url: IMG || 'https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg' }, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
          caption: groupMenu,
        });
      } else if (messageType === "11") {
        await conn.sendMessage(from, {
          image: { url: IMG || 'https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg' }, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
          caption: usefulTools,
        });
      } else if (messageType === "8") {
        await conn.sendMessage(from, {
          image: { url: IMG || 'https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg' }, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
          caption: nsfwMenu,
        });
      } else if (messageType === "10") {
        await conn.sendMessage(from, {
          image: { url: IMG || 'https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg' }, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
          caption: logoMenu,
        });
      } else if (messageType === "3") {
        await conn.sendMessage(from, {
          image: { url: IMG || 'https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg' }, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
          caption: movieMenu,
        });
      }
      // React to the successful completion of the task
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);

