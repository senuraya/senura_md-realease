const { cmd, commands } = require("../Utils/command");
const {
  instagram2,
  instagram3,
  ytPlayMp4,
  ytPlayMp3,
  textpro,
  ephoto,
} = require("../Utils/scraper");
//===Logo
cmd(
  {
    pattern: "write",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .write Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤] *`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "starsnight",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .starsnight Manul`);
      let link = "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "leaves",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .leaves Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "metalstar",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .metalstar Manul`);
      let link = "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "starzodiac",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .starzodiac Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "avatargold",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .avatargold Manul`);
      let link = "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "frozen",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .frozen Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "neondevil",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .neondevil Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "snow3d",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .snow3d Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "birthday",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .birthday Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "colorfulangel",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .colorfulangel Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "makingneon",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .makingneon Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "beautifulgold",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .beautifulgold Manul`);
      let link = "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "thunder",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .thunder Manul`);
      let link = "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "galaxy1",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .galaxy1 Manul`);
      let link = "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "write",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .write Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "advancedglow",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .advancedglow Manul`);
      let link = "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "typography",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .typography Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "pixelglitch",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .pixelglitch Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : ©𝐌𝐑 [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "neonglitch",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .neonglitch Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "glitch",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .glitch Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);

//====

cmd(
  {
    pattern: "flag",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .flag Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//=====

cmd(
  {
    pattern: "flag3",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .flag3 Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "deleting",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .deleting Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "blackpink",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .blackpink Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "glowing",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .glowing Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "underwater",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .underwater Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "logomaker",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .logomaker Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "cartoon",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .cartoon Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "papercut",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .papercut Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "glitch",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .glitch Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "watercolor",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .watercolor Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "effectcloud",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .effectcloud Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "gradien",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .gradien Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "summerbeach",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .summerbeach Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "luxurygold",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .luxurygold Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "multicolourneon",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .multicolourneon Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "sandsummer",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .sandsummer Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "galaxywallpaper",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .galaxywallpaper Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "1971",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .1971 Manul`);
      let link = "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "makingneon",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .makingneon Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "royal",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .royal Manul`);
      let link =
        "https://en.ephoto360.com/royal-text-effect-online-free-471.html";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "freecreate",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .freecreate Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "galaxystyle",
    react: "💫",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .galaxystyle Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
//====

cmd(
  {
    pattern: "lighteffect",
    react: "💫",
    desc: "Download anime maid images.",
    category: "anime",
    use: ".maid",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      mnu,
      quoted,
      body,
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
      if (!q) return await reply(`Example : .lighteffect Manul`);
      let link =
        "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png";

      let haldwhd = await ephoto(link, q);
      conn.sendMessage(
        m.chat,
        {
          image: { url: haldwhd },
          caption: `> *⚖️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 - : [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      reply(`${e}`);
      console.log(e);
    }
  }
);
