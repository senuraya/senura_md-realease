const { cmd, commands } = require("../Utils/command");
const oce = "`";
const {
  BufferJSON,
  Browsers,
  WA_DEFAULT_EPHEMERAL,
  makeWASocket,
  generateWAMessageFromContent,
  proto,
  getBinaryNodeChildren,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  downloadContentFromMessage,
} = require("anju-xpro-baileys");
const yts = require("yt-search");
//===============================================
const axios = require("axios");
const castem = require("../../customization");
//===============================================
// --- Scraper Logic ---

const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
    "Referer": "https://frame.y2meta-uk.com/",
    "Origin": "https://frame.y2meta-uk.com",
    "Accept": "*/*",
};

/**
 * 1. Scrapes the link
 * 2. Downloads the file into a Buffer (Memory)
 * 3. Returns the Buffer and filename
 */
async function getYoutubeAudioBuffer(youtubeUrl,audio,video,format) {
    try {
        console.log('Fetching key...');
        const keyResp = await fetch("https://cnv.cx/v2/sanity/key", { headers: HEADERS });
        if (!keyResp.ok) throw new Error("Key fetch failed");
        const { key } = await keyResp.json();

        console.log('Getting download link...');
        const payload = new URLSearchParams({
            link: youtubeUrl,
            format: format,
            audioBitrate: audio,
            videoQuality: video,
            filenameStyle: "pretty",
            vCodec: "h264"
        });

        const convertResp = await fetch("https://cnv.cx/v2/converter", {
            method: "POST",
            headers: {
                ...HEADERS,
                "Content-Type": "application/x-www-form-urlencoded",
                "key": key
            },
            body: payload
        });

        if (!convertResp.ok) throw new Error("Conversion failed");
        const json = await convertResp.json();
        
        if (!json.url) throw new Error("No download URL found in response");

        console.log('Downloading to Buffer...');
        
        // VITAL: Download using the same headers
        const fileResp = await fetch(json.url, { headers: HEADERS });
        if (!fileResp.ok) throw new Error("File download failed");

        // Convert the response to a Node.js Buffer
        const arrayBuffer = await fileResp.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return {
            buffer: buffer,
            filename: json.filename,
            mimetype: 'audio/mpeg' // Standard for MP3
        };

    } catch (error) {
        console.error("Scraper Error:", error);
        return null;
    }
}
//===============================================
// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
  const videoId = extractYouTubeId(q);
  if (videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
  return q;
}

// .song command
cmd(
  {
    pattern: "song",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    use: ".yts numba ha",
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
      if (!q) return reply("Please provide a search query.");

      const search = await yts(q);
      const videos = search.videos.slice(0, 10); // Get top 10 results

      if (!videos.length) return reply("No Songs found.");

      const buttons = videos.map((video, index) => ({
        buttonId: `${prefix}songdl ${video.url}`,
        buttonText: { displayText: `*${index + 1}. ${video.title}*` },
        type: 1,
      }));
let IMG;
if(config.isPremium === true){
IMG = castem.IMG
} else {
IMG = "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png"
}
      const buttonMessage = {
        image: { url: IMG },
        caption: `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> ${oce}*HELLO THERE ${pushname}*${oce}`,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };

      if (config.BTN_MSG === false) {
        return await conn.nonbuttonMessage(from, buttonMessage);
      } else {
        return await conn.newlist(from, buttonMessage);
      }
    } catch (e) {
      console.log(e);
      reply(`Error: ${e.message || e}`);
    }
  }
);

cmd(
  {
    pattern: "songdl",
    desc: "To download songs.",
    use: ".song lelena",
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
      config,
      apikey,
      baseurl,
      body,
      args,
      q,
      isGroup,
      pushname,
      reply,
    }
  ) => {
    try {
      const prefix = config.PREFIX;
      if (!q) return reply("Please give me a URL or title.");
      q = convertYouTubeLink(q);
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;
      let desc
if(config.isPremium === true){
  desc = `
${castem.SONG(data,pushname,oce)}
`;
}else{
  desc = `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> ==========================
> ${oce}[  S  O  N  G    D  L  ]${oce}
> >>>>>>>>>>>>>>>>>>>>>>>>>>
> 🎶 *Title:* ${data.title}
> ⏱️ *Duration:* ${data.timestamp}
> 👁️ *Views:* ${data.views}
> 📅 *Uploaded On:* ${data.ago}
> 🔗 *Link:* ${data.url}
> >>>>>>>>>>>>>>>>>>>>>>>>>>
> =========================`
}


      const buttons = [
        {
          buttonId: prefix + `yt1s ${url} & 1`,
          buttonText: { displayText: "*Audio File*" },
          type: 1,
        },
        {
          buttonId: prefix + `yt1s ${url} & 2`,
          buttonText: { displayText: "*Document File*" },
          type: 1,
        },
        {
          buttonId: prefix + `yt1s ${url} & 3`,
          buttonText: { displayText: "*Voice Note*" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: { url: data.thumbnail },
        caption: desc,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };
      if (config.BTN_MSG === false) {
        return await conn.nonbuttonMessage(from, buttonMessage);
      } else {
        return await conn.newButton(from, buttonMessage);
      }
    } catch (e) {
      console.error(e);
      reply(`${e}`);
    }
  }
);


cmd(
  {
    pattern: "yt1s",
    desc: "To download songs.",
    dontAddCommandList: true,
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
      config,
      apikey,
      baseurl,
      getThumbnailBuffer,
      body,
      args,
      q,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("Please provide a search query.");

      const [Download, choice] = q.split(" & ");

      if (!Download || !choice) {
        return reply("Invalid format. Use: *yt1s <search term> & <choice>*");
      }

      const search = await yts(Download);
      const data = search.videos[0];

      if (!data) return reply("No video found.");

      const url = data.url;
      m.react("⬇️"); // Start the download

      const down = await getYoutubeAudioBuffer(url,"128","480","mp3");
      const downloadUrl = down.buffer;
      const thumbnailBuffer = await getThumbnailBuffer(data.thumbnail);
let info;
      if(config.isPremium === true){
      info = `
${castem.YTMP3(data)}
`;
      }else{
        info = `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> ==========================
> ➥ *Title:* ${data.title} 
> ➥ *Duration:* ${data.timestamp} 
> ➥ *Uploaded On:* ${data.ago} 
> ➥ *Link:* ${data.url}
> ==========================
        `
      }

      // React to the upload starting (⬆️)
      m.react("⬆️");

      if (choice === "1") {
        // Handle option 1 (Audio File)
        await conn.sendMessage(
          from,
          {
            audio: downloadUrl,
            mimetype: "audio/mpeg",
            fileName: down.filename
          },
          { quoted: kee }
        );
      } else if (choice === "2") {
        // Handle option 2 (Document File)
        await conn.sendMessage(
          from,
          {
            document: downloadUrl,
            mimetype: "audio/mp3",
            fileName: `${data.title}.mp3`,
            caption: info,
            jpegThumbnail: thumbnailBuffer, // Ensure this is properly formatted
          },
          { quoted: kee }
        );
      } else if (choice === "3") {
        // Handle option 2 (Document File)
        await conn.sendMessage(
          from,
          {
            audio: downloadUrl,
            mimetype: "audio/mpeg",
            fileName: down.filename,
            ptt : true
          },
          { quoted: kee }
        );
      } else {
        return reply(
          "Invalid choice. Please choose '1' for audio or '2' for document."
        );
      }

      // React to the successful completion of the task (✅)
      m.react("✅");
    } catch (e) {
      console.log(e);
      reply(`Error: ${e.message || e}`);
    }
  }
);


cmd(
  {
    pattern: "yts",
    desc: "To search for videos on YouTube.",
    react: "🎥",
    category: "search",
    use: ".yts numba ha",
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
      let prefix = config.PREFIX;
      if (!q) return reply("Please provide a search query.");

      const search = await yts(q);
      const videos = search.videos.slice(0, 10); // Get top 10 results

      if (!videos.length) return reply("No videos found.");

      const buttons = videos.map((video, index) => ({
        buttonId: `${prefix}yts1 ${video.url}`,
        buttonText: { displayText: `${index + 1}. ${video.title}` },
        type: 1,
      }));
let IMG;
if(config.isPremium === true){
IMG = castem.IMG
} else {
IMG = "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png"
}
      const buttonMessage = {
        image: { url: IMG },
        caption: `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> [  Y  T    S  E  A  R  C  H  ]`,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };

      if (config.BTN_MSG === "1") {
        return await conn.buttonMessage2(from, buttonMessage);
      } else {
        return await conn.newlist(from, buttonMessage);
      }
    } catch (e) {
      console.log(e);
      reply(`Error: ${e.message || e}`);
    }
  }
);


cmd(
  {
    pattern: "yts1",
    desc: "To download videos.",
    react: "📂",
    use: ".video alone part 2",
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
      config,
      args,
      q,
      isGroup,
      apikey,
      baseurl,
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
      let prefix = config.PREFIX;
      if (!q) return reply("Please give me a URL or title.");

      q = convertYouTubeLink(q);
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;
      let desc;
      if(config.isPremium === true){
   desc = `
${castem.VIDEO(data,pushname)}
`;
      }else{
          desc = `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> ==========================
> ${oce}[  Y O U T U B E    D  L  ]${oce}
> >>>>>>>>>>>>>>>>>>>>>>>>>>
> 🎶 *Title:* ${data.title}
> ⏱️ *Duration:* ${data.timestamp}
> 👁️ *Views:* ${data.views}
> 📅 *Uploaded On:* ${data.ago}
> 🔗 *Link:* ${data.url}
> >>>>>>>>>>>>>>>>>>>>>>>>>>
> =========================`
      }
      const buttons = [
        {
          buttonId: prefix + `songdl ${url}`,
          buttonText: { displayText: "*Song* 🎶" },
          type: 1,
        },
        {
          buttonId: prefix + `video ${url}`,
          buttonText: { displayText: "*Video* 🎥" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: { url: data.thumbnail },
        caption: desc,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };
      if (config.BTN_MSG === false) {
        return await conn.nonbuttonMessage(from, buttonMessage);
      } else {
        return await conn.newButton(from, buttonMessage);
      }
    } catch (e) {
      console.error(e);
      reply(`${e}`);
    }
  }
);


cmd(
  {
    pattern: "video",
    desc: "To download videos.",
    react: "🎥",
    category: "download",
    use: ".video alone part 2",
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
      config,
      q,
      isGroup,
      apikey,
      baseurl,
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
      let prefix = config.PREFIX;
      if (!q) return reply("Please give me a URL or title.");

      q = convertYouTubeLink(q);
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;
      let desc;
      if(config.isPremium === true){
        desc = `
${castem.VIDEO(data,pushame,oce)}
     `;
           }else{
               desc = `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> ==========================
> ${oce}[  V  I  D  E  O    D  L  ]${oce}
> >>>>>>>>>>>>>>>>>>>>>>>>>>
> 🎶 *Title:* ${data.title}
> ⏱️ *Duration:* ${data.timestamp}
> 👁️ *Views:* ${data.views}
> 📅 *Uploaded On:* ${data.ago}
> 🔗 *Link:* ${data.url}
> >>>>>>>>>>>>>>>>>>>>>>>>>>
> =========================`
           }
      const buttons = [
        {
          buttonId: prefix + `yt2s ${url} & 144`,
          buttonText: { displayText: "*Video File* 144p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt2s ${url} & 360`,
          buttonText: { displayText: "*Video File* 360p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt2s ${url} & 480`,
          buttonText: { displayText: "*Video File* 480p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt2s ${url} & 720`,
          buttonText: { displayText: "*Video File* 720p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt2s ${url} & 1080`,
          buttonText: { displayText: "*Video File* 1080p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt3s ${url} & 144`,
          buttonText: { displayText: "*Document File* 144p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt3s ${url} & 360`,
          buttonText: { displayText: "*Document File* 360p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt3s ${url} & 480`,
          buttonText: { displayText: "*Document File* 480p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt3s ${url} & 720`,
          buttonText: { displayText: "*Document File* 720p" },
          type: 1,
        },
        {
          buttonId: prefix + `yt3s ${url} & 1080`,
          buttonText: { displayText: "*Document File* 1080p" },
          type: 1,
        },
      ];

      const buttonMessage = {
        image: { url: data.thumbnail },
        caption: desc,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };

      if (config.BTN_MSG === false) {
        return await conn.nonbuttonMessage(from, buttonMessage);
      } else {
        return await conn.newlist(from, buttonMessage);
      }
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);

cmd(
  {
    pattern: "yt2s",
    desc: "To download songs.",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { kee, from, quoted, apikey,config, baseurl, body, args, q, reply }
  ) => {
    try {
      if (!q) return reply("Please provide a YouTube link or query.");

      const Download = q.split(" & ")[0];
      const quality = q.split(" & ")[1] || "360p"; // Default to 360p
      const search = await yts(Download);
      const data = search.videos[0];
      const url = data.url;
      // Fetch download URL
      m.react("⬇️");
      const down = await getYoutubeAudioBuffer(url,"128",quality,"mp4");
      const downloadUrl = down.buffer;
      let info;
      if(config.isPremium === true){
      info = `
${castem.YTMP4(data)}
`;
      }else{
                info = `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> ==========================
> ➥ *Title:* ${data.title} 
> ➥ *Duration:* ${data.timestamp} 
> ➥ *Uploaded On:* ${data.ago} 
> ➥ *Link:* ${data.url}
> ==========================
        `
      }

      // React to upload starting
      m.react("⬆️");

      await conn.sendMessage(from, {
        video: downloadUrl,
        mimetype: "video/mp4",
        caption: info,
        fileName: "video.mp4",
      });

      // React to completion
      m.react("✅");
    } catch (e) {
      console.log(e);
      reply("Failed to download or send video.");
    }
  }
);

cmd(
  {
    pattern: "yt3s",
    desc: "To download songs.",
    dontAddCommandList: true,
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
      config,
      apikey,
      baseurl,
      getThumbnailBuffer,
      body,
      args,
      q,
      reply,
    }
  ) => {
    if (!q) return reply("Please provide a YouTube link or query.");

    const Download = q.split(" & ")[0];
    const quality = q.split(" & ")[1] || "360p"; // Default to 360p
    const search = await yts(Download);
    const data = search.videos[0];
    const url = data.url;
    const thumbnailBuffer = await getThumbnailBuffer(data.thumbnail);
    m.react("⬇️");

    try {
      // Fetch download URL
      const down = await getYoutubeAudioBuffer(url,"128",quality,"mp4");
      const downloadUrl = down.buffer;
      let info;
      if(config.isPremium === true){
      info = `
${castem.YTMP4(data)}
`;
      }else{
                info = `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> ==========================
> ➥ *Title:* ${data.title} 
> ➥ *Duration:* ${data.timestamp} 
> ➥ *Uploaded On:* ${data.ago} 
> ➥ *Link:* ${data.url}
> ==========================
        `
      }

      m.react("⬆️");

      await conn.sendMessage(from, {
        document: downloadUrl,
        mimetype: "video/mp4",
        fileName: `${data.title}.mp4`,
        caption: info,
        jpegThumbnail: thumbnailBuffer, // Ensure this is properly formatted
      });

      m.react("✅");
    } catch (e) {
      console.log(e);
      reply(`Failed to download or send video. Error: ${e.message}`);
    }
  }
);

cmd(
  {
    pattern: "csong",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    use: ".yts numba ha",
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
      if (!q) return reply("Please provide a search query & newsletterJid");
      let n = q.split(" & ");
      q = n[0]
      let jid = n[1]
      const search = await yts(q);
      const videos = search.videos.slice(0, 10); // Get top 10 results

      if (!videos.length) return reply("No Songs found.");

      const buttons = videos.map((video, index) => ({
        buttonId: `${prefix}csongdl ${video.url} & ${jid}`,
        buttonText: { displayText: `*${index + 1}. ${video.title}*` },
        type: 1,
      }));
let IMG;
if(config.isPremium === true){
IMG = castem.IMG
} else {
IMG = "https://github.com/senuraya/images/blob/main/Gemini_Generated_Image_pu3x97pu3x97pu3x%20(1).png"
}
      const buttonMessage = {
        image: { url: IMG },
        caption: `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> ${oce}*HELLO THERE ${pushname}*${oce}`,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };

      if (config.BTN_MSG === false) {
        return await conn.nonbuttonMessage(from, buttonMessage);
      } else {
        return await conn.newlist(from, buttonMessage);
      }
    } catch (e) {
      console.log(e);
      reply(`Error: ${e.message || e}`);
    }
  }
);

cmd(
  {
    pattern: "csongdl",
    desc: "To download songs.",
    use: ".song lelena",
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
      config,
      apikey,
      baseurl,
      body,
      args,
      q,
      isGroup,
      pushname,
      reply,
    }
  ) => {
    try {
      const prefix = config.PREFIX;
      if (!q) return reply("Please give me a URL or title.");
      let n = q.split(" & ");
      q = n[0]
      let jid = n[1];
      m.react("⬇️");
      q = convertYouTubeLink(q);
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;
      let desc
if(config.isPremium === true){
  desc = `
${castem.SONG(data,pushname)}
`;
}else{
  desc = `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> ==========================
> ${oce}[  S  O  N  G    D  L  ]${oce}
> >>>>>>>>>>>>>>>>>>>>>>>>>>
> 🎶 *Title:* ${data.title}
> ⏱️ *Duration:* ${data.timestamp}
> 👁️ *Views:* ${data.views}
> 📅 *Uploaded On:* ${data.ago}
> 🔗 *Link:* ${data.url}
> >>>>>>>>>>>>>>>>>>>>>>>>>>
> =========================`
}

const down = await getYoutubeAudioBuffer(data.url,"128","480","mp3");
const downloadUrl = down.buffer;
m.react("⬆️");
await conn.sendMessage(
          `${jid}`,{
            image:{url:data.thumbnail},
            caption:desc
          }
)
// Handle option 2 (Document File)
await conn.sendMessage(
          `${jid}`,
          {
            audio: downloadUrl,
            mimetype: "audio/mpeg",
            fileName: down.filename,
            ptt : true
          }
        );
    m.react("✅");
    } catch (e) {
      console.error(e);
      reply(`${e}`);
    }
  }
);
