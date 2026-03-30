const { cmd, commands } = require("../Utils/command");
const { sleep } = require("../Utils/functions");

// 1. Shutdown Bot

cmd(
  {
    pattern: "shutdown",
    desc: "Shutdown the bot.",
    category: "owner",
    react: "🛑",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, isOwner, reply }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    return await reply("🛑 Shutting down...").then(() => process.exit());
  }
);

// 2. Broadcast Message to All Groups

cmd(
  {
    pattern: "broadcast",
    desc: "Broadcast a message to all groups.",
    category: "owner",
    react: "📢",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, isOwner, args, reply }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    if (args.length === 0)
      return await reply("📢 Please provide a message to broadcast.");

    const message = args.join(" ");
    const groups = Object.keys(await conn.groupFetchAllParticipating());

    for (const groupId of groups) {
      await conn.sendMessage(groupId, { text: message }, { quoted: kee });
    }

    return await reply("📢 Message broadcasted to all groups.");
  }
);

// 3. Set Profile Picture

// 4. Block User

cmd(
  {
    pattern: "block",
    desc: "Block a user.",
    category: "owner",
    react: "🚫",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, isOwner, quoted, reply }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    if (!quoted)
      return await reply("❌ Please reply to the user you want to block.");

    const user = quoted.sender;
    try {
      await conn.updateBlockStatus(user, "block");
      reply(`🚫 User ${user} blocked successfully.`);
    } catch (error) {
      reply(`❌ Error blocking user: ${error.message}`);
    }
  }
);

// 5. Unblock User

cmd(
  {
    pattern: "unblock",
    desc: "Unblock a user.",
    category: "owner",
    react: "✅",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, isOwner, quoted, reply }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    if (!quoted)
      return await reply("❌ Please reply to the user you want to unblock.");

    const user = quoted.sender;
    try {
      await conn.updateBlockStatus(user, "unblock");
      reply(`✅ User ${user} unblocked successfully.`);
    } catch (error) {
      reply(`❌ Error unblocking user: ${error.message}`);
    }
  }
);

// 6. Clear All Chats

cmd(
  {
    pattern: "clearchats",
    desc: "Clear all chats from the bot.",
    category: "owner",
    react: "🧹",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, isOwner, reply }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");
    try {
      const chats = conn.chats.all();
      for (const chat of chats) {
        await conn.modifyChat(chat.jid, "delete");
      }
      reply("🧹 All chats cleared successfully!");
    } catch (error) {
      reply(`❌ Error clearing chats: ${error.message}`);
    }
  }
);

// 7. Get Bot JID

cmd(
  {
    pattern: "jid",
    desc: "Get the chat's JID.",
    category: "owner",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, isOwner, reply }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");

    // The 'from' variable contains the JID of the chat (group or individual)
    reply(`🤖 *Chat JID:* ${from}`);
  }
);

// 8. Group JIDs List

cmd(
  {
    pattern: "gjid",
    desc: "Get the list of JIDs for all groups the bot is part of.",
    category: "owner",
    react: "📝",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, isOwner, reply }) => {
    if (!isOwner) return await reply("❌ You are not the owner!");

    const groups = await conn.groupFetchAllParticipating();
    const groupJids = Object.keys(groups).join("\n");
    reply(`📝 *Group JIDs:*\n\n${groupJids}`);
  }
);

//9. restart

cmd(
  {
    pattern: "restart",
    desc: "To restart the bot",
    react: "💢",
    category: "owner",
    filename: __filename,
  },
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
      if (!isOwner) return;
      const { exec } = require("child_process");
      await reply(">[  R  E  S  T  A  R  T  I  N  G  ]\n> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]...");
      await sleep(1500);
      exec("pm2 restart all");
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);


cmd(
  {
    pattern: "update",
    desc: "Update and restart the bot",
    react: "🔄",
    category: "owner",
    filename: __filename,
  },
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
      // Check if the user is the owner
      if (!isOwner) {
        return reply(
          "⚠️ *Sorry, only the owner can update and restart the bot!*"
        );
      }
      const { exec } = require("child_process");
      const fs = require("fs");
      const path = require("path");

      const SRC_DIR = path.join(__dirname, "../../src");

      // Start the update process
      reply(
        "🔄 *Deleting src folder and restarting the bot...* Please wait a moment. 🕒"
      );

      // Add a slight delay to give feedback before deleting and restarting
      await sleep(1500);

      try {
        // Check if the 'src' directory exists and delete it
        if (fs.existsSync(SRC_DIR)) {
          fs.rmSync(SRC_DIR, { recursive: true, force: true });
          console.log("✅ 'src' folder deleted successfully.");
        } else {
          console.log("ℹ️ 'src' folder does not exist, skipping deletion.");
        }
      } catch (err) {
        console.error("❌ Error while deleting 'src' folder:", err.message);
        reply(`❌ *Error deleting 'src' folder:* \n\`\`\`${err.message}\`\`\``);
        return;
      }

      // Execute the command to update the bot using PM2
      exec("pm2 restart all", (error, stdout, stderr) => {
        if (error) {
          // If there's an error, log it and send it to the user
          console.log(error);
          reply(
            `❌ *Error while restarting the bot:* \n\`\`\`${error.message}\`\`\``
          );
          return;
        }
        // If everything goes smoothly, send a success message
        reply("✅ *The bot has been successfully updated and restarted.*");
        console.log(stdout);
        console.log(stderr);
      });
    } catch (e) {
      // Catch any unexpected errors
      console.log(e);
      reply(`❌ *An unexpected error occurred:* \n\`\`\`${e.message}\`\`\``);
    }
  }
);



cmd(
  {
    pattern: "setfullpp",
    desc: "To set a full Profile Pic",
    react: "💞",
    category: "owner",
    filename: __filename,
  },
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
      if (!isMe) {
        return await reply("You are not the bot's owner or moderator! 🚫");
      }
  
      let imageBuffer = await quoted.download();
      if (!imageBuffer) {
        return reply('Please provide an image to set as your profile picture 📷');
      }
  
      const Jimp = require('jimp');
      var { S_WHATSAPP_NET } = require('anju-xpro-baileys')
      const image = await Jimp.read(imageBuffer);
      const width = image.getWidth();
      const height = image.getHeight();
  
      // Crop and resize the image to fit the required dimensions for the profile picture
      const croppedImage = image.crop(0, 0, width, height);
      const scaledImage = await croppedImage
        .scaleToFit(720, 720)
        .getBufferAsync(Jimp.MIME_JPEG);
  
      // Prepare the request to set the profile picture
      const profilePictureRequest = {
        to: S_WHATSAPP_NET,
        type: 'set',
        xmlns: 'w:profile:picture',
      };
      const pictureContent = {
        tag: 'picture',
        attrs: { type: 'image' },
        content: scaledImage,
      };
      const iqRequest = {
        tag: 'iq',
        attrs: profilePictureRequest,
        content: [pictureContent],
      };
  
      // Send the request to set the profile picture
      await conn.query(iqRequest);
  
      // Confirm to the owner that the profile picture has been updated
      reply('Your profile picture has been updated ✅❤.');
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);


cmd(
  {
    pattern: "vv",
    desc: "To download view once",
    react: "🔆",
    category: "owner",
    filename: __filename,
  },
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
      // Ensure the quoted message exists
      let quotedMessage = m.quoted ? m.quoted : m; // If quoted exists, use that; otherwise, use the original message.
      let mime = quotedMessage.msg?.mimetype || ""; // Get MIME type from the quoted message
      
      if (!mime) {
        throw "🌻 Please reply to an image, video, or audio.";
      }

      // Download the quoted media
      let media = await quotedMessage.download();
      if (!media) throw "Failed to download the media. Please try again.";

      // Handle different media types (image, video, audio)
      const fs = require("fs");
      const path = require("path");
      const os = require("os");

      let mediaResponse = {};
      if (mime.startsWith("image/")) {
        let tempFilePath = path.join(os.tmpdir(), "Rashmika-Ofc.png"); // Save as image
        await fs.writeFileSync(tempFilePath, media);
        mediaResponse = { image: { url: tempFilePath } };
      } else if (mime.startsWith("video/")) {
        let tempFilePath = path.join(os.tmpdir(), "Rashmika-Ofc.mp4"); // Save as video
        await fs.writeFileSync(tempFilePath, media);
        mediaResponse = { video: { url: tempFilePath } };
      } else if (mime.startsWith("audio/")) {
        let tempFilePath = path.join(os.tmpdir(), "Rashmika-Ofc.mp3"); // Save as audio
        await fs.writeFileSync(tempFilePath, media);
        mediaResponse = { audio: { url: tempFilePath } };
      } else {
        return reply('```This is not a supported Media Message!```');
      }

      // Send the media back to the user
      return conn.sendMessage(from, mediaResponse);
      
    } catch (e) {
      console.log(e);
      reply(`Error: ${e.message || e}`);
    }
  }
);

