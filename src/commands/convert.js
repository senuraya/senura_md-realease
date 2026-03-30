const { cmd, commands } = require("../Utils/command");
const fs = require("fs");
const path = require("path");
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  sleep,
  fetchJson,
} = require("../Utils/functions");
const googleTTS = require("google-tts-api");
const {
  Sticker,
  createSticker,
  StickerTypes,
} = require("wa-sticker-formatter");
const { tmpdir } = require("os");
const Crypto = require("crypto");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

function toPTT(buffer, ext) {
  return ffmpeg(
    buffer,
    [
      "-vn",
      "-c:a",
      "libopus",
      "-b:a",
      "128k",
      "-vbr",
      "on",
      "-compression_level",
      "10",
    ],
    ext,
    "opus"
  );
}

cmd(
  {
    pattern: "tts",
    desc: "text to speech.",
    category: "covert",
    use: ".tts hellow",
    filename: __filename,
    use: "<Hii,this is Secktor>",
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
    if (!q) return m.reply("Please give me Sentence to change into audio.");
    let texttts = q;
    const ttsurl = googleTTS.getAudioUrl(texttts, {
      lang: "en",
      slow: false,
      host: "https://translate.google.com",
    });
    return conn.sendMessage(
      m.chat,
      {
        audio: {
          url: ttsurl,
        },
        mimetype: "audio/mpeg",
        fileName: `ttsCitelVoid.m4a`,
      },
      {
        quoted: mek,
      }
    );
  }
);

cmd(
  {
    pattern: "toptt",
    react: "🔊",
    alias: ["toaudio", "tomp3"],
    desc: "convert to audio",
    category: "convert",
    use: ".toptt <Reply to video>",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
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
      let isquotedvid = m.quoted
        ? m.quoted.type === "videoMessage"
        : m
        ? m.type === "videoMessage"
        : false;
      if (!isquotedvid) return await reply();
      let media = m.quoted ? await m.quoted.download() : await m.download();
      let auddio = await toPTT(media, "mp4");
      let senda = await conn.sendMessage(
        m.chat,
        { audio: auddio.options, mimetype: "audio/mpeg" },
        { quoted: m }
      );
      await conn.sendMessage(from, { react: { text: "🎼", key: senda.key } });
    } catch (e) {
      reply("*Error !!*");
      l(e);
    }
  }
);

cmd(
  {
    pattern: "sticker",
    react: "🔮",
    alias: ["s", "stic"],
    desc: "Convert to sticker",
    category: "convert",
    use: ".sticker <Reply to image>",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
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
      const isQuotedViewOnce = m.quoted
        ? m.quoted.type === "viewOnceMessage"
        : false;
      const isQuotedImage = m.quoted
        ? m.quoted.type === "imageMessage" ||
          (isQuotedViewOnce ? m.quoted.msg.type === "imageMessage" : false)
        : false;
      const isQuotedVideo = m.quoted
        ? m.quoted.type === "videoMessage" ||
          (isQuotedViewOnce ? m.quoted.msg.type === "videoMessage" : false)
        : false;
      const isQuotedSticker = m.quoted
        ? m.quoted.type === "stickerMessage"
        : false;
      if (m.type === "imageMessage" || isQuotedImage) {
        var nameJpg = getRandom("");
        isQuotedImage
          ? await m.quoted.download(nameJpg)
          : await m.download(nameJpg);
        let sticker = new Sticker(nameJpg + ".jpg", {
          pack: pushname, // The pack name
          author: "", // The author name
          type: q.includes("--crop" || "-c")
            ? StickerTypes.CROPPED
            : StickerTypes.FULL,
          categories: ["🤩", "🎉"], // The sticker category
          id: "12345", // The sticker id
          quality: 75, // The quality of the output file
          background: "transparent", // The sticker background color (only for full stickers)
        });
        const buffer = await sticker.toBuffer();
        return conn.sendMessage(from, { sticker: buffer }, { quoted: mek });
      } else if (isQuotedSticker) {
        var nameWebp = getRandom("");
        await m.quoted.download(nameWebp);
        let sticker = new Sticker(nameWebp + ".webp", {
          pack: pushname, // The pack name
          author: "", // The author name
          type: q.includes("--crop" || "-c")
            ? StickerTypes.CROPPED
            : StickerTypes.FULL,
          categories: ["🤩", "🎉"], // The sticker category
          id: "12345", // The sticker id
          quality: 75, // The quality of the output file
          background: "transparent", // The sticker background color (only for full stickers)
        });
        const buffer = await sticker.toBuffer();
        return conn.sendMessage(from, { sticker: buffer }, { quoted: mek });
      } else return await reply(imgmsg);
    } catch (e) {
      reply("*Error !!*");
      l(e);
    }
  }
);

cmd(
  {
    pattern: "emojimix",
    desc: "Create a mix of two emojis as a sticker.",
    react: "🤩",
    category: "convert",
    use: ".emojimix 😀;🥰",
    filename: __filename,
  },
  async (conn, mek, m, { args, reply, from, senderNumber, pushname }) => {
    if (!args[0] || args.length !== 1) {
      reply("Incorrect usage. Example: .emojimix 😀;🥰");
      return;
    }

    // Split the input into two emojis using ';' as a separator
    const emojis = args.join(" ").split(";");

    if (emojis.length !== 2) {
      reply("Please specify two emojis using a ';' as a separator.");
      return;
    }

    const emoji1 = emojis[0].trim();
    const emoji2 = emojis[1].trim();

    try {
      const response = await fetchJson(
        `https://levanter.onrender.com/emix?q=${emoji1}${emoji2}`
      );

      if (response.status === true) {
        // If the request is successful, create and send the sticker
        let sticker = new Sticker(response.result, {
          pack: pushname, // The pack name
          author: "", // The author name
          type: StickerTypes.CROPPED,
          categories: ["🤩", "🎉"], // The sticker category
          id: "12345", // The sticker id
          quality: 75, // The quality of the output file
          background: "transparent", // The sticker background color (only for full stickers)
        });
        const buffer = await sticker.toBuffer();
        return conn.sendMessage(from, { sticker: buffer }, { quoted: mek });
      } else {
        reply("Unable to create emoji mix.");
      }
    } catch (error) {
      reply("An error occurred while creating the emoji mix: " + error.message);
    }
  }
);

cmd(
  {
    pattern: "trt",
    desc: "Translate any text.",
    react: "💫",
    category: "convert",
    use: ".trt i love you;SI",
    filename: __filename,
  },
  async (conn, mek, m, { args, reply, from, q, senderNumber, pushname }) => {
    if (!q) {
      reply("Incorrect usage. Example: .trt hellow;si");
      return;
    }

    // Split the input into two emojis using ';' as a separator
    const word = q.split(";")[0];
    const lang = q.split(";")[1];

    try {
      const response = await fetchJson(
        `https://api.siputzx.my.id/api/tools/translate?text=${encodeURIComponent(
          word
        )}&source=auto&target=${lang}`
      );

      if (response.success === true) {
        await conn.sendMessage(
          from,
          {
            text: response.translatedText,
          },
          { quoted: mek }
        );
      } else {
        reply("Unable to translate.");
      }
    } catch (error) {
      reply("An error occurred while creating the emoji mix: " + error.message);
    }
  }
);
