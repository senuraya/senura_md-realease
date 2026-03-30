const { cmd, commands } = require("../Utils/command");
const { fetchJson } = require("../Utils/functions");
const forwardCommand = {
  pattern: "forward",
  desc: "Forward messages",
  alias: ["fo"],
  category: "owner",
  use: ".forward jid,id,jid......",
  filename: __filename,
};

cmd(
  forwardCommand,
  async (
    conn, // Represents the connection
    mek, // Message object
    m, // Store for additional information
    {
      kee,
      from, // Origin of the message
      quoted, // Quoted message object
      q, // Query parameter (target JID(s))
      isOwner, // If the sender is the bot owner
      reply, // Function to reply to the sender
    }
  ) => {
    // Ensure the command is executed by the owner
    if (!isOwner) {
      return await reply("Owner Only ❌");
    }

    // Validate the input
    if (!q) {
      return await reply("Please provide one or more target JID addresses ❌");
    }

    if (!quoted) {
      return await reply("Please reply to a message you want to forward ❌");
    }
      let qb = m.quoted ? m.quoted : m;
      let mime = qb.msg?.mimetype || "";
  if (mime.startsWith("image/")) {
      // Download the quoted image
      let media = await qb.download();
      // Split the JIDs by commas and trim any extra whitespace
    const targetJIDs = q.split(",").map((jid) => jid.trim());

    // Extract the quoted message object
    const forwardMessage = quoted.fakeObj ? quoted.fakeObj : quoted;
    let caption = forwardMessage.message.imageMessage.caption;

    // Track the status of each forwarding attempt
    let successCount = 0;
    let failureCount = 0;

    for (const jid of targetJIDs) {
      try {
        // Forward the message to each target JID
        await conn.sendMessage(
          jid,
          { 
            image: media,
            caption: caption
           },
          { quoted: kee }
        );
        successCount++;
      } catch (error) {
        console.error(`Error forwarding message to ${jid}:`, error);
        failureCount++;
      }
    }

    // Send a summary of the operation to the owner
    const summary = `*Forwarding completed:*\n\n✅ Success: ${successCount}\n❌ Failed: ${failureCount}`;
    return await reply(summary);
  } else {
    // Split the JIDs by commas and trim any extra whitespace
    const targetJIDs = q.split(",").map((jid) => jid.trim());

    // Extract the quoted message object
    const forwardMessage = quoted.fakeObj ? quoted.fakeObj : quoted;
//    console.log(forwardMessage)

    // Track the status of each forwarding attempt
    let successCount = 0;
    let failureCount = 0;

    for (const jid of targetJIDs) {
      try {
        // Forward the message to each target JID
        await conn.sendMessage(
          jid,
          { forward: forwardMessage },
          { quoted: kee }
        );
        successCount++;
      } catch (error) {
        console.error(`Error forwarding message to ${jid}:`, error);
        failureCount++;
      }
    }

    // Send a summary of the operation to the owner
    const summary = `*Forwarding completed:*\n\n✅ Success: ${successCount}\n❌ Failed: ${failureCount}`;
    return await reply(summary);
  }
}
);


cmd(
  {
    pattern: "pair",
    alias: ["register", "link"],
    react: "🔢",
    desc: "Link a number for pairing",
    category: "utility",
    use: ".pair <number>",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from,config, prefix, quoted, q, reply }) => {
    try {
      const mnu = {
        key: {
          participants: "0@s.whatsapp.net",
          remoteJid: "status@broadcast",
          fromMe: true,
          id: "©𝐌𝐑 𝐒𝐄𝐍𝐔𝐑𝐀 𝐎𝐅𝐂 💚",
        },
        message: {
          contactMessage: {
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:Sy\nitem1.TEL;waid=${
              m.sender.split("@")[0]
            }:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
          },
        },
        participant: "0@s.whatsapp.net",
      };

      if (!q) {
        return await reply("Example: .pair +94742274855");
      }

      // Fetch pairing code from the API
      const pair = await fetchJson(
        `https://magic-meagan-gamingrash-11daea8d.koyeb.app/code?number=${q}`
      );
      const done = `
> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> ===================
> *Paired Successfully...*
> Pairing Code: *${pair.code}*
> ===================`;
     // Reply with the success message
      await reply(done);
    } catch (e) {
      console.error(e);
      await reply(`An error occurred: ${e.message}`);
    }
  }
);


const renameCommand = {
  pattern: "rename",
  desc: "Rename and resend a document",
  alias: ["rn"],
  category: "owner",
  use: ".rename NewFileName.mp4",
  filename: __filename,
};

cmd(
  renameCommand,
  async (
    conn,
    mek,
    store,
    {
      from,
      quoted,
      kee,
      q, // new file name
      isOwner,
      reply,
    }
  ) => {
    // Ensure the command is executed by the owner
    if (!isOwner) {
      return await reply("Owner Only ❌");
    }

    // Validate the input
    if (!q) {
      return await reply(
        "Please provide Name & JID & caption addresses ❌\neg: .rename newfile.mp4 & 94758775628@s.whatsapp.net & caption is this"
      );
    }

    if (!quoted) {
      return await reply("Please reply to a message you want to forward ❌");
    }
    const data = q.split(" & ");
    const newFileName = data[0] || q;
    const sendTo = data[1] || from;
    const caption = data[2];
    // Split the JIDs by commas and trim any extra whitespace
    const targetJIDs = sendTo.split(",").map((jid) => jid.trim());

    // Extract the quoted message object
    const forwardMessage = quoted.fakeObj ? quoted.fakeObj : quoted;

    // Change filename in message.documentMessage
    if (forwardMessage.message?.documentMessage) {
      forwardMessage.message.documentMessage.fileName = newFileName;
    }

    if (forwardMessage.message?.documentMessage && caption) {
      forwardMessage.message.documentMessage.caption = caption;
    }

    // Change filename in msg
    if (forwardMessage.msg) {
      forwardMessage.msg.fileName = newFileName;
    }

    // Track the status of each forwarding attempt
    let successCount = 0;
    let failureCount = 0;

    for (const jid of targetJIDs) {
      try {
        // Forward the message to each target JID
        await conn.sendMessage(
          jid,
          { forward: forwardMessage },
          { quoted: kee }
        );
        successCount++;
      } catch (error) {
        console.error(`Error forwarding message to ${jid}:`, error);
        failureCount++;
      }
    }

    // Send a summary of the operation to the owner
    const summary = `*Forwarding completed:*\n\n✅ Success: ${successCount}\n❌ Failed: ${failureCount}`;
    return await reply(summary);
  }
);

cmd(
  {
    pattern: "getdp",
    react: "😍",
    desc: "Link a number for pairing",
    category: "owner",
    use: ".pair <number>",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, isOwner, prefix, quoted, q, reply }) => {
    try {
      const mnu = {
        key: {
          participants: "0@s.whatsapp.net",
          remoteJid: "status@broadcast",
          fromMe: true,
          id: "[❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]",
        },
        message: {
          contactMessage: {
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:Sy\nitem1.TEL;waid=${
              m.sender.split("@")[0]
            }:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
          },
        },
        participant: "0@s.whatsapp.net",
      };
      if (!isOwner) return await reply("Your are Not The Owner");
      const ppUrl = await conn.profilePictureUrl(from, "image");
      await conn.sendMessage(
        from,
        {
          image: { url: ppUrl }, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
        },
        { quoted: mnu }
      );
    } catch (e) {
      console.error(e);
      await reply(`An error occurred: ${e.message}`);
    }
  }
);

cmd(
  {
    pattern: "chr",
    alias: ["chr"],
    react: "📕",
    use: ".channelreact *<link,emoji>*",
    desc: ".",
    category: "owner",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      l,
      body,
      isCmd,
      command,
      args,
      q,
      prefix,
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
      let [linkPart, emoji] = q.split(",");
      if (!linkPart || !emoji)
        return reply(
          "Please provide a link and an emoji, separated by a comma."
        );

      const channelId = linkPart.trim().split("/")[4];
      const messageId = linkPart.trim().split("/")[5];

      const res = await conn.newsletterMetadata("invite", channelId);

      await conn.newsletterReactMessage(res.id, messageId, emoji.trim());

      reply(`Done reacting once with ${emoji.trim()}`);
    } catch (e) {
      console.log(e);
      reply(e.toString());
    }
  }
);
