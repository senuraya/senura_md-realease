const { fetchJson } = require("../Utils/functions");
const getFBInfo = require("@xaviabot/fb-downloader");
const cheerio = require("cheerio");
const { igdl } = require("ruhend-scraper");
const axios = require("axios");
const { cmd, commands } = require("../Utils/command");
const castem = require("../../customization");

cmd(
  {
    pattern: "tiktok",
    alias: ["tt"],
    react: "🎥",
    desc: "download tiktok videos",
    category: "download",
    use: ".tt vt.tiktok.com/url",
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
      let prefix = config.PREFIX;
      if (!q && !q.startsWith("https://"))
        return await reply("*give me tiktok url ❌*");
      m.react("⬇️");
      //fetch data from api
      let dat = await fetchJson(
        `https://mr-rashmika-apis.vercel.app/scrape-tiktok?url=${q}&apikey=MR.RASHMIKA`
      );
      let datas = dat.data.data;
      let desc 
if(config.isPremium === false){
  desc = `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> [ T I K T O K  D L ]
> ========================
> * Title  * ${datas.title}
> * Author * ${datas.author}
> * URL    * ${q}
> ========================`;
}else{
  desc = castem.TIKTOK(datas,pushname, q);
}
 const buttons = [
        {
          buttonId: prefix + `tnw ${datas.watermark}`,
          buttonText: { displayText: "*NO WATERMARK*" },
          type: 1,
        },
        {
          buttonId: prefix + `tww ${datas.nowm}`,
          buttonText: { displayText: "*WITH WATERMARK*" },
          type: 1,
        },
        {
          buttonId: prefix + `ta ${datas.audio}`,
          buttonText: { displayText: "*Audio file*" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: { url: datas.thumbnail },
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
    pattern: "tnw",
    react: "⬇",
    category: "no",
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
        try {
      let prefix = config.PREFIX;
      await conn.sendMessage(from, { react: { text: "⬆", key: mek.key } });
      await conn.sendMessage(
        from,
        {
          video: { url: q },
          mimetype: "video/mp4",
          caption: `
> *NO-WATERMARK*
${config.BOTNAME || "> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}`,
        },
        { quoted: mek }
      );
      await conn.sendMessage(from, { react: { text: "✔", key: mek.key } });
    } catch (e) {
      await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } });
      console.log(e);
      reply(`Error !!\n\n*${e}*`);
    }
  }
);


cmd(
  {
    pattern: "tww",
    react: "⬇",
    category: "no",
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
        try {
      let prefix = config.PREFIX;
      await conn.sendMessage(from, { react: { text: "⬆", key: mek.key } });
      await conn.sendMessage(
        from,
        {
          video: { url: q },
          mimetype: "video/mp4",
          caption: `
> *WITH-WATERMARK*
${config.BOTNAME || "> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}`,
        },
        { quoted: mek }
      );
      await conn.sendMessage(from, { react: { text: "✔", key: mek.key } });
    } catch (e) {
      await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } });
      console.log(e);
      reply(`Error !!\n\n*${e}*`);
    }
  }
);


cmd(
  {
    pattern: "ta",
    react: "⬇",
    category: "no",
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
      let prefix = config.PREFIX;
      await conn.sendMessage(from, { react: { text: "⬆", key: mek.key } });
      await conn.sendMessage(
        from,
        { audio: { url: q }, mimetype: "audio/mpeg" },
        { quoted: mek }
      );
      await conn.sendMessage(from, { react: { text: "✔", key: mek.key } });
    } catch (e) {
      await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } });
      console.log(e);
      reply(`Error !!\n\n*${e}*`);
    }
  }
);

// Facebook Downloader

cmd(
  {
    pattern: "fb",
    alias: ["facebook"],
    desc: "Download Facebook videos",
    category: "download",
    use: ".fb www.facebook.com/abc/video",
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
        try {
      let prefix = config.PREFIX;
      if (!q || !q.startsWith("https://")) {
        return conn.sendMessage(
          from,
          { text: "❌ Please provide a valid URL." },
          { quoted: mek }
        );
      }

      await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

      const result = await getFBInfo(q);

      let captionHeader
      if(config.isPremium === false){
     captionHeader = `
${config.BOTNAME || "> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> [ F A C E B O O K  D L ]
> =======================
> *TITLE* - ${result.title}
> *Url*   - ${q} 
> =======================`;
        }else{
          castem.FACEBOOK(result,pushname, q);
      }


      const buttons = [
        {
          buttonId: prefix + `fbhd ${result.sd}`,
          buttonText: { displayText: "*SD QUALITY*" },
          type: 1,
        },
        {
          buttonId: prefix + `fbhd ${result.hd}`,
          buttonText: { displayText: "*HD QUALITY*" },
          type: 1,
        },
        {
          buttonId: prefix + `ta ${result.sd}`,
          buttonText: { displayText: "*Audio file*" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: { url: result.thumbnail },
        caption: captionHeader,
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
    pattern: "fbhd",
    react: "⬇",
    category: "no",
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
        try {
      let prefix = config.PREFIX;
      await conn.sendMessage(from, { react: { text: "⬆", key: mek.key } });
      await conn.sendMessage(
        from,
        {
          video: { url: q },
          mimetype: "video/mp4",
          caption: `${config.BOTNAME || "> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}`,
        },
        { quoted: mek }
      );
      await conn.sendMessage(from, { react: { text: "✔", key: mek.key } });
    } catch (e) {
      await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } });
      console.log(e);
      reply(`Error !!\n\n*${e}*`);
    }
  }
);


cmd(
  {
    pattern: "twitter",
    alias: ["tweet", "twdl"],
    desc: "Download Twitter videos",
    category: "download",
    use: ".tweet www.twitter.com/url",
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
      config,
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
      if (!q || !q.startsWith("https://")) {
        return conn.sendMessage(
          from,
          { text: "❌ Please provide a valid Twitter URL." },
          { quoted: mek }
        );
      }

      // React to indicate processing start
      await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

      // Fetch video information from Dark Yasiya Twitter API
      const twitterData = await axios.get(
        `https://api.siputzx.my.id/api/d/twitter?url=${q}`
      );
      const data = twitterData.data;

      if (!data || !data.status || !data.data) {
        return m.reply(
          "Failed to retrieve Twitter video. Please check the link and try again."
        );
      }
      const { imgUrl, videoTitle, videoDescription, downloadLink } = data.data;
      let captionHeader
      if(config.isPremium === false){
 captionHeader = `
${config.BOTNAME || "> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> [ T W I T T E R  D L ]
> =======================
> *Desc*  : ${videoDescription || "N/A"}
> *Title* : ${videoTitle}
> =======================`;
      }else{
        captionHeader = castem.TWITTER(videoDescription,videoTitle,pushname);
      }
      const buttons = [
        {
          buttonId: prefix + `fbhd ${downloadLink}`,
          buttonText: { displayText: "*Video DL*" },
          type: 1,
        },
        {
          buttonId: prefix + `ta ${downloadLink}`,
          buttonText: { displayText: "*Audio DL*" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: { url: imgUrl },
        caption: captionHeader,
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
      console.log(e);
      reply(`An error occurred: ${e}`);
    }
  }
);


async function getFileDetails(url) {
  // First, try to get details via HEAD request
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return {
      fileName: new URL(url).pathname.split('/').pop() || 'unknown',
      fileSize: response.headers.get('content-length')
        ? (response.headers.get('content-length') / (1024 * 1024)).toFixed(2) + ' MB'
        : 'Unknown',
      fileType: response.headers.get('content-type') || guessContentTypeFromUrl(url),
      lastModified: response.headers.get('last-modified'),
      source: 'fetched'
    };
  } catch (e) {
    // If fetch fails, extract from URL
    return extractDetailsFromUrl(url);
  }
}

// Helper function to extract file name and type from URL
function extractDetailsFromUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    const fileName = pathname.split('/').pop() || 'unknown';
    
    // Remove query parameters from filename if present
    const cleanFileName = fileName.split('?')[0];
    
    return {
      fileName: cleanFileName,
      fileSize: 'Unknown',
      fileType: guessContentTypeFromUrl(url),
      lastModified: null,
      source: 'guessed'
    };
  } catch (error) {
    // If URL parsing fails, try to extract manually
    return extractFromString(url);
  }
}

// Extract when URL constructor fails (e.g., relative URLs or malformed)
function extractFromString(urlString) {
  // Extract the last part after /
  const parts = urlString.split('/');
  let fileName = parts.pop() || 'unknown';
  
  // Remove query parameters
  fileName = fileName.split('?')[0];
  // Remove hash fragments
  fileName = fileName.split('#')[0];
  
  return {
    fileName: fileName,
    fileSize: 'Unknown',
    fileType: guessContentTypeFromUrl(urlString),
    lastModified: null,
    source: 'guessed'
  };
}

// Guess content type from file extension
function guessContentTypeFromUrl(url) {
  const extensionMap = {
    // Archives
    '.zip': 'application/zip',
    '.rar': 'application/vnd.rar',
    '.7z': 'application/x-7z-compressed',
    '.tar': 'application/x-tar',
    '.gz': 'application/gzip',
    
    // Videos
    '.mp4': 'video/mp4',
    '.avi': 'video/x-msvideo',
    '.mov': 'video/quicktime',
    '.wmv': 'video/x-ms-wmv',
    '.flv': 'video/x-flv',
    '.mkv': 'video/x-matroska',
    '.webm': 'video/webm',
    '.m4v': 'video/x-m4v',
    '.mpg': 'video/mpeg',
    '.mpeg': 'video/mpeg',
    
    // Images
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.bmp': 'image/bmp',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.tiff': 'image/tiff',
    
    // Audio
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg',
    '.m4a': 'audio/mp4',
    '.flac': 'audio/flac',
    '.aac': 'audio/aac',
    
    // Documents
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    
    // Text/Code
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.htm': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.xml': 'application/xml',
    '.csv': 'text/csv',
    
    // Executables
    '.exe': 'application/x-msdownload',
    '.msi': 'application/x-msdownload',
    '.dmg': 'application/x-apple-diskimage',
    '.pkg': 'application/x-newton-compatible-pkg',
    '.deb': 'application/x-debian-package',
    '.rpm': 'application/x-redhat-package-manager',
    
    // Fonts
    '.ttf': 'font/ttf',
    '.otf': 'font/otf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    
    // Others
    '.iso': 'application/x-iso9660-image',
    '.apk': 'application/vnd.android.package-archive',
    '.torrent': 'application/x-bittorrent'
  };
  
  // Try to get extension from URL
  const urlStr = url.toString();
  const lastDotIndex = urlStr.lastIndexOf('.');
  const queryIndex = urlStr.indexOf('?');
  const hashIndex = urlStr.indexOf('#');
  
  // Find where the extension ends (before ? or #)
  let endIndex = urlStr.length;
  if (queryIndex > -1) endIndex = Math.min(endIndex, queryIndex);
  if (hashIndex > -1) endIndex = Math.min(endIndex, hashIndex);
  
  if (lastDotIndex > -1 && lastDotIndex < endIndex) {
    const extension = urlStr.substring(lastDotIndex, endIndex).toLowerCase();
    if (extensionMap[extension]) {
      return extensionMap[extension];
    }
    
    // Check for compound extensions (like .tar.gz)
    const secondLastDotIndex = urlStr.lastIndexOf('.', lastDotIndex - 1);
    if (secondLastDotIndex > -1) {
      const compoundExtension = urlStr.substring(secondLastDotIndex, endIndex).toLowerCase();
      if (extensionMap[compoundExtension]) {
        return extensionMap[compoundExtension];
      }
    }
  }
  
  // Default if no extension found or not in map
  return 'application/octet-stream';
}

cmd(
  {
    pattern: "fetch",
    desc: "To download files from direct links.",
    category: "download",
    use: ".fetch file/link",
    filename: __filename,
  },
  async (conn, mek, m, { from, quoted,config,pushname, body, command, args, q, reply }) => {
        try {
      let prefix = config.PREFIX;
      if (!q) return reply("❌ Please provide a valid direct download link.");

      // React to indicate the download process
      m.react("⬇️");

      // Fetch file details (Ensure `getFileDetails` returns valid data)
      const data = await getFileDetails(q);
      if (!data) return reply("❌ Failed to fetch file details.");

      const fileUrl = q;
      const fileSize = data.fileSize
        ? `${parseFloat(data.fileSize).toFixed(2)} MB`
        : "Unknown Size";
      const fileName = data.fileName || "downloaded_file";
      const fileType = data.fileType || "application/octet-stream";

      // React to indicate the file is being sent
      m.react("⬆️");

      let msg 
if (config.isPremium === false){ 
msg = `
${config.BOTNAME || "> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*      
> [ D I R E C T  D L ]
> =======================        
> *File Name:* ${fileName}
> *File Size:* ${fileSize}
> *File Type:* ${fileType}
> =======================`;
}else {
msg = castem.DIRECT(pushname,fileName,fileSize,fileType);  
}

      // Send file to chat (without downloading locally)
      await conn.sendMessage(from, {
        document: { url: fileUrl },
        mimetype: fileType,
        fileName: fileName,
        caption: msg,
      });

      m.react("✅"); // Success reaction
    } catch (error) {
      console.error(error);
      reply(`❌ An error occurred: ${error.message}`);
    }
  }
);


cmd(
  {
    pattern: "mediafire",
    desc: "To download MediaFire files.",
    category: "download",
    use: ".mediafire www.mediafire.com/file/link",
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
      baseurl,
      apikey,
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
        try {
      let prefix = config.PREFIX;
      if (!q) return m.reply("Please provide a valid MediaFire link.");

      // React to indicate download start
      m.react("⬇️");

      // Fetch file information from the Dark Yasiya API
      const response = await fetchJson(
        `${baseurl}/api/mediafire?url=${q}&apikey=${apikey}`
      );
      const data = response.data;

      if (!response) {
        return m.reply(
          "Failed to fetch MediaFire download link. Ensure the link is valid and public."
        );
      }

      const fileUrl = data.url;
      const fileSize = data.size || ".......";
      const fileName = data.filename || "mediafire_download";
      let dat = await getFileDetails(fileUrl);
      const fileType = dat.fileType || "application/octet-stream";

      // React to indicate file is being sent
      m.react("⬆️");

      let msg 
if(config.isPremium === false){
  msg = `
${config.BOTNAME || "> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> [ M E D I A F I R A ]
> ======================
> *File Name:* ${data.title}
> *File Size:* ${fileSize}
> ======================`;
} else {
  msg = castem.MEDIAFIRE(pushname,data,fileSize)
}
      // Send file to chat without downloading
      await conn.sendMessage(from, {
        document: { url: fileUrl },
        mimetype: fileType,
        fileName: fileName, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
        caption: msg,
      });
      m.react("✅");
    } catch (error) {
      console.error(error);
      reply(`An error occurred: ${error.message}`);
    }
  }
);


cmd(
  {
    pattern: "ig",
    desc: "To download instagram videos.",
    react: "🎥",
    category: "download",
    use: ".ig www.instagrame.com/video/link",
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
        try {
      let prefix = config.PREFIX;
      if (!q) return m.reply(`Please Give Me a vaild Link...`);
      m.react("⬇️");

      let res = await igdl(q);

      let data = await res.data;
      for (let i = 0; i < 20; i++) {
        let media = data[i];
        let downloadurl = media.url;
        m.react("⬆️");
        await conn.sendMessage(
          from,
          {
            video: { url: downloadurl },
            mimetype: "video/mp4",
            caption: `${config.BOTNAME || "> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}`,
          },
          { quoted: mek }
        );
        m.react("✅");
      }
    } catch (e) {
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "apk",
    desc: "Download apk files.",
    category: "download",
    use: ".apk whatsapp",
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
      config,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      getThumbnailBuffer,
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
      await m.react("⬇");

      const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      let step1 = data.datalist.list[0].size % 1000000;
      let step2 = `.` + step1;
      let step3 = data.datalist.list[0].size / 1000000;
      let correctsize = step3 - step2;

      let desc 
if(config.isPremium === false){
  desc = `
${config.BOTNAME || "> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> [ A P K  D L ]
> =======================
> *Nᴀᴍᴇ :* ${data.datalist.list[0].name}
> *Sɪᴢᴇ :* ${correctsize}MB
> *Pᴀᴄᴋᴀɢᴇ :* ${data.datalist.list[0].package}
> *Lᴀꜱᴛ Uᴘᴅᴀᴛᴇ :* ${data.datalist.list[0].updated}
> *Dᴇᴠᴇʟᴏᴘᴇʀꜱ :* ${data.datalist.list[0].developer.name}
> =======================`;
} else {
  desc = castem.APK(pushname,data,correctsize);
}
const thumbnailBuffer = await getThumbnailBuffer(data.datalist.list[0].icon);
      await m.react("⬆");
      await conn.sendMessage(
        from,
        {
          document: { url: data.datalist.list[0].file.path_alt },
          fileName: data.datalist.list[0].name,
          mimetype: "application/vnd.android.package-archive",
          jpegThumbnail: thumbnailBuffer,
          caption: desc,
        },
        { quoted: mek }
      );
      await m.react("✅");
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);


cmd(
  {
    pattern: "gdrive",
    desc: "To download Gdrive files.",
    react: "🌐",
    category: "download",
    use: ".gdrive www.drive.google.com/file",
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
      baseurl,
      apikey,
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
      await conn.sendMessage(from, { react: { text: "⬇️", key: mek.key } });
      if (!q) return m.reply(`Please Give Me a vaild Link...`);

      const apiUrl = `https://api.siputzx.my.id/api/d/gdrive?url=${q}`;

      const downloadResponse = await axios.get(apiUrl);
      const downloadUrl = downloadResponse.data.data.download; // Assuming this is the correct path

      if (downloadUrl) {
        const data = await getFileDetails(downloadUrl);
        if (!data) return reply("❌ Failed to fetch file details.");
        const fileSize = data.fileSize
          ? `${parseFloat(data.fileSize).toFixed(2)} MB`
          : "Unknown Size";
        const fileName = data.fileName || "downloaded_file";
        const fileType = data.fileType || "application/octet-stream";
        // Send the video as a document (.mp4)
        let desc = `
${config.BOTNAME || "> [⚡ 𝗫Ｐ𝗥Ｏ𝗩𝗘𝗥𝗖𝗘 〽ᴅ ⚡]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> [ G D R I V E  D L ]
> =====================
> *NAME* - ${filename}
> *SAZE* - ${filesize}
> =====================`
        await conn.sendMessage(from, { react: { text: "⬆️", key: mek.key } });
        await conn.sendMessage(
          from,
          {
            document: { url: downloadUrl },
            mimetype: fileType,
            fileName: fileName,
            caption: desc,
          },
          { quoted: mek }
        );
      }

      await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
      console.log(e);
    }
  }
);

// Replace this URL with your actual webpage URL

cmd(
  {
    pattern: "spotify",
    react: "🎵",
    category: "download",
    desc: "Search and download songs from Spotify.",
    use: ".spotify biliver",
    filename: __filename,
  },
  async (conn, message, mek, { from,config, q, reply }) => {
        try {
      let prefix = config.PREFIX;
      if (!q) {
        return await reply("*Please provide a song name to search!*");
      }

      // Fetch search results from Spotify API
      let response = await fetchJson(
        `https://api.siputzx.my.id/api/s/spotify?query=${q}`
      );
      let data = response.data;
      let item = data[0];
      if (!data || data.length === 0) {
        return await reply(
          "*No results found for your search! Try a different query.*"
        );
      }

      let resultMessage
if(config.isPremium === false){
  resultMessage = `
${config.BOTNAME || "> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> [ S P O T I F Y  D L ]
> =====================
> *Title*  :${item.trackName}
> *Artist* : ${item.artistName}
> *Album*  : ${item.albumName}
> *Duration*: ${item.duration}
> *URL*: [Click Here](${item.externalUrl})
> =====================`;
} else {
  resultMessage = castem.SPOTIFY(pushname,item)
}
      const buttons = [
        {
          buttonId: prefix + `spot ${item.externalUrl} & 1`,
          buttonText: { displayText: "*Audio File*" },
          type: 1,
        },
        {
          buttonId: prefix + `spot ${item.externalUrl} & 2`,
          buttonText: { displayText: "*Document File*" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: { url: item.thumbnail },
        caption: resultMessage,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };
      if (config.BTN_MSG === false) {
        return await conn.nonbuttonMessage(from, buttonMessage);
      } else {
        return await conn.newButton(from, buttonMessage);
      }
    } catch (error) {
      console.error(error);
      await reply("🚩 *Error occurred while processing your request!*");
    }
  }
);


cmd(
  {
    pattern: "spot",
    react: "🎵",
    desc: "Search and download songs from Spotify.",
    use: ".spotify biliver",
    filename: __filename,
  },
  async (conn, message, mek, { from,config, getThumbnailBuffer, q, reply }) => {
        try {
      let prefix = config.PREFIX;
      const [url, messageType] = q.split(" & ");

      async function ytmp33() {
        let attempts = 0;
        const maxAttempts = 100;

        while (attempts < maxAttempts) {
          attempts++;
          console.log(`Retrying... Attempt ${attempts}`);

              try {
      let prefix = config.PREFIX;
            const datasa = await fetchJson(
              `https://api.siputzx.my.id/api/d/spotifyv2?url=${url}`
            );
            if (datasa && datasa.data) {
              return datasa.data; // No need to parse, it's already an object
            }
          } catch (error) {
            console.error(`Attempt ${attempts} failed: ${error.message}`);
          }
        }

        throw new Error(
          `Failed to get download URL after ${maxAttempts} attempts.`
        );
      }

      let res = await ytmp33();
      let data = res;

      await conn.sendMessage(from, { react: { text: "⬇️", key: mek.key } });

      const downloadUrl = data.mp3DownloadLink; // URL for the MP3
      const thumbnailUrl = data.coverImage; // Thumbnail URL for the image

      // React to the upload (sending the file)
      await conn.sendMessage(from, { react: { text: "⬆️", key: mek.key } });

      if (messageType === "1") {
        // Handle option 1 (Audio File)
        await conn.sendMessage(
          from,
          {
            audio: { url: downloadUrl },
            mimetype: "audio/mpeg",
            contextInfo: {},
          },
          { quoted: mek }
        );
      } else if (messageType === "2") {
        // Handle option 2 (Document File)
        await conn.sendMessage(from, {
          document: { url: downloadUrl },
          mimetype: "audio/mp3",
          fileName: `${data.title}.mp3`, // Use song title as filename
          caption: config.FOOTER,
          jpegThumbnail: await getThumbnailBuffer(thumbnailUrl), // Ensure this is properly formatted
        });
      }

      // React to the successful completion of the task
      await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

      console.log("Response sent successfully");
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);
