const { cmd, commands } = require("../Utils/command");
//====================kick=================================

cmd(
  {
    pattern: "kick",
    alias: [".."],
    desc: "Kicks replied/quoted user from group.",
    react: "➖",
    category: "group",
    filename: __filename,
    use: "<quote|reply|number>",
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
      config,
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
      if (!isGroup) return await reply(`only for groups`);
      if (!isBotAdmins) return await reply(`I can't do that. give group admin`);
      if (!groupAdmins) return await reply(`You are not a admin.`);

      const user = m.quoted.sender;
      if (!user) return await reply(`*Please give me a user to kick ❗*`);
      await conn.groupParticipantsUpdate(from, [user], "remove");
      reply(`${user} *has been kicked out of the group!*`);
    } catch (e) {
      reply(`*Done ✓✓*\n\n${config.BOTNAME || "❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤"}`);
      l(e);
    }
  }
);
//=====================add==================================

cmd(
  {
    pattern: "add",
    alias: ["invite"],
    desc: "Adds a user to the group.",
    react: "➕",
    category: "group",
    filename: __filename,
    use: "<number>",
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
      config,
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
      if (!isGroup) return await reply(`only for groups`);
      if (!isBotAdmins) return await reply(`I can't do that. give group admin`);
      if (!groupAdmins) return await reply(`You are not a admin.`);

      // Check if the number is provided (from q or args)
      if (!q || isNaN(q))
        return await reply("Please provide a valid phone number to add.");

      const userToAdd = `${q}@s.whatsapp.net`; // Format the phone number

      // Add the user to the group
      await conn.groupParticipantsUpdate(
        from,
        [userToAdd],
        "add" // replace this parameter with "remove", "demote" or "promote"
      );

      // Confirm the addition
      reply(`User ${q} has been added to the group.\n\n${config.BOTNAME || "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹"}`);
    } catch (e) {
      console.error("Error adding user:", e);
      reply(
        "An error occurred while adding the user. Please make sure the number is correct and they are not already in the group."
      );
    }
  }
);
//==========deletemsg=======


cmd(
  {
    pattern: "delete",
    react: "⛔",
    alias: [","],
    desc: "delete message",
    category: "group",
    use: ".del",
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
      config,
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
      const key = {
        remoteJid: m.chat,
        fromMe: false,
        id: m.quoted.id,
        participant: m.quoted.sender,
      };
      await conn.sendMessage(m.chat, { delete: key });
    } catch (e) {
      reply("*Error !!*");
      l(e);
    }
  }
);

//=========================kickall===========================

cmd(
  {
    pattern: "kickall",
    desc: "Kicks all non-admin members from the group.",
    react: "😎",
    category: "group",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { kee, from, isGroup, groupMetadata, groupAdmins, isBotAdmins, reply }
  ) => {
    try {
      // Check if the command is used in a group
      if (!isGroup) return await reply(`This command is only for groups.`);

      // Check if the bot has admin privileges
      if (!isBotAdmins)
        return await reply(`I need admin privileges to kick users.`);

      // Fetch all participants from the group
      const allParticipants = groupMetadata.participants;

      // Filter out the admins (including the bot)
      const nonAdminParticipants = allParticipants.filter(
        (member) => !groupAdmins.includes(member.id)
      );

      if (nonAdminParticipants.length === 0) {
        return await reply("There are no non-admin members to kick.");
      }

      // Start removing non-admin participants
      for (let participant of nonAdminParticipants) {
        await conn.groupParticipantsUpdate(m.chat, [participant.id], "remove");
      }

      // Send a confirmation message once done
      reply(
        `Successfully kicked all non-admin members from the group.\n\n${config.BOTNAME || "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹"}`
      );
    } catch (e) {
      console.error("Error kicking users:", e);
      reply(
        "An error occurred while trying to kick all members. Please try again."
      );
    }
  }
);

//==============================opentime========================

cmd(
  {
    pattern: "opentime",
    react: "🔖",
    desc: "To open group to a time",
    category: "group",
    use: ".opentime",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      prefix,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      config,
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
      if (!isGroup) return await reply(ONLGROUP);
      if (!isAdmins) return await reply(ADMIN);
      if (args[1] == "second") {
        var timer = args[0] * `1000`;
      } else if (args[1] == "minute") {
        var timer = args[0] * `60000`;
      } else if (args[1] == "hour") {
        var timer = args[0] * `3600000`;
      } else if (args[1] == "day") {
        var timer = args[0] * `86400000`;
      } else {
        return await reply(
          "*select:*\nsecond\nminute\nhour\n\n*example*\n10 second"
        );
      }
      reply(`Open time ${q} starting from now`);
      setTimeout(() => {
        var nomor = mek.participant;
        const open = `*Open time* the group was opened by admin\n now members can send messages\n\n${config.BOTNAME || "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹"}`;
        conn.groupSettingUpdate(from, "not_announcement");
        reply(open);
      }, timer);
      await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });
    } catch (e) {
      reply("*Error !!*");
      l(e);
    }
  }
);

//===================================closetime==============================

cmd(
  {
    pattern: "closetime",
    react: "🔖",
    desc: "To close group to a time",
    category: "group",
    use: ".closstime",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      prefix,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      config,
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
      if (!isGroup) return await reply(ONLGROUP);
      if (!isAdmins) return await reply(ADMIN);
      if (args[1] == "second") {
        var timer = args[0] * `1000`;
      } else if (args[1] == "minute") {
        var timer = args[0] * `60000`;
      } else if (args[1] == "hour") {
        var timer = args[0] * `3600000`;
      } else if (args[1] == "day") {
        var timer = args[0] * `86400000`;
      } else {
        return await reply(
          "*select:*\nsecond\nminute\nhour\n\n*Example*\n10 second"
        );
      }
      reply(`Close time ${q} starting from now`);
      setTimeout(() => {
        var nomor = m.participant;
        const close = `*Close time* group closed by admin\nnow only admin can send messages\n\n${config.BOTNAME || "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹"}`;
        conn.groupSettingUpdate(from, "announcement");
        reply(close);
      }, timer);
      await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });
    } catch (e) {
      reply("*Error !!*");
      l(e);
    }
  }
);

//================================tagall================================

cmd(
  {
    pattern: "tagall",
    react: "🔖",
    desc: "To tag all Participants",
    category: "group",
    use: ".hidetag <hi>",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      prefix,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      config,
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
      if (!isGroup) return await reply(ONLGROUP);
      if (!isBotAdmins) return await reply(botAdmin);
      if (!isAdmins) return await reply(ADMIN);
      let teks = ` *ＧＲＯＵＰ  ＮＯＴＩＦＹ*
                   
*𝐌𝐄𝐒𝐒𝐀𝐆𝐄 : ${q ? q : "blank"}*\n\n`;
      for (let mem of participants) {
        teks += `🔵 @${mem.id.split("@")[0]}\n`;
      }
      conn.sendMessage(m.chat, {
        text: teks,
        mentions: participants.map((a) => a.id),
      });
      await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });
    } catch (e) {
      reply("");
      l(e);
    }
  }
);

//==============================tagadmin======================================

cmd(
  {
    pattern: "tagadmin",
    desc: "Tags all the admins in the group.",
    react: "😇",
    category: "group",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { kee, from, isGroup, groupMetadata, groupAdmins, reply }
  ) => {
    try {
      // Check if the command is used in a group
      if (!isGroup) return await reply(`This command is only for groups.`);

      // Fetch all group admins
      const admins = groupAdmins;

      if (admins.length === 0) {
        return await reply("There are no admins in this group.");
      }

      // Create a message with all admin tags
      let adminTagMessage = "*Tagging all admins in the group:*\n\n";
      for (let admin of admins) {
        adminTagMessage += `@${admin.split("@")[0]}\n`; // Mention each admin by their number
      }

      // Send the message and tag the admins
      await conn.sendMessage(
        from,
        { text: adminTagMessage, mentions: admins },
        { quoted: kee }
      );
    } catch (e) {
      console.error("Error tagging admins:", e);
      reply(
        "An error occurred while trying to tag all admins. Please try again."
      );
    }
  }
);

//=====================mute=================================

cmd(
  {
    pattern: "mute",
    react: "🔖",
    desc: "Close a group (only admins can send messages).",
    category: "group",
    use: ".mute",
    filename: __filename,
  },
  async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
      if (!isGroup) return await reply("This command is only for groups.");
      if (!isBotAdmins)
        return await reply("I need to be an admin to mute the group.");
      if (!isAdmins)
        return await reply("Only group admins can mute the group.");

      // Change group setting to "announcement" mode (only admins can send messages)
      await conn.groupSettingUpdate(from, "announcement");
      reply(
        `✅ Group has been muted. Only admins can send messages.\n\n${config.BOTNAME || "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹"}`
      );

      // Send reaction
      await conn.sendMessage(from, { react: { text: `🔇`, key: mek.key } });
    } catch (e) {
      console.error(e);
      reply("🛑 An error occurred while muting the group.");
    }
  }
);

//========================================unmute====================================

cmd(
  {
    pattern: "unmute",
    react: "🔖",
    desc: "Open a group (everyone can send messages).",
    category: "group",
    use: ".unmute",
    filename: __filename,
  },
  async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
      if (!isGroup) return await reply("This command is only for groups.");
      if (!isBotAdmins)
        return await reply("I need to be an admin to unmute the group.");
      if (!isAdmins)
        return await reply("Only group admins can unmute the group.");

      // Change group setting to "not_announcement" mode (everyone can send messages)
      await conn.groupSettingUpdate(from, "not_announcement");
      reply(
        `✅ Group has been unmuted. Everyone can send messages.\n\n${config.BOTNAME || "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹"}`
      );

      // Send reaction
      await conn.sendMessage(from, { react: { text: `🔓`, key: mek.key } });
    } catch (e) {
      console.error(e);
      reply("🛑 An error occurred while unmuting the group.");
    }
  }
);

//=================================promote======================================

cmd(
  {
    pattern: "promote",
    desc: "Promote a user to group admin.",
    react: "😚",
    category: "group",
    use: "<quote|reply|number>",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { kee, from, quoted, q, isGroup, isBotAdmins, isAdmins, reply }
  ) => {
    try {
      if (!isGroup) return await reply("This command is only for groups.");
      if (!isBotAdmins)
        return await reply("I need to be an admin to unmute the group.");
      if (!isAdmins)
        return await reply("Only group admins can unmute the group.");

      // Get the target user (quoted or number)
      let user;
      if (quoted) {
        user = quoted.sender; // Get user from quoted message
      } else if (q) {
        user = `${q.replace(/\D/g, "")}@s.whatsapp.net`; // Get user from the provided number
      } else {
        return await reply(
          "Please reply to a user or provide their number to promote."
        );
      }

      // Promote the user to admin
      await conn.groupParticipantsUpdate(from, [user], "promote");
      reply(
        `✅ Successfully promoted ${user} to admin.\n\n${config.BOTNAME || "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹"}`
      );
    } catch (e) {
      console.error(e);
      reply("🛑 An error occurred while promoting the user.");
    }
  }
);

//=================================demote========================================

cmd(
  {
    pattern: "demote",
    desc: "Demote a user from group admin.",
    react: "😉",
    category: "group",
    use: "<quote|reply|number>",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { kee, from, quoted, q, isGroup, isBotAdmins, isAdmins, reply }
  ) => {
    try {
      if (!isGroup) return await reply("This command is only for groups.");
      if (!isBotAdmins)
        return await reply("I need to be an admin to unmute the group.");
      if (!isAdmins)
        return await reply("Only group admins can unmute the group.");
      // Get the target user (quoted or number)
      let user;
      if (quoted) {
        user = quoted.sender; // Get user from quoted message
      } else if (q) {
        user = `${q.replace(/\D/g, "")}@s.whatsapp.net`; // Get user from the provided number
      } else {
        return await reply(
          "Please reply to a user or provide their number to demote."
        );
      }

      // Demote the user from admin
      await conn.groupParticipantsUpdate(from, [user], "demote");
      reply(
        `✅ Successfully demoted ${user} from admin.\n\n${config.BOTNAME || "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹"}`
      );
    } catch (e) {
      console.error(e);
      reply("🛑 An error occurred while demoting the user.");
    }
  }
);

//======================setname====================

cmd(
  {
    pattern: "setname",
    desc: "Change the group's name.",
    react: "✅",
    category: "group",
    use: "<new group name>",
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
      if (!isGroup) return await reply("This command is only for groups.");
      if (!isBotAdmins)
        return await reply("I need to be an admin to unmute the group.");
      if (!isAdmins)
        return await reply("Only group admins can unmute the group.");
      // Change the group name
      await conn.groupUpdateSubject(from, q);
      reply(`✅ Group name has been updated to: *${q}*\n\n${config.BOTNAME || "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹"}`);
    } catch (e) {
      console.error(e);
      reply("🛑 An error occurred while changing the group name.");
    }
  }
);

//==========================setdesc========================

cmd(
  {
    pattern: "setdesc",
    desc: "Change the group's description.",
    react: "✅",
    category: "group",
    use: "<new group description>",
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
      if (!isGroup) return await reply("This command is only for groups.");
      if (!isBotAdmins)
        return await reply("I need to be an admin to unmute the group.");
      if (!isAdmins)
        return await reply("Only group admins can unmute the group.");

      // Check if the new description is provided
      if (!q)
        return await reply("Please provide a new description for the group.");

      // Change the group description
      await conn.groupUpdateDescription(from, q);
      reply(
        `✅ Group description has been updated to: *${q}*\n\n${config.BOTNAME || "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹"}`
      );
    } catch (e) {
      console.error(e);
      reply("🛑 An error occurred while changing the group description.");
    }
  }
);

//=================invite===============

cmd(
  {
    pattern: "invite",
    desc: "Get the invite link for the current group.",
    react: "🤭",
    category: "group",
    use: ".invite",
    filename: __filename,
  },
  async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
      if (!isGroup) return await reply("This command is only for groups.");
      if (!isBotAdmins)
        return await reply("I need to be an admin to unmute the group.");
      if (!isAdmins)
        return await reply("Only group admins can unmute the group.");

      // Generate the invite link for the group
      const inviteLink = await conn.groupInviteCode(from);

      // Send the invite link as a message
      reply(
        `Here is the invite link for the group: http://chat.whatsapp.com/${inviteLink}\n\n${config.BOTNAME || "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹"}`
      );
    } catch (e) {
      console.error(e);
      reply("🛑 An error occurred while trying to get the invite link.");
    }
  }
);

//===========================join=====================

cmd(
  {
    pattern: "join",
    desc: "Join a group using an invite link.",
    react: "🙏",
    category: "group",
    use: "<invite link>",
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isOwner, reply }) => {
    try {
      if (!isOwner) return await reply("You are not my owner.");
      // Check if an invite link is provided
      if (!q || !q.startsWith("https://"))
        return await reply("Please provide a valid invite link.");

      // Extract the invite link
      const inviteLink = q;

      // Use the invite link to make the bot join the group
      // If your library has a different method for joining, replace the line below with the correct one
      const code = inviteLink.split("/").pop(); // Extracting the invite code from the link
      await conn.groupAcceptInvite(code); // Use this method to join the group using the code

      reply(
        `✅ Successfully joined the group using the invite link.\n\n${config.BOTNAME || "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹"}`
      );
    } catch (e) {
      console.error(e);
      reply(
        "🛑 An error occurred while trying to join the group. Please check the invite link or try again later."
      );
    }
  }
);

//=========================leave=================

cmd(
  {
    pattern: "leave",
    desc: "Make the bot leave the current group.",
    react: "👋",
    category: "group",
    use: ".leave",
    filename: __filename,
  },
  async (conn, mek, m, { from, isGroup, isBotAdmins, reply }) => {
    try {
      if (!isGroup) return await reply("This command is only for groups.");
      if (!isBotAdmins)
        return await reply("I need to be an admin to unmute the group.");
      if (!isAdmins)
        return await reply("Only group admins can unmute the group.");
      // Make the bot leave the group
      await conn.groupLeave(from);
      reply(`✅ I have left the group.....Bye🥺👋\n\n${config.BOTNAME || "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ❤️‍🩹"}`);
    } catch (e) {
      console.error(e);
      reply("🛑 An error occurred while trying to leave the group.");
    }
  }
);
