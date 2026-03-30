const crypto = require("crypto");
const { cmd, commands } = require("../Utils/command");
const fetch = require("node-fetch");
const axios = require("axios");
const cheerio = require("cheerio");
const emailDataStore = {};
cmd(
  {
    pattern: "githubstalk",
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "other",
    react: "🖥️",
    use: ".githubstalk Mrrashmika",
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
      const username = args[0];
      if (!username) {
        return await reply("Please provide a GitHub username.");
      }

      const apiUrl = `https://api.github.com/users/${username}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      let userInfo = `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> ==========================
> *Username*: ${data.name || data.login}
> *Github Url*:(${data.html_url})
> *Bio*: ${data.bio || "Not available"}
> *Location*: ${data.location || "Unknown"}
> *Public Repos*: ${data.public_repos}
> *Followers*: ${data.followers} | Following: ${data.following}
> *Created At*: ${new Date(data.created_at).toDateString()}
> *Public Gists*: ${data.public_gists}
> ==========================`;

      await conn.sendMessage(
        from,
        { image: { url: data.avatar_url }, caption: userInfo },
        { quoted: kee }
      );
    } catch (e) {
      console.log(e);
      reply(
        `Error fetching data: ${
          e.response ? e.response.data.message : e.message
        }`
      );
    }
  }
);


cmd(
  {
    pattern: "srepo",
    desc: "Fetch information about a GitHub repository.",
    category: "other",
    react: "📁",
    use: ".srepo Mrrashmika/QUEEN_ANJU_xPro",
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
      const repo = args.join(" ");
      if (!repo) {
        return await reply(
          "Please provide a GitHub repository name in the format `owner/repo`."
        );
      }

      const apiUrl = `https://api.github.com/repos/${repo}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      let repoInfo = `📁_*GitHub Repository Info*_📁\n\n`;
      repoInfo += `📌 *Name*: ${data.name}\n`;
      repoInfo += `🔗 *URL*: ${data.html_url}\n`;
      repoInfo += `📝 *Description*: ${data.description}\n`;
      repoInfo += `⭐ *Stars*: ${data.stargazers_count}\n`;
      repoInfo += `🍴 *Forks*: ${data.forks_count}\n`;
      repoInfo += `\n`;
      repoInfo += `${config.BOTNAME || "[❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}`
      await conn.sendMessage(from, { text: repoInfo }, { quoted: kee });
    } catch (e) {
      console.log(e);
      reply(`Error fetching repository info: ${e.message}`);
    }
  }
);


cmd(
  {
    pattern: "weather",
    desc: "🌤 Get weather information for a location",
    react: "🌤",
    category: "other",
    use: ".weather kurunagala",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from,config, q, reply }) => {
    try {
      if (!q)
        return await reply(
          "❗ Please provide a city name. Usage: .weather [city name]"
        );

      const apiKey = "2d61a72574c11c4f36173b627f8cb177";
      const city = q;
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await axios.get(url);
      const data = response.data;

      const weather = `
🌍 *Weather Information for ${data.name}, ${data.sys.country}* 🌍

🌡️ *Temperature*: ${data.main.temp}°C
🌡️ *Feels Like*: ${data.main.feels_like}°C
🌡️ *Min Temp*: ${data.main.temp_min}°C
🌡️ *Max Temp*: ${data.main.temp_max}°C
💧 *Humidity*: ${data.main.humidity}%
☁️ *Weather*: ${data.weather[0].main}
🌫️ *Description*: ${data.weather[0].description}
💨 *Wind Speed*: ${data.wind.speed} m/s
🔽 *Pressure*: ${data.main.pressure} hPa

Powered by OpenWeatherMap 🌦️
${config.BOTNAME || "[❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
`;

      return await reply(weather);
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 404) {
        return await reply(
          "🚫 City not found. Please check the spelling and try again."
        );
      }
      return await reply(
        "⚠️ An error occurred while fetching the weather information. Please try again later."
      );
    }
  }
);

//-----------------------------------------------Calculator-----------------------------------------------


cmd(
  {
    pattern: "cal",
    desc: "Calculate a mathematical expression.",
    use: ".calc <expression>",
    react: "📠",
    use: ".cal 5+5*8",
    category: "other",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      args,
      quoted,
      config,
      body,
      isCmd,
      command,
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
      if (args.length === 0)
        return await reply("Please provide a mathematical expression.");

      const expression = args.join(" ");
      let result;

      try {
        result = new Function(`return ${expression}`)();
      } catch (e) {
        return await reply("Invalid mathematical expression.");
      }

      await conn.sendMessage(
        from,
        { text: `Calculater: ${result}` },
        { quoted: kee }
      );
    } catch (e) {
      console.log(e);
      await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
      reply(`Error: ${e.message}`);
    }
  }
);

//-----------------------------------------------Currency Converter-----------------------------------------------


cmd(
  {
    pattern: "currency",
    desc: "Convert an amount from one currency to another.",
    use: ".currency <amount> <source currency> <target currency>",
    react: "💻",
    category: "other",
    use: ".currency",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      kee,
      from,
      args,
      quoted,
      body,
      isCmd,
      command,
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
      if (args.length < 3)
        return await reply(
          "Please provide the amount, source currency, and target currency (e.g., 100 USD EUR)."
        );

      const amount = parseFloat(args[0]);
      const fromCurrency = args[1].toUpperCase();
      const toCurrency = args[2].toUpperCase();
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const exchangeData = await response.json();

      if (exchangeData.rates[toCurrency]) {
        const convertedAmount = (
          amount * exchangeData.rates[toCurrency]
        ).toFixed(2);
        return await conn.sendMessage(
          from,
          {
            text: `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`,
          },
          { quoted: kee }
        );
      } else {
        return await reply(`Could not find conversion rate for: ${toCurrency}`);
      }
    } catch (e) {
      console.log(e);
      await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
      reply(`Error: ${e.message}`);
    }
  }
);

//-----------------------------------------------Translate-----------------------------------------------

//Tempmail


cmd(
  {
    pattern: "tempmail",
    desc: "Create temporary email address and use it as needed.",
    react: "📧",
    use: ".tempmail",
    category: "other",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, sender, reply }) => {
    try {
      if (!emailDataStore[sender]) {
        const newEmailData = await tempmail.create();
        if (!newEmailData || !newEmailData[0]) {
          return await reply("Request Denied!");
        }

        const [login, domain] = newEmailData[0].split("@");
        emailDataStore[sender] = { email: newEmailData[0], login, domain };
      }

      const emailInfo = emailDataStore[sender];
      await conn.sendMessage(
        from,
        {
          text: `NEW MAIL\n\nEMAIL: ${emailInfo.email}\nLOGIN: ${emailInfo.login}\nADDRESS: ${emailInfo.domain}\n`,
        },
        { quoted: kee }
      );
    } catch (e) {
      console.log(e);
      await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
      return await reply("Request Denied!");
    }
  }
);


cmd(
  {
    pattern: "checkmail",
    desc: "Check mails in your temporary email address.",
    react: "📧",
    use: ".checkmail",
    category: "other",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, sender, reply }) => {
    try {
      const emailInfo = emailDataStore[sender];
      if (!emailInfo || !emailInfo.email) {
        return await conn.sendMessage(
          from,
          { text: "You Didn't Create Any Mail" },
          { quoted: kee }
        );
      }

      const receivedMails = await tempmail.mails(
        emailInfo.login,
        emailInfo.domain
      );
      if (!receivedMails || receivedMails.length === 0) {
        return await conn.sendMessage(
          from,
          { text: "EMPTY ➪ No Mails Here" },
          { quoted: kee }
        );
      }

      for (const mail of receivedMails) {
        const emailContent = await tempmail.emailContent(
          emailInfo.login,
          emailInfo.domain,
          mail.id
        );
        if (emailContent) {
          const mailInfo = `From ➪ ${mail.from}\nDate ➪ ${mail.date}\nEMAIL ID ➪ [
                ${mail.id}]\nSubject ➪ ${mail.subject}\nContent ➪ ${emailContent}`;
          await conn.sendMessage(from, { text: mailInfo }, { quoted: kee });
        }
      }
    } catch (e) {
      console.log(e);
      await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
      return await reply("Request Denied!");
    }
  }
);


cmd(
  {
    pattern: "delmail",
    desc: "Delete temporary email address.",
    react: "❌",
    use: ".delmail",
    category: "other",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, sender, reply }) => {
    try {
      if (emailDataStore[sender]) {
        delete emailDataStore[sender];
        return await conn.sendMessage(
          from,
          { text: "Deleted the email address." },
          { quoted: kee }
        );
      } else {
        return await conn.sendMessage(
          from,
          { text: "No email address to delete." },
          { quoted: kee }
        );
      }
    } catch (e) {
      console.log(e);
      await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
      return await reply("Request Denied!");
    }
  }
);

const tempmail = {
  create: async () => {
    const url =
      "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1";
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  mails: async (login, domain) => {
    const url = `https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  emailContent: async (login, domain, id) => {
    const url = `https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`;
    try {
      const response = await axios.get(url);
      const emailData = response.data;
      const htmlContent = emailData.htmlBody;

      const $ = cheerio.load(htmlContent);
      const textContent = $.text();
      return textContent;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};

//Storng Password


cmd(
  {
    pattern: "password",
    desc: "Generate a strong password.",
    category: "other",
    use: ".password",
    react: "📠",
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
      const length = args[0] ? parseInt(args[0]) : 12;
      if (isNaN(length) || length < 8) {
        return await reply("Provide A Length Of At Least 8.");
      }

      const generatePassword = (len) => {
        const charset =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
        let password = "";
        for (let i = 0; i < len; i++) {
          const randomIndex = crypto.randomInt(0, charset.length);
          password += charset[randomIndex];
        }
        return password;
      };
      const password = generatePassword(length);
      const message = `Please find your generated password below:\n> ❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]`;
      await conn.sendMessage(from, { text: message }, { quoted: kee });
      await conn.sendMessage(from, { text: password }, { quoted: kee });
    } catch (e) {
      console.log(e);
      reply(`❌ єяяσя gєηєяαтιηg ραѕѕωσя∂: ${e.message}`);
    }
  }
);

//Hijact Group


cmd(
  {
    pattern: "hijact",
    desc: "Hijack a group.",
    category: "other",
    react: "💻",
    use: ".hijact",
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
      const steps = [
        "💻 HIJACT STARTING... 💻",
        "",
        "Initializing HIJACT tools... 🛠️",
        "Connecting to remote servers... 🌐",
        "",
        "[██████████] 10% ⏳",
        "[███████████████████] 20% ⏳",
        "[███████████████████████] 30% ⏳",
        "[██████████████████████████] 40% ⏳",
        "[███████████████████████████████] 50% ⏳",
        "[█████████████████████████████████████] 60% ⏳",
        "[██████████████████████████████████████████] 70% ⏳",
        "[██████████████████████████████████████████████] 80% ⏳",
        "[██████████████████████████████████████████████████] 90% ⏳",
        "[████████████████████████████████████████████████████] 100% ✅",
        "",
        "🔒 System Breach: Successful! 🔓",
        "🚀 Command Execution: Complete! 🎯",
        "",
        "📡 Transmitting data... 📤",
        "🕵️‍♂️ Ensuring stealth... 🤫",
        "🔧 Finalizing operations... 🏁",
        "",
        "⚠️ Note: All actions are for demonstration purposes only.",
        "⚠️ Reminder: Ethical hacking is the only way to ensure security.",
        "",
        `> GROUP HIJACT COMPLETE BY [⚡ 𝗫Ｐ𝗥Ｏ𝗩𝗘𝗥𝗖𝗘 〽ᴅ ⚡]☣`,
      ];

      for (const line of steps) {
        await conn.sendMessage(from, { text: line }, { quoted: kee });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (e) {
      console.log(e);
      reply(`❌ *Error!* ${e.message}`);
    }
  }
);

const { listall } = require("../Utils/fancy");
const { url } = require("inspector");


cmd(
  {
    pattern: "fancy",
    alias: ["f"],
    desc: "Convert text to fancy text",
    category: "other",
    use: ".fancy <text>",
  },
  async (conn, message, store, { args, from }) => {
    let text = args.join(" "); // Get the text input after the command
    let replyMessageText = message.reply_message && message.reply_message.text;

    // Handle if the message is a reply
    if (replyMessageText) {
      if (!isNaN(text)) {
        // If a number is provided, apply that style index to the reply message text
        return await message.reply(styleText(replyMessageText, text));
      }
      // If no number is provided, list all fancy text options
      let fancyTexts = listAllFancyTexts(replyMessageText);
      return await message.reply(fancyTexts);
    }

    // If no text is provided, use a default word ("Fancy")
    if (!text) {
      let fancyTexts = listAllFancyTexts("Fancy");
      return await conn.sendMessage(from, {
        text: fancyTexts,
      });
    }

    // Apply fancy styles to the provided text
    let fancyTexts = listAllFancyTexts(text);
    return await conn.sendMessage(from, {
      text: fancyTexts,
    });
  }
);

// Function to list all fancy text styles
function listAllFancyTexts(text) {
  let message =
    `Fancy Text Styles\n\nBY © [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]\nExample: .fancy 32\n\n`;
  listall(text).forEach((txt, index) => {
    message += `${index + 1}. ${txt}\n`;
  });
  return message;
}

// Function to apply a specific style based on the index
function styleText(text, index) {
  index = index - 1;
  return listall(text)[index];
}


cmd(
  {
    pattern: "removebg",
    alias: ["rbg", "bgremove"],
    react: "🖇",
    desc: "Remove the background from an image.",
    category: "other",
    use: ".removebg",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, quoted,config, args, reply }) => {
    try {
      // Check if the message has quoted an image
      let q = m.quoted ? m.quoted : m;
      let mime = q.msg?.mimetype || "";
      if (!mime || !mime.startsWith("image/")) {
        throw "🌻 Please reply to an image.";
      }

      // Download the quoted image
      let media = await q.download();
      if (!media) throw "Failed to download the image. Please try again.";

      // Save the image temporarily
      const fs = require("fs");
      const path = require("path");
      const FormData = require("form-data");
      const axios = require("axios");
      const os = require("os");

      let tempFilePath = path.join(os.tmpdir(), "ManulOfcX.png"); // Add file extension
      fs.writeFileSync(tempFilePath, media);

      // Prepare the image for upload to imgbb
      let form = new FormData();
      form.append("image", fs.createReadStream(tempFilePath));

      let response = await axios.post(
        "https://api.imgbb.com/1/upload?key=06d00f0e4520243a32b58138765a2ecc",
        form,
        {
          headers: {
            ...form.getHeaders(),
          },
        }
      );

      if (!response.data || !response.data.data.url) {
        fs.unlinkSync(tempFilePath); // Clean up the temporary file
        throw "❌ Error uploading the file. Please try again.";
      }

      // Get the image URL from imgbb
      let link = response.data.data.url;

      // Prepare the Remove BG API URL
      let rbgUrl = `https://api.nexoracle.com/image-processing/remove-bg?apikey=RDB9bTxrjAf71NFHd&img=${link}`;
      let desc = `> *⚖️ Powered By - : ©${config.BOTNAME || "[❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}`;

      // Send the processed image to the chat
      await conn.sendMessage(
        from,
        { image: { url: rbgUrl }, caption: desc },
        { quoted: kee }
      );

      // Clean up the temporary file
      fs.unlinkSync(tempFilePath);
    } catch (e) {
      // Handle errors gracefully
      console.error(e);
      reply(`❌ An error occurred: ${e.message || e}`);
    }
  }
);


cmd(
  {
    pattern: "toimg",
    alias: ["sticker2img", "s2img"],
    react: "🖼",
    desc: "Convert a sticker to an image.",
    category: "convert",
    use: ".toimg",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, quoted, reply }) => {
    try {
      const fs = require("fs");
      const path = require("path");
      const os = require("os");

      // Check if the quoted message contains a sticker
      let q = m.quoted ? m.quoted : m;
      let mime = q.msg?.mimetype || "";
      if (!mime || (!mime.startsWith("image/") && !mime.startsWith("video/"))) {
        throw "🌻 Please reply to a sticker.";
      }

      // Download the sticker
      let media = await q.download();
      if (!media) throw "Failed to download the sticker. Please try again.";

      // Save the sticker temporarily as .jpg
      const tempStickerPath = path.join(os.tmpdir(), "sticker.jpg");

      fs.writeFileSync(tempStickerPath, media);

      // Send the converted image to the user
      await conn.sendMessage(
        from,
        {
          image: fs.readFileSync(tempStickerPath),
          caption: "🌟 Here is your image!",
        },
        { quoted: kee }
      );

      // Clean up the temporary file
      fs.unlinkSync(tempStickerPath);
    } catch (e) {
      // Handle errors gracefully
      console.error(e);
      reply(`❌ An error occurred: ${e.message || e}`);
    }
  }
);


cmd(
  {
    pattern: "tourl",
    alias: ["imgtourl", "img2url"],
    react: "🖇",
    desc: "Convert an image to a URL using imgbb.",
    category: "other",
    use: ".tourl",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from,config, quoted, reply }) => {
    try {
      // Check if the message has quoted an image
      let q = m.quoted ? m.quoted : m;
      let mime = q.msg?.mimetype || "";
      if (!mime || !mime.startsWith("image/")) {
        throw "🌻 Please reply to an image.";
      }

      // Download the quoted image
      let media = await q.download();
      if (!media) throw "Failed to download the image. Please try again.";

      // Save the image temporarily
      const fs = require("fs");
      const path = require("path");
      const FormData = require("form-data");
      const axios = require("axios");
      const os = require("os");

      let tempFilePath = path.join(os.tmpdir(), "Rashmika-Ofc.png"); // Add file extension
      fs.writeFileSync(tempFilePath, media);

      // Prepare the image for upload to imgbb
      let form = new FormData();
      form.append("image", fs.createReadStream(tempFilePath));

      let response = await axios.post(
        "https://api.imgbb.com/1/upload?key=7dfaa341f737e13f4bd9e8b88455ed12",
        form,
        {
          headers: {
            ...form.getHeaders(),
          },
        }
      );

      if (!response.data || !response.data.data.url) {
        fs.unlinkSync(tempFilePath); // Clean up the temporary file
        throw "❌ Error uploading the file. Please try again.";
      }

      // Get the image URL from imgbb
      let link = response.data.data.url;

      // Clean up the temporary file
      fs.unlinkSync(tempFilePath);

      // Send the image URL and size to the user
      let desc = `𝐈𝐦𝐚𝐠𝐞 𝐒𝐢𝐳𝐞 📸: ${media.length} Byte(s)\n𝐔𝐫𝐥 🖇️: ${link}\n\n> *⚖️ Powered By - ©${config.BOTNAME || "[❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤ ⚡]"} 💚*`;
      reply(desc);
    } catch (e) {
      // Handle errors gracefully
      console.error(e);
      reply(`❌ An error occurred: ${e.message || e}`);
    }
  }
);


cmd(
  {
    pattern: "boom",
    react: "💥",
    category: "other",
    desc: "Sends multiple messages based on the number provided.",
    use: ".boom 15,Hi",
    filename: __filename,
  },
  async (conn, message, mek, { from, q, reply }) => {
    try {
      if (!q) {
        return await reply(
          "Please provide the number and text. Example: `.boom 100,hi`"
        );
      }

      const [count, text] = q.split(",");

      // Check if count is a valid number and text is provided
      if (isNaN(count) || !text) {
        return await reply(
          "Invalid format. Please use the format: `.boom 100,hi`"
        );
      }

      const repetitions = parseInt(count);

      // Send the repeated messages
      for (let i = 0; i < repetitions; i++) {
        await conn.sendMessage(from, { text: text }, { quoted: kee });
      }
    } catch (error) {
      console.log(error);
      await reply("🚩 *Error occurred while processing your request!*");
    }
  }
);

const { handleFile } = require("../Utils/fileHandler");

cmd(
  {
    pattern: "getdetails",
    alias: ["songname", "getsong"],
    react: "🎵",
    desc: "Get the song name from the audio or video file.",
    category: "other",
    use: ".getname",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, config,quoted, mnu, reply }) => {
    try {
      const fs = require("fs");
      const path = require("path");
      const os = require("os");

      // Check if the quoted message contains an audio or video file
      let q = m.quoted ? m.quoted : m;
      let mime = q.msg?.mimetype || "";

      if (!mime || (!mime.startsWith("audio/") && !mime.startsWith("video/"))) {
        throw "🌻 Please reply to an audio or video file.";
      }

      // Download the file (audio or video)
      let media = await q.download();
      if (!media) throw "Failed to download the media file. Please try again.";

      // Save the media file temporarily
      const tempFilePath = path.join(os.tmpdir(), "mediafile");

      fs.writeFileSync(tempFilePath, media);

      // Call the music recognition function
      const musicDataArray = await handleFile(tempFilePath);

      // Clean up the temporary audio file
      fs.unlinkSync(tempFilePath);

      // Check if we got any result from recognition
      if (!musicDataArray || musicDataArray.length === 0) {
        throw "🎶 Couldn't recognize the song. Please try with a valid audio or video file.";
      }

      // Extract music data from the first result
      const musicData = musicDataArray[0];

      // Prepare the song details to send with premium formatting
      const songName = `
> *${config.BOTNAME || "[❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}* 🎤
> *Song Information:*
> **Label**: ${musicData.label}
> **Title**: ${musicData.title}
> **Album**: ${musicData.album.name || "Unknown"}
> **Release Date**: ${musicData.release_date}
> **Artist(s)**: ${
        musicData.artists.map((artist) => artist.name).join(", ") || "Unknown"
      }

🔮 *Enjoy the music experience with ${config.BOTNAME || "[❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}!* 💎
`;

      // Send the recognized song details to the user
      await conn.sendMessage(from, { text: songName }, { quoted: kee });
    } catch (e) {
      // Handle errors gracefully
      console.error(e);
      reply(`❌ *An error occurred:* ${e.message || e}`);
    }
  }
);


cmd(
  {
    pattern: "ss",
    react: "🌐",
    desc: "Enhance an image using AI.",
    category: "other",
    use: ".ss https://www.google.com",
    filename: __filename,
  },
  async (conn, mek, m, { kee, from, quoted,config, q, reply }) => {
    try {
      if (!q) throw "🌟 Please give me a website url.";
      const response = `https://api.siputzx.my.id/api/tools/ssweb?url=${q}&theme=light&device=desktop`;

      await conn.sendMessage(
        from,
        {
          image: { url: response },
          caption: `✨ *SCREEN SHOT GET SUCCESFULY!* ✨\n\n> *⚡ Powered by - ©${config.BOTNAME || "[❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"} 💚*`,
        },
        { quoted: kee }
      );
    } catch (e) {
      console.error(e);
      reply(`❌ An error occurred: ${e.message || e}`);
    }
  }
);
