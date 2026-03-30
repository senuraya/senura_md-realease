const { fetchJson } = require("../Utils/functions");
const { cmd, commands } = require("../Utils/command");
//const config = require("../settings/config.cjs"); // Ensure your API key is in config
const axios = require("axios");
const { Buffer } = require("buffer");
const {
  savefromV2,
  ChatGpt,
  searchfilm,
  getSurah,
  tafsir,
  instagram4,
  capcutdl,
  instagram3,
  mediafiredll,
  cekkuota,
  tele,
  instagram2,
  ytPlayMp4,
  ytPlayMp3,
  kodepos,
  pinterest,
  igdl,
  textpro,
  mediafire,
  ffstalk,
  mlstalk,
  Tiktok,
  surah,
  listsurah,
  ephoto,
  emoji,
} = require("../Utils/scraper");
//esana

const GOOGLE_API_KEY = "AIzaSyDlaGMYsN8_do1pTHA_M4j7pY8qSeZlcn8"; // Replace with your Google API key
const GOOGLE_CX = "50b456fad00a5469b"; // Replace with your Google Custom Search Engine ID


cmd(
  {
    pattern: "img",
    desc: "Search and send images from Google.",
    react: "🖼️",
    category: "search",
    use: ".img cat / 5",
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
      let qa = q;
      if (!q)
        return await reply(
          "Please provide a search query and a number for the image.\n.img black panther / 10"
        );
      let qt = qa.split(" / ")[0];
      let no = qa.split(" / ")[1] || "5";
      // Fetch image URLs from Google Custom Search API
      const searchQuery = encodeURIComponent(qt);
      const url = `https://api.siputzx.my.id/api/images?query=${searchQuery}`;

      const response = await fetchJson(url);
      const data = response;

      if (!data.items || data.items.length === 0) {
        return await reply("No images found for your query.");
      }

      // Send images with title and link
      for (let i = 0; i < no; i++) {
        const item = data.items[i];
        const imageUrl = item.url;
        //const title = item.title || "No Title Available";

        // Download the image
        const imageResponse = await axios.get(imageUrl, {
          responseType: "arraybuffer",
        });
        const buffer = Buffer.from(imageResponse.data, "binary");

        // Send the image with title and link
        await conn.sendMessage(
          from,
          {
            image: buffer,
            caption: `> *Image ${
              i + 1
            } from your search!* 🌟\n> *Link:* ${imageUrl}\n${config.BOTNAME || "> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}`,
          },
          { quoted: kee }
        );
      }
    } catch (e) {
      console.error(e);
      reply(`Error: ${e.message}`);
    }
  }
);


cmd(
  {
    pattern: "bingimg",
    desc: "Search and send images from Bing.",
    react: "🖼️",
    category: "search",
    use: ".bingimg cat / 5",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { kee, from, quoted, body,config, command, args, q, reply }
  ) => {
    try {
      if (!q) {
        return await reply(
          "*🌟 USAGE 🌟*\nProvide a search query and the number of images you want.\n\n*Example:* .bingimg black panther / 3"
        );
      }

      // Extract query and number of images from input
      const [query, numberInput] = q.split(" / ");
      const imageCount = parseInt(numberInput, 10);

      if (!query || isNaN(imageCount) || imageCount < 1) {
        return await reply(
          "*⚠️ INVALID FORMAT!*\nUse the correct format:\n.bingimg <query> / <number>\n\n*Example:* .bingimg black panther / 5"
        );
      }

      // Fetch image results from the Bing API
      const searchQuery = encodeURIComponent(query);
      const res = await fetchJson(
        `https://api.siputzx.my.id/api/s/bimg?query=${searchQuery}`
      );

      if (!res || !res.data || res.data.length === 0) {
        return await reply(
          "*😔 Sorry! No images found for your query. Try again with different keywords!*"
        );
      }

      const images = res.data;

      if (imageCount > images.length) {
        return await reply(
          `*⚠️ LIMITED IMAGES AVAILABLE!*\nOnly *${images.length} images* found for your query. Please choose a number between 1 and ${images.length}.`
        );
      }

      // Send the requested images
      for (let i = 0; i < imageCount; i++) {
        const selectedImage = images[i];

        await conn.sendMessage(
          from,
          {
            image: { url: selectedImage },
            caption: `> *IMAGE ${
              i + 1
            } FROM YOUR SEARCH*\n\n> *Query:* ${query}\n> *Image Link:* ${selectedImage}\n${config.BOTNAME || "> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}`,
          },
          { quoted: kee }
        );
      }
    } catch (e) {
      console.error(e);
      reply(`*❌ ERROR OCCURRED:*\n${e.message}\n\nPlease try again later.`);
    }
  }
);

cmd(
  {
    pattern: "pinterest",
    react: "🎀",
    desc: "Search and send images from Pinterest",
    category: "search",
    use: ".pinterest <query> / <number>",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { kee, from, prefix, quoted,config, body, isCmd, command, args, q, reply, mnu }
  ) => {
    try {
      if (!q)
        return await reply(
          "Please provide a query and optionally the number of images.\nExample: .pinterest Spider-Man / 10"
        );

      // Parse the input
      const [query, number] = q.split("/").map((item) => item.trim());
      const numPhotos = parseInt(number) || 5; // Default to 5 if no number is provided

      if (isNaN(numPhotos) || numPhotos <= 0) {
        return await reply("Please provide a valid number of images to send.");
      }

      // Fetch data from Pinterest
      let data = await pinterest(query);

      if (!data || !data.result || data.result.length === 0) {
        return await reply("No images found for your query.");
      }

      // Limit the number of images to send based on user input
      const imglinks = data.result.slice(0, numPhotos);

      // Send the requested number of images
      for (const link of imglinks) {
        await conn.sendMessage(
          from,
          {
            image: { url: link },
            caption: `> *Pinterest Search Result* 🌟\n> *Query*: ${query}\n> *Source*: Pinterest\n${config.BOTNAME || "> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}`,
          },
          { quoted: kee }
        );
      }

      reply(`✅ Sent ${imglinks.length} image(s) for the query: *${query}*`);
    } catch (e) {
      console.log(e);
      reply(`Error: ${e.message}`);
    }
  }
);


cmd(
  {
    pattern: "wallpaper",
    react: "💘",
    desc: "Search and send images from Wallpapers",
    category: "search",
    use: ".wallpaper <query> / <number>",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { kee, from, prefix, quoted,config, body, isCmd, command, args, q, reply, mnu }
  ) => {
    try {
      if (!q)
        return await reply(
          "Please provide a query and optionally the number of images.\nExample: .wallpaper Spider-Man / 10"
        );

      // Parse the input
      const [query, number] = q.split("/").map((item) => item.trim());
      const numPhotos = parseInt(number) || 5; // Default to 5 if no number is provided

      if (isNaN(numPhotos) || numPhotos <= 0) {
        return await reply("Please provide a valid number of images to send.");
      }

      // Fetch data from API
      const data = await fetchJson(
        `https://pikabotzapi.vercel.app/search/wallpcom/?apikey=anya-md&query=${query}`
      );

      if (!data || !data.results || data.results.length === 0) {
        return await reply("No images found for your query.");
      }

      // Limit the number of images based on user input
      const imglinks = data.results.slice(0, numPhotos);

      // Send the requested number of images
      for (const img of imglinks) {
        const { url, title } = img;

        await conn.sendMessage(
          from,
          {
            image: { url },
            caption: `> *Wallpaper Search Result* 🌟\n> *Query*: ${query}\n> *Title*: ${title}\n${config.BOTNAME || "> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}`,
          },
          { quoted: kee }
        );
      }

      reply(`✅ Sent ${imglinks.length} image(s) for the query: *${query}*`);
    } catch (e) {
      console.error(e);
      reply(`❌ Error occurred: ${e.message}`);
    }
  }
);
