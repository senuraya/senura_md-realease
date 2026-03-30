const { fetchJson} = require("../Utils/functions");
const axios = require("axios");
const { cmd, commands } = require("../Utils/command");
const oce = "`";
const castem = require('../../customization')
let kee = ""
const cheerio = require('cheerio');
const qs = require('querystring'); // To easily build the final URL parameters

// ==================== UTILITY FUNCTIONS ====================
//import { Readable } from "stream";

function toNodeStream(webStream) {
    if (!webStream) return null;

    // Already Node stream
    if (typeof webStream.pipe === "function") return webStream;

    // Convert WebStream -> Node Stream
    return Readable.fromWeb(webStream);
}

function safeDestroy(stream) {
    try {
        if (!stream) return;
        if (typeof stream.destroy === "function") stream.destroy();
        else if (typeof stream.cancel === "function") stream.cancel();
    } catch {}
}
//=======================================
async function getPixelDrainStreamFromUrl(directUrl) {
    console.log(`Attempting to get PixelDrain stream from: ${directUrl}`);

    try {
        // --- 1. Check if we need to get direct link from API ---
        let finalUrl = directUrl;
        let cookies = {};
        let apiData = null;
        
        if (directUrl.includes('pixeldrain.com') || directUrl.includes('mega.nz')) {
            console.log(`[PixelDrain] Link detected: ${directUrl}`);
            
            try {
                // Clean the URL for API (for pixeldrain only)
                let cleanUrl = directUrl;
                if (directUrl.includes('pixeldrain.com') && directUrl.includes('?download')) {
                    cleanUrl = directUrl.split('?')[0];
                }
                
                // Get direct download link from API
                const apiUrl = `https://anju-md-api.vercel.app/api/genLink?url=${encodeURIComponent(cleanUrl)}&apikey=anjubot3`;
                console.log(`[PixelDrain] Calling API: ${apiUrl}`);
                
                const apiResponse = await fetch(apiUrl, { 
                    timeout: 30000 
                }).then(res => res.json());
                
                console.log(`[PixelDrain] API Response status:`, apiResponse.status);
                
                if (apiResponse.status === true && apiResponse.data?.directLink) {
                    apiData = apiResponse.data;
                    finalUrl = apiData.directLink;
                    
                    // Determine service name
                    const serviceName = directUrl.includes('pixeldrain.com') ? 'PixelDrain' : 'MEGA';
                    console.log(`[PixelDrain] Got ${serviceName} direct link: ${finalUrl}`);
                    
                    // Create cookies from API response
                    cookies = createPixelDrainCookies(apiData);
                    console.log(`[PixelDrain] Generated cookies`);
                    
                } else {
                    console.log(`[PixelDrain] API failed, using original URL`);
                    const serviceName = directUrl.includes('pixeldrain.com') ? 'PixelDrain' : 'MEGA';
                    console.log(`[PixelDrain] Error: ${apiResponse.message || 'Unknown error'}`);
                }
            } catch (apiError) {
                console.error(`[PixelDrain] API error:`, apiError.message);
            }
        }
        
        console.log(`[PixelDrain] Final URL to fetch: ${finalUrl}`);
        
        // --- 2. Get stream with appropriate method ---
        let response;
        if (finalUrl.includes('premiumdownloader.io/api/download/')) {
            console.log(`[PixelDrain] Using premiumdownloader with cookies`);
            
            // Get stream with cookies
            const cookieHeader = formatCookiesForHeaders(cookies);
            
            response = await axios({
                method: 'GET',
                url: finalUrl,
                responseType: 'stream',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Cookie': cookieHeader,
                    'Referer': 'https://premiumdownloader.io/',
                    'Accept': '*/*'
                },
                maxRedirects: 5
            });
        }
        
        // --- 3. Extract file information from headers ---
        const contentType = response.headers['content-type'] || 'application/octet-stream';
        const contentLength = response.headers['content-length'];
        const contentDisposition = response.headers['content-disposition'];
        
        let filename = "download";
        if (contentDisposition) {
            const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            if (match && match[1]) {
                filename = match[1].replace(/['"]/g, '');
            }
        }
        
        // If we have API data, use its filename
        if (apiData?.filename) {
            filename = apiData.filename;
        }
        
        // --- 4. Return the stream object ---
        return {
            stream: response.data,
            mimetype: contentType,
            filename: filename,
            size: contentLength ? parseInt(contentLength) : null,
            apiData: apiData,
            cookies: cookies
        };

    } catch (error) {
        // Error handling
        if (error.response) {
            console.error(`[PixelDrain] Error Status: ${error.response.status}. Response: ${error.response.statusText}`);
        } else {
            console.error("[PixelDrain] Critical error during download process:", error.message);
        }
        return null;
    }
}

// Helper function to create cookies from API response
function createPixelDrainCookies(apiData) {
    const timestamp = Date.now();
    const sessionId = `pd_session_${timestamp}_${Math.random().toString(36).substr(2, 9)}`;
    
    const cookies = {
        '_ga': `GA1.1.${Math.floor(Math.random() * 1000000000)}.${Math.floor(Date.now() / 1000)}`,
        '_ga_36HJ4T26R7': `GS2.1.s${timestamp}$o2$g1$t${timestamp}$j60$l0$h0`,
        'pd_session_id': sessionId,
        'pd_email': encodeURIComponent(apiData.emailUsed || `user_${Math.random().toString(36).substr(2, 8)}_${timestamp}@protonmail.com`),
        'pd_order_id': apiData.orderId || '',
        'pd_timestamp': timestamp.toString(),
        'pd_host': apiData.host || 'pixeldrain',
        'pd_ref': 'xproverce_bot',
        'pd_source': 'whatsapp_bot'
    };
    
    return cookies;
}

// Helper function to format cookies for headers
function formatCookiesForHeaders(cookieObj) {
    return Object.entries(cookieObj)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
}
//=======================================
async function getDriveStreamFromUrl(directUrl) {
    console.log(`Attempting initial request to: ${directUrl}`);

    try {
        // --- 1. Initial Request (Get the HTML warning page) ---
        // Get as arraybuffer/buffer so we can parse the content later
        let response = await axios({
            method: 'GET',
            url: directUrl,
            responseType: 'arraybuffer', 
            maxRedirects: 0, 
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': '*/*'
            }
        });
        
        const contentType = response.headers['content-type'];
        
        // --- 2. Check for HTML Warning Page ---
        if (!contentType || !contentType.includes('text/html')) {
            console.error("Expected HTML warning, but received media stream. Returning initial stream.");
             // If we somehow got the actual file, return it.
            return {
                stream: response.data,
                mimetype: contentType || 'video/mp4'
            };
        }
        
        console.log("Received HTML warning. Extracting form data...");
        
        const html = response.data.toString('utf8');
        const $ = cheerio.load(html);
        const form = $('#download-form'); // Target the download form
        
        if (form.length === 0) {
            console.error("Could not find download form in HTML. Structure may have changed.");
            return null;
        }

        const formAction = form.attr('action'); // "https://drive.usercontent.google.com/download"
        const formParams = {};

        // Extract ALL hidden input fields (id, export, confirm, uuid)
        form.find('input[type="hidden"]').each((i, el) => {
            const name = $(el).attr('name');
            const value = $(el).attr('value');
            if (name) {
                formParams[name] = value;
            }
        });
        
        // Ensure critical 'confirm' parameter is present
        if (!formParams.confirm) {
            console.error("Critical 'confirm' parameter not found in form.");
            return null;
        }

        // Build the final, authorized URL using all form parameters
        const queryString = qs.stringify(formParams);
        const finalDownloadUrl = `${formAction}?${queryString}`;
        
        console.log("Retrying download with full form parameters...");
        
        // --- 3. Second Request with Form Data (Final Download) ---
        // This request will follow the redirect to the actual file content
        response = await axios({
            method: 'GET',
            url: finalDownloadUrl,
            responseType: 'stream', // Request the final download as a stream
            maxRedirects: 5,        // Crucial: Follow the redirect chain to the media file
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': '*/*'
            }
        });

        // --- 4. Success: Return the Stream to Baileys ---
        //console.log(response.data);
        return {
            stream: response.data,
            mimetype: response.headers['content-type'] || 'video/mp4'
        };

    } catch (error) {
        // Axios error handling for connection issues, timeouts, or unexpected HTTP status codes
        if (error.response) {
            console.error(`Error Status: ${error.response.status}. Response Data: ${error.response.statusText}`);
        } else {
            console.error("Critical error during Google Drive download process:", error.message);
        }
        return null;
    }
}
async function getFileDetails(url) {
    try {
        let res = await axios.head(url);
        return {
            fileName: url.split("/").pop().split("?")[0],
            fileSize: res.headers["content-length"]
                ? (res.headers["content-length"] / (1024 * 1024)).toFixed(2)
                : null,
            fileType: res.headers["content-type"] || "application/octet-stream",
        };
    } catch (e) {
        return null;
    }
}

cmd(
  {
    pattern: "sinhalasub",
    react: "📑",
    category: "movie",
    desc: "Search movies on sinhalasub and get download links",
    use: ".sinhalasub deadpool",
    filename: __filename,
  },
  async (conn, m, mek, { from, q,config,baseurl,apikey,pushname, reply, prefix }) => {
    try {
      if (!q)
        return await reply("Please provide a search query! (e.g., Deadpool)");

      const apiUrl = `${baseurl}/api/sl-sub-search?query=${encodeURIComponent(
        q
      )}&apikey=${apikey}`;
      const response = await axios.get(apiUrl);
      const results = response.data.data;

      if (!results || results.length === 0) {
        return await reply(`No results found for: ${q}`);
      }

      const buttons = results.map((movie, index) => ({
        buttonId: prefix + `slsubinfo ${movie.link} & ${movie.type}`,
        buttonText: { displayText: `${oce}*${movie.title}*${oce}` },
        type: 1,
      }));

      let desc = `
${ config.BOTNAME ||"> [❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> ==========================`
let IMG;
if(config.isPremium === true){
IMG = castem.IMG
} else {
IMG = "https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg"
}
      const buttonMessage = {
        image: { url: IMG },
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
    } catch (error) {
      console.error("Error during search:", error);
      reply("An error occurred while searching!");
    }
  }
);


cmd(
  {
    pattern: "slsubinfo",
    react: "🎥",
    desc: "Get movie details and download links",
    category: "no",
    use: ".slsubinfo <movie_link>",
    filename: __filename,
  },
  async (
    conn,
    m,
    mek,
    { from, groupName,config, baseurl, apikey, isGroup, q, reply, prefix }
  ) => {
    try {
      if (!q) return await reply("Please provide a movie link!");

      let url = q.split(" & ")[0];
      let type = q.split(" & ")[1];

if(type == "Movie"){
      const apiUrl = `${baseurl}/api/slsub-info?apikey=${apikey}&url=${encodeURIComponent(
        url
      )}`;
      const response = await axios.get(apiUrl);
      const movieData = response.data.data;

      if (!movieData.downloadLinks || movieData.downloadLinks.length === 0) {
        return await reply("No download links found.");
      }
downloadMessag = `
${config.isPremium === true ? castem.MOVIETITLE : "> *『❤🩵 𝙎𝙚𝙣𝙪𝙧𝙖 𝙈𝘿 🩵❤"}
> =====================
> 🎬 *Title:* ${oce}${movieData.title}${oce}
> 📝 *Tagline:* ${oce}${movieData.metadata.tagline || "N/A"}${oce}
> ⭐ *IMDb:* ${oce}${movieData.metadata.imdbRating || "N/A"}${oce}
> 🗓️ *Year:* ${oce}${movieData.metadata.year}${oce}
> 🌍 *Country:* ${oce}${movieData.metadata.country}${oce}
> 🎭 *Genres:* ${oce}${movieData.metadata.genres.join(", ")}${oce}
> ⏱️ *Duration:* ${oce}${movieData.metadata.duration}${oce}
> 🗣️ *Language:* ${oce}${movieData.metadata.language}${oce}
> 👨‍💻 *Subtitle By:* ${oce}${movieData.metadata.subtitleAuthor}${oce}
> 🌐 *Subtitle Site:* ${oce}${movieData.metadata.subtitleSite}${oce}
> =====================
> 📌 *Description:*  
> ${oce}_${movieData.description}_${oce}`;

// Convert object-of-arrays → one big array
const allLinks = Object.values(movieData.downloadLinks)
  .flat()
  .map(link => ({
    ...link,
    server: link.provider || "Direct"
  }));

// Filter unwanted providers
const buttons = allLinks
  .filter(link =>
    !/telegram|telagram|t\.me|userdrive|usersdrive|drive\.user/i.test(link.server.toLowerCase())
  )
  .map((link, index) => {

    // Server name formatting
    let server = link.server.toLowerCase().includes("server-01")
      ? "Server-1"
      : link.server.toLowerCase().includes("server-02")
      ? "Server-2"
      : link.server;

    // Pixel / quality formatting
    let pixel = link.pixel
      ? `${link.pixel}px`
      : link.quality || "Unknown";

    return {
      buttonId: `${prefix}slsubdl ${link.link} & ${url} & ${link.quality}`,
      buttonText: {
        displayText: `${index + 1}. ${pixel} • ${server} • (${link.size})`,
      },
      type: 1,
    };
  });
      const buttonMessage = {
        image: { url: movieData.thumbnail },
        caption: downloadMessag,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };

      if (config.BTN_MSG === false) {
        return await conn.nonbuttonMessage(from, buttonMessage);
      } else {
        return await conn.newlist(from, buttonMessage);
      }
    } else {
const apiUrl = `${baseurl}/api/slsub-tvshow?apikey=${apikey}&episodes=${encodeURIComponent(url)}`;
const response = await axios.get(apiUrl);
const showData = response.data.data;

// Create TV show info message
let downloadMessage = `
${config.isPremium === true ? castem.MOVIETITLE : "> *『❤ 𝐒𝐄𝐍𝐔𝐑𝐀 𝐌𝐃 ❤ 𝐂𝐈𝐍𝐄𝐌𝐀 🎬』*"}
> =====================
> 📺 *Title:* ${oce}${showData.showInfo.title}${oce}
> ⭐ *Rating:* ${oce}${showData.showInfo.rating?.value || "N/A"} (${showData.showInfo.rating?.count || "0 votes"})${oce}
> 👁️ *Views:* ${oce}${showData.showInfo.views || "N/A"}${oce}
> 🎭 *Genres:* ${oce}${showData.showInfo.genres?.join(", ") || "N/A"}${oce}
> 🌍 *Country:* ${oce}${showData.showInfo.country || "N/A"}${oce}
> 🗓️ *Year:* ${oce}${showData.showInfo.year || "N/A"}${oce}
> 📡 *Networks:* ${oce}${showData.showInfo.networks?.join(", ") || "N/A"}${oce}
> 🎬 *Seasons:* ${oce}${showData.showInfo.seasons || 1}${oce}
> 📺 *Episodes:* ${oce}${showData.showInfo.episodes || "N/A"}${oce}
> 👥 *Creators:* ${oce}${showData.showInfo.creators?.slice(0, 3).join(", ") || "N/A"}${oce}
> =====================
> 📝 *Description:*  
> ${oce}_${showData.showInfo.description || "No description available."}_${oce}
> =====================`;

// Create season buttons
const seasonButtons = [];

// First check if we have seasonsList or seasonsWithEpisodes
if (showData.seasonsList && showData.seasonsList.length > 0) {
    // Use seasonsList for display
    showData.seasonsList.forEach((season, index) => {
        seasonButtons.push({
            buttonId: `${prefix}slsubseason ${index} & ${url}`,
            buttonText: {
                displayText: `Season ${season.number} ${season.episodeCount || ""}`
            },
            type: 1
        });
    });
} else if (showData.seasonsWithEpisodes && showData.seasonsWithEpisodes.length > 0) {
    // Use seasonsWithEpisodes if seasonsList is not available
    showData.seasonsWithEpisodes.forEach((season, index) => {
        const episodeCount = season.episodes?.length || 0;
        seasonButtons.push({
            buttonId: `${prefix}slsubseason ${index} & ${url}`,
            buttonText: {
                displayText: `Season ${season.seasonNumber} (${episodeCount} Episodes)`
            },
            type: 1
        });
    });
}
      const buttonMessage = {
        image: { url: showData.showInfo.poster },
        caption: downloadMessage,
        footer: config.FOOTER,
        buttons: seasonButtons,
        headerType: 4,
      };
      if (config.BTN_MSG === false) {
        return await conn.nonbuttonMessage(from, buttonMessage);
      } else {
        return await conn.newlist(from, buttonMessage);
      }
    }
    } catch (error) {
      console.error("Error fetching movie details:", error);
      await reply(
        "An error occurred while fetching movie details. Please try again."
      );
    }
  }
);


cmd(
  {
    pattern: "slsubseason",
    react: "⬇️",
    category: "no",
    desc: "Download movie subtitles",
    filename: __filename,
  },
  async (
    conn,
    m,
    mek,
    {
      from,
      q,
      isGroup,
      groupName,
      baseurl,
      config,
      apikey,
      isME,
      getThumbnailBuffer,
      reply,
    }
  ) => {
    try {
      if (!q) return await reply("Please provide a download link!");
      let dis = q.split(" & ");
      let url = dis[1];
      let index = dis[0];

      // Fetch the API data
      const response = await fetch(`${baseurl}/api/slsub-tvshow?apikey=${apikey}&episodes=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (!data.status || !data.data) {
        return await reply("Invalid response from API");
      }
      
      const showInfo = data.data.showInfo;
      const seasonsWithEpisodes = data.data.seasonsWithEpisodes;
      
      if (!seasonsWithEpisodes || seasonsWithEpisodes.length === 0) {
        return await reply("No episodes found for this season");
      }
      
      // Get episodes from the first season (you can modify this based on index if needed)
      const episodes = seasonsWithEpisodes[index].episodes;
      
      // Create buttons for each episode
      const buttons = [];
      
      episodes.forEach((episode, i) => {
        // Extract episode number from title or use index
        const epNum = i + 1;
        const epTitle = episode.title.split('Episode')[0] || `Episode ${epNum}`;
        
        buttons.push({
          buttonId: `${config.PREFIX}slsubepisode ${episode.link} & ${url}`,
          buttonText: { displayText: `Episode ${epNum}` },
          type: 1
        });
      });
      
      // Send message with episode buttons
      const buttonMessage = {
        image: { url:showInfo.poster}, 
        caption: `
*${showInfo.title}*
${showInfo.description}
*Episodes Available:* ${episodes.length}
Select an episode to get download links:`,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 1
      };
if (config.BTN_MSG === false) {
        return await conn.nonbuttonMessage(from, buttonMessage);
      } else {
        return await conn.newlist(from, buttonMessage);
      }
    } catch (error) {
      console.error("Error downloading movie:", error);
      await reply("An error occurred while downloading. Please try again.");
    }
  }
);


cmd(
  {
    pattern: "slsubepisode",
    react: "⬇️",
    category: "no",
    desc: "Download movie subtitles",
    filename: __filename,
  },
  async (
    conn,
    m,
    mek,
    {
      from,
      q,
      isGroup,
      groupName,
      baseurl,
      config,
      apikey,
      isME,
      getThumbnailBuffer,
      reply,
    }
  ) => {
    try {
      if (!q) return await reply("Please provide a download link!");
      let dis = q.split(" & ");
      let url = dis[1];
      let epurl = dis[0];
const apiUrl = `${baseurl}/api/slsub-tvshow?apikey=${apikey}&episodes=${encodeURIComponent(url)}`;
const response = await axios.get(apiUrl);
const showData = response.data.data;

// Create TV show info message
let downloadMessage = `
${config.isPremium === true ? castem.MOVIETITLE : "> *『❤ 𝐒𝐄𝐍𝐔𝐑𝐀 𝐌𝐃 ❤ 𝐂𝐈𝐍𝐄𝐌𝐀 🎬』*"}
> =====================
> 📺 *Title:* ${oce}${showData.showInfo.title}${oce}
> ⭐ *Rating:* ${oce}${showData.showInfo.rating?.value || "N/A"} (${showData.showInfo.rating?.count || "0 votes"})${oce}
> 👁️ *Views:* ${oce}${showData.showInfo.views || "N/A"}${oce}
> 🎭 *Genres:* ${oce}${showData.showInfo.genres?.join(", ") || "N/A"}${oce}
> 🌍 *Country:* ${oce}${showData.showInfo.country || "N/A"}${oce}
> 🗓️ *Year:* ${oce}${showData.showInfo.year || "N/A"}${oce}
> 📡 *Networks:* ${oce}${showData.showInfo.networks?.join(", ") || "N/A"}${oce}
> 🎬 *Seasons:* ${oce}${showData.showInfo.seasons || 1}${oce}
> 📺 *Episodes:* ${oce}${showData.showInfo.episodes || "N/A"}${oce}
> 👥 *Creators:* ${oce}${showData.showInfo.creators?.slice(0, 3).join(", ") || "N/A"}${oce}
> =====================
> 📝 *Description:*  
> ${oce}_${showData.showInfo.description || "No description available."}_${oce}
> =====================`;

let dllinksapi = await axios.get(`${baseurl}/api/slsub-tvshow?epiinfo=${epurl}`);
const movieData = dllinksapi.data.data; // Extract data from response

// Option 1: Use organizedLinks (already grouped by quality)
// OR Option 2: Use downloadLinks (grouped by server)

// I'll use organizedLinks since it's cleaner and already grouped by quality
const allLinks = Object.values(movieData.organizedLinks)
  .flat()
  .map(link => ({
    ...link,
    // Ensure server name is consistent
    server: link.provider || link.server || "Direct",
    // Extract quality type from quality field
    qualityType: link.quality.includes("480p") ? "480p" : 
                 link.quality.includes("720p") ? "720p" : 
                 link.quality.includes("1080p") ? "1080p" : 
                 link.quality
  }));

// Filter unwanted providers
const buttons = allLinks
  .filter(link => {
    const serverName = link.server.toLowerCase();
    return !/telegram|telagram|t\.me|userdrive|usersdrive|drive\.user/i.test(serverName);
  })
  .map((link, index) => {
    // Server name formatting
    let server = link.server.toLowerCase().includes("dlserver-01") ? "Server-1" :
                 link.server.toLowerCase().includes("dlserver-02") ? "Server-2" :
                 link.server;

    // Quality/pixel formatting - use qualityType if available
    let pixel = link.qualityType || 
               (link.quality ? link.quality.replace(/[^0-9]/g, "") : "Unknown");
    
    // Add 'px' suffix if it's a number
    pixel = /^\d+$/.test(pixel) ? `${pixel}px` : pixel;

    // Clean up server name for display
    let displayServer = server
      .replace(/dlserver/i, "Server")
      .replace(/usersdrive/i, "Direct")
      .replace(/^\w/, c => c.toUpperCase()); // Capitalize first letter

    return {
      buttonId: `${config.PREFIX}slsubdl ${link.link} & ${url} & ${link.qualityType || link.quality} & ${showData.showInfo.poster}`,
      buttonText: {
        displayText: `${index + 1}. ${pixel} • ${displayServer} • (${link.size})`,
      },
      type: 1,
    };
  });
      const buttonMessage = {
        image: { url: showData.showInfo.poster },
        caption: downloadMessage,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };

      if (config.BTN_MSG === false) {
        return await conn.nonbuttonMessage(from, buttonMessage);
      } else {
        return await conn.newlist(from, buttonMessage);
      }
    } catch (error) {
      console.error("Error downloading movie:", error);
      await reply("An error occurred while downloading. Please try again.");
    }
  }
);

cmd(
  {
    pattern: "slsubdl",
    react: "⬇️",
    category: "no",
    desc: "Download movie subtitles",
    filename: __filename,
  },
  async (
    conn,
    m,
    mek,
    {
      from,
      q,
      isGroup,
      groupName,
      baseurl,
      config,
      apikey,
      isME,
      getThumbnailBuffer,
      reply,
    }
  ) => {
    try {
      if (!q) return await reply("Please provide a download link!");
      let dis = q.split(" & ");
      let ur = dis[0];
      let info = dis[1];
      let quality = dis[2];
if(info.includes("tvshow")){
const apiUrl = `${baseurl}/api/slsub-tvshow?episodes=${encodeURIComponent(
        info
      )}`;
      const response = await axios.get(apiUrl);
      const movieData = response.data.data.showInfo;
      const apiUrl1 = `${baseurl}/api/ssub-dl?apikey=${apikey}&url=${encodeURIComponent(
        ur
      )}`;
      const responses = await axios.get(apiUrl1);
      let url = responses.data.data.downloadLink;
      let sendtoList = config.MOVIE_JID.length > 0 ? config.MOVIE_JID : [from]; // Use MOVIE_JID if provided, else fallback to `from`.

      // Send the movie to each JID one by one, waiting after each send
      for (let sendto of sendtoList) {
        try {
          const isGroup = sendto.endsWith("@g.us");
          const groupMetadata = isGroup
            ? await conn.groupMetadata(sendto).catch((e) => {})
            : "";
          // React with a thumbs-up to indicate the download process started
          await conn.sendMessage(from, {
            react: { text: "⬆️", key: mek.key },
          });

          // Send the movie subtitle download file

let cap =  `
${config.isPremium === true ? castem.MOVIETITLE : "> *『❤ 𝐒𝐄𝐍𝐔𝐑𝐀 𝐌𝐃 ❤ 𝐂𝐈𝐍𝐄𝐌𝐀 🎬』*"}
> ${movieData.title}
> ${oce}${quality}${oce}
${config.FOOTER}`

          await conn.sendMessage(
            sendto,
            {
              document: { url: url },
              mimetype: "video/mkv",
              fileName: `${config.MNAME} | ${movieData.title}.mkv`,
              caption: cap,
              jpegThumbnail: await getThumbnailBuffer(movieData.poster),
            }
          );

          await new Promise((resolve) => setTimeout(resolve, 3000));
        } catch (errSend) {
          console.error(`Error sending to ${sendto}:`, errSend);
        }
      }
      // React with a checkmark to indicate successful download
      await conn.sendMessage(from, {
        react: { text: "✅", key: mek.key },
      });
}else {
      const apiUrl = `${baseurl}/api/slsub-info?apikey=${apikey}&url=${encodeURIComponent(
        info
      )}`;
      const response = await axios.get(apiUrl);
      const movieData = response.data.data;
      const apiUrl1 = `${baseurl}/api/ssub-dl?apikey=${apikey}&url=${encodeURIComponent(
        ur
      )}`;
      const responses = await axios.get(apiUrl1);
      let url = responses.data.data.downloadLink;
      let sendtoList = config.MOVIE_JID.length > 0 ? config.MOVIE_JID : [from]; // Use MOVIE_JID if provided, else fallback to `from`.

      // Send the movie to each JID one by one, waiting after each send
      for (let sendto of sendtoList) {
        try {
          const isGroup = sendto.endsWith("@g.us");
          const groupMetadata = isGroup
            ? await conn.groupMetadata(sendto).catch((e) => {})
            : "";
          const groupName = isGroup ? groupMetadata.subject : "";

          let downloadMessage;
if(config.isPremium === true){
  if (isGroup) {
    downloadMessage = `
${castem.SINHALASUB(movieData,oce)}
${castem.GROUP(groupName, config,oce)}
━━━━━━━━━━━━━━━
${config.FOOTER}`.trim();
  } else {
    downloadMessage = `
${castem.SINHALASUB(movieData,oce)}
━━━━━━━━━━━━━━━
${config.FOOTER}`.trim();
  }
}else{
          if (isGroup) {
            downloadMessage = `
${config.isPremium === true ? castem.MOVIETITLE : "> *『❤ 𝐒𝐄𝐍𝐔𝐑𝐀 𝐌𝐃 ❤ 𝐂𝐈𝐍𝐄𝐌𝐀 🎬』*"}
> =====================
> 🎬 *Title:* ${oce}${movieData.title}${oce}
> 📝 *Tagline:* ${oce}${movieData.metadata.tagline || "N/A"}${oce}
> ⭐ *IMDb:* ${oce}${movieData.metadata.imdbRating || "N/A"}${oce}
> 🗓️ *Year:* ${oce}${movieData.metadata.year}${oce}
> 🌍 *Country:* ${oce}${movieData.metadata.country}${oce}
> 🎭 *Genres:* ${oce}${movieData.metadata.genres.join(", ")}${oce}
> ⏱️ *Duration:* ${oce}${movieData.metadata.duration}${oce}
> 🗣️ *Language:* ${oce}${movieData.metadata.language}${oce}
> 👨‍💻 *Subtitle By:* ${oce}${movieData.metadata.subtitleAuthor}${oce}
> 🌐 *Subtitle Site:* ${oce}${movieData.metadata.subtitleSite}${oce}
> =====================
> 📨 *𝙎𝙝𝙖𝙧𝙚𝙙 𝙄𝙣:* ${oce}${groupName}${oce}
> 🛡️ *𝘼𝙙𝙢𝙞𝙣:* ${oce}${config.MNAME}${oce}
> 📌 *Description:*  
> ${oce}_${movieData.description}_${oce}
━━━━━━━━━━━━━━━
${config.FOOTER}`.trim();
          } else {
            downloadMessage = `
${config.isPremium === true ? castem.MOVIETITLE : "> *『❤ 𝐒𝐄𝐍𝐔𝐑𝐀 𝐌𝐃 ❤ 𝐂𝐈𝐍𝐄𝐌𝐀 🎬』*"}
> =====================
> 🎬 *Title:* ${oce}${movieData.title}${oce}
> 📝 *Tagline:* ${oce}${movieData.metadata.tagline || "N/A"}${oce}
> ⭐ *IMDb:* ${oce}${movieData.metadata.imdbRating || "N/A"}${oce}
> 🗓️ *Year:* ${oce}${movieData.metadata.year}${oce}
> 🌍 *Country:* ${oce}${movieData.metadata.country}${oce}
> 🎭 *Genres:* ${oce}${movieData.metadata.genres.join(", ")}${oce}
> ⏱️ *Duration:* ${oce}${movieData.metadata.duration}${oce}
> 🗣️ *Language:* ${oce}${movieData.metadata.language}${oce}
> 👨‍💻 *Subtitle By:* ${oce}${movieData.metadata.subtitleAuthor}${oce}
> 🌐 *Subtitle Site:* ${oce}${movieData.metadata.subtitleSite}${oce}
> =====================
> 📌 *Description:*  
> ${oce}_${movieData.description}_${oce}
━━━━━━━━━━━━━━━
${config.FOOTER}`.trim();
          }
}
          // React with a thumbs-up to indicate the download process started
          await conn.sendMessage(from, {
            react: { text: "⬆️", key: mek.key },
          });

          // Send the movie data and the image to the specified recipient
          await conn.sendMessage(sendto, {
            image: { url: movieData.thumbnail },
            caption: downloadMessage,
          });
let cap =  `
${config.isPremium === true ? castem.MOVIETITLE : "> *『❤ 𝐒𝐄𝐍𝐔𝐑𝐀 𝐌𝐃 ❤ 𝐂𝐈𝐍𝐄𝐌𝐀 🎬』*"}
> ${movieData.title}
> ${oce}${quality}${oce}
${config.FOOTER}`

          // Send the movie subtitle download file
          await conn.sendMessage(
            sendto,
            {
              document: { url: url },
              mimetype: "video/mkv",
              fileName: `${config.MNAME} | ${movieData.title}.mkv`,
              caption: cap,
              jpegThumbnail: await getThumbnailBuffer(movieData.thumbnail),
            }
          );

          await new Promise((resolve) => setTimeout(resolve, 3000));
        } catch (errSend) {
          console.error(`Error sending to ${sendto}:`, errSend);
        }
      }
      // React with a checkmark to indicate successful download
      await conn.sendMessage(from, {
        react: { text: "✅", key: mek.key },
      });
    }
    } catch (error) {
      console.error("Error downloading movie:", error);
      await reply("An error occurred while downloading. Please try again.");
    }
  }
);


cmd(
  {
    pattern: "cine",
    alias: ["cinesubz"],
    react: "🎬",
    desc: "Search and download movies from CineSubz",
    category: "movie",
    use: ".cine deadpool",
    filename: __filename,
  },
  async (
    conn,
    m,
    mek,
    {
      from,
      q,
      mnu,
      isME,
      config,
      baseurl,
      pushname,
      apikey,
      getThumbnailBuffer,
      senderNumber,
      reply,
      prefix,
    }
  ) => {
    try {
      // Validate input query
      if (!q) {
        return await reply(
          "Please provide a movie name to search! (e.g., Avatar)"
        );
      }

      // Step 1: Search movies from CineSubz API
      const searchResponse = await fetchJson(
        `${baseurl}/api/cinesubz?apikey=${apikey}&q=${encodeURIComponent(q)}`
      );
      const searchData = searchResponse;

      if (!searchData.status) {
        return await reply(`No results found for: "${q}"`);
      }
let desc = `
${ config.BOTNAME ||"> [❤ 𝐒𝐄𝐍𝐔𝐑𝐀 𝐌𝐃 ❤ 𝐂𝐈𝐍𝐄𝐌𝐀 🎬]"}
> 𝙷𝚎𝚕𝚕𝚘 𝚃𝚑𝚎𝚛𝚎 *${pushname}*
> ==========================`
let IMG;
if(config.isPremium === true){
IMG = castem.IMG
} else {
IMG = "https://i.ibb.co/VWy8DK06/Whats-App-Image-2025-12-09-at-17-38-33-fd4d4ecd.jpg"
}
const searchResults = searchData.data.data;
      // Step 2: Send search results with buttons
      const buttons = searchResults.map((result, index) => ({
        buttonId: `${prefix}movie ${result.link} & ${result.type}`, // Generate unique buttonId for each movie
        buttonText: { displayText: `${result.title} (${result.year})` },
        type: 1,
      }));

      const buttonMessage = {
        image: { url: IMG },
        caption: desc,
        buttons: buttons,
        footer: config.FOOTER, // Ensure this is set in your config
        headerType: 4,
      };

      // Send button message with the search results
      if (config.BTN_MSG === false) {
        return await conn.nonbuttonMessage(from, buttonMessage);
      } else {
        return await conn.newlist(from, buttonMessage);
      }
    } catch (e) {
      console.error("Error during CineSubz command execution:", e);
      reply("An error occurred while processing your request.");
    }
  }
);

cmd(
  {
    pattern: "movie",
    alias: [],
    react: "🎬",
    desc: "Select movie for download",
    category: "no",
    use: ".movie 1",
    filename: __filename,
  },
  async (
    conn,
    m,
    mek,
    {
      from,
      q,
      mnu,
      apikey,
      baseurl,
      config,
      pushname,
      isME,
      getThumbnailBuffer,
      senderNumber,
      reply,
      prefix,
    }
  ) => {
    try {
                if (!q) return;
                let url = q.split(" & ")[0];
                let type = q.split(" & ")[1];
                
                if (type === "Movie") {
                    const movieResponse = await fetchJson(`${baseurl}/api/cinesubz?apikey=${apikey}&url=${encodeURIComponent(url)}`);
                    const movieData = movieResponse;
                    if (!movieData.status || !movieData.data.data.downloadLinks) return await reply("Error fetching download links for this movie.");
                    
                    const { title, thumbnail, description, metadata, downloadLinks } = movieData.data.data;
                    const rating = movieData.data.data.ratings?.imdb || { value: "N/A" };
                    const tagline = movieData.data.data.tagline || "N/A";
                    const genres = metadata.genres || [];
                    let dl_links = downloadLinks;
                    let image = thumbnail;
                    
                    // Create sections for download options
    const sections = [
        {
            title: "📥 PixelDrain Download",
            rows: dl_links.map(link => ({
                title: `⬇️ ${link.quality}`,
                description: `Size: ${link.size}`,
                rowId: `${config.PREFIX}download ${link.link} & ${url} & ${link.quality} & pix`
            }))
        },
        {
            title: "☁️ Google Drive Download",
            rows: dl_links.map(link => ({
                title: `☁️ ${link.quality}`,
                description: `Size: ${link.size}`,
                rowId: `${config.PREFIX}download ${link.link} & ${url} & ${link.quality} & google`
            }))
        }
    ];
    
    let downloadMessage = `${config.MOVIETITLE || "> *『❤ 𝐒𝐄𝐍𝐔𝐑𝐀 𝐌𝐃 ❤ 𝐂𝐈𝐍𝐄𝐌𝐀 🎬』*"}\n> =====================\n> 🎬 *Title:* ${oce}${title}${oce}\n> 📝 *Tagline:* ${oce}${tagline}${oce}\n> ⭐ *IMDb:* ${oce}${rating.value}${oce}\n> 🗓️ *Year:* ${oce}${metadata.year}${oce}\n> 🌍 *Country:* ${oce}${metadata.country}${oce}\n> 🎭 *Genres:* ${oce}${genres.join(", ")}${oce}\n> ⏱️ *Duration:* ${oce}${metadata.runtime || "N/A"}${oce}\n> 🗣️ *Language:* ${oce}${metadata.language}${oce}\n> 👨‍💻 *Subtitle By:* ${oce}${metadata.subtitleBy || "N/A"}${oce}\n> =====================`;
    
    const listMessage = {
        caption: downloadMessage,
        image: { url: image },
        footer: config.FOOTER || "Select download option:",
        title: "🎬 Movie Download",
        buttonText: "📥 Download Options",
        sections: sections
    };
    
    // Send with listMessage2
    return await conn.listMessage2(from, listMessage, null);
                } else if (type === "TV Show") {
                    const movieResponse = await fetchJson(`${baseurl}/api/cinesubz?apikey=${apikey}&tvseries=${encodeURIComponent(url)}`);
                    const movieData = movieResponse;
                    if (!movieData.status || !movieData.data?.data?.seasons) return await reply("Error fetching The TV series.");
                    
                    const tvData = movieData.data.data;
                    const { title, poster, metadata, seasons } = tvData;
                    const { year, genres } = metadata;
                    const rating = tvData.ratings?.imdb || "N/A";
                    
                    const buttons = seasons.map((season, index) => ({
                        buttonId: config.PREFIX + `cineshow ${index} & ${url}`,
                        buttonText: { displayText: `${season.seasonTitle}` },
                        type: 1,
                    }));
                    
                    const seriesMessag = `${config.MOVIETITLE || "> *『❤ 𝐒𝐄𝐍𝐔𝐑𝐀 𝐌𝐃 ❤ 𝐂𝐈𝐍𝐄𝐌𝐀 🎬 』*"}\n> =====================\n> 🎬 *Title:* ${oce}${title}${oce}\n> ⭐ *IMDb:* ${oce}${rating}${oce}\n> 🗓️ *Year:* ${oce}${year}${oce}\n> 🎭 *Genres:* ${oce}${genres.join(", ")}${oce}\n> 📋 *Seasons:* ${oce}${seasons.length}${oce}\n> 📊 *Total Episodes:* ${oce}${seasons.reduce((total, season) => total + season.episodes.length, 0)}${oce}\n> =====================\n> 📌 *Series Info:*  \n> ${oce}_${metadata.seriesInfo || "No additional information available."}_${oce}`;
                    
                    const buttonMessage = {
                        caption: seriesMessag,
                        image: { url: poster },
                        buttons: buttons,
                        footer: config.FOOTER,
                        headerType: 4,
                    };
                    
                        return await conn.nonbuttonMessage(from, buttonMessage);
                }
            } catch (e) {
                console.error("Error during movie selection:", e);
                reply("An error occurred while processing your request.");
            }
  }
);

cmd(
  {
    pattern: "cineshow",
    alias: [],
    react: "🎬",
    desc: "Select movie for download",
    category: "no",
    use: ".movie 1",
    filename: __filename,
  },
  async (
    conn,
    m,
    mek,
    {
      from,
      q,
      mnu,
      apikey,
      baseurl,
      isME,
      pushame,
      config,
      getThumbnailBuffer,
      senderNumber,
      reply,
      prefix,
    }
  ) => {
    try {
      if (!q) return;
let index = q.split(" & ")[0];
let url = q.split(" & ")[1];
const movieResponse = await fetchJson(
  `${baseurl}/api/cinesubz?apikey=${apikey}&tvseries=${encodeURIComponent(url)}`
);
const movieData = movieResponse;

// Check if movieData.data.data exists and has seasons
if (!movieData.status || !movieData.data?.data?.seasons) {
  return await reply("Error fetching The TV series.");
}

const tvData = movieData.data.data;
const { title, poster, seasons } = tvData;

// Check if the requested season exists
if (!seasons[index]) {
  return await reply("Season not found.");
}

const selectedSeason = seasons[index];

// Get season information
const seasonTitle = selectedSeason.seasonTitle;
const episodeCount = selectedSeason.episodes.length;

// Create formatted message
const seasonMessag = `
${config.MOVIETITLE || "> *『❤ 𝐒𝐄𝐍𝐔𝐑𝐀 𝐌𝐃 ❤ 𝐂𝐈𝐍𝐄𝐌𝐀 🎬』*"}
> =====================
> 🎬 *Series:* ${oce}${title}${oce}
> 📺 *Season:* ${oce}${seasonTitle}${oce}
> 📊 *Episodes:* ${oce}${episodeCount}${oce}
> =====================
> 📌 *Available Episodes:*`;

// Step 4: Show download options with buttons
const buttons = selectedSeason.episodes.map((episode, epIndex) => ({
  buttonId: prefix + `downloadshowquality ${episode.episodeLink} & ${url} & ${poster}`,
  buttonText: {
    displayText: `EP${episode.episodeNumber} - ${episode.episodeTitle}`,
  },
  type: 1,
}));

// Add your manual button (example: Download All button)
buttons.push({
  buttonId: prefix + `downloadallshowquality ${index} & ${url} & ${poster}`,
  buttonText: { displayText: "📥 DOWNLOAD ALL EPISODES" },
  type: 1,
});

const buttonMessage = {
  caption: seasonMessag,
  image: { url: poster },
  buttons: buttons,
  footer: config.FOOTER,
  headerType: 4,
};

if (config.BTN_MSG === false) {
  return await conn.nonbuttonMessage(from, buttonMessage);
} else {
  return await conn.newlist(from, buttonMessage);
}
    } catch (e) {
      console.error("Error during movie selection:", e);
      reply("An error occurred while processing your request.");
    }
  }
);

cmd(
  {
    pattern: "downloadshowquality",
    alias: [],
    react: "🎬",
    desc: "Select movie for download",
    category: "no",
    use: ".movie 1",
    filename: __filename,
  },
  async (
    conn,
    m,
    mek,
    {
      from,
      q,
      mnu,
      apikey,
      baseurl,
      config,
      pushname,
      isME,
      getThumbnailBuffer,
      senderNumber,
      reply,
      prefix,
    }
  ) => {
    try {
                if (!q) return;
                let url = q.split(" & ")[0];
                let image = q.split(" & ")[2];
                
                const movieResponse = await fetchJson(`${baseurl}/api/cinesubz?apikey=${apikey}&tvdl=${encodeURIComponent(url)}`);
                if (!movieResponse.status) return await reply("Error fetching episode information.");
                
                const movieData = movieResponse.data;
                const episodeInfo = movieData.episodeInfo;
                const downloadLinks = movieData.downloadLinks;
                if (!downloadLinks || !downloadLinks.direct) return await reply("No download links available for this episode.");
                
                const qualities = ["480p", "720p", "1080p"];
                // Use listMessage2
        const sections = [
            {
                title: "📥 PixelDrain Download",
                rows: qualities.map((quality) => {
                    const linkData = downloadLinks.direct[quality];
                    if (!linkData || !linkData.link) {
                        return {
                            title: `❌ ${quality}`,
                            description: "NOT AVAILABLE",
                            rowId: `noshow ${quality} & ${url}`
                        };
                    }
                    return {
                        title: `⬇️ ${quality}`,
                        description: `Size: ${linkData.size || "N/A"}`,
                        rowId: `${config.PREFIX}downloadshow ${linkData.link} & ${url} & ${quality} & ${image} & pix`
                    };
                })
            },
            {
                title: "☁️ Google Drive Download",
                rows: qualities.map((quality) => {
                    const linkData = downloadLinks.direct[quality];
                    if (!linkData || !linkData.link) {
                        return {
                            title: `❌ ${quality}`,
                            description: "NOT AVAILABLE",
                            rowId: `noshow ${quality} & ${url}`
                        };
                    }
                    return {
                        title: `☁️ ${quality}`,
                        description: `Size: ${linkData.size || "N/A"}`,
                        rowId: `${config.PREFIX}downloadshow ${linkData.link} & ${url} & ${quality} & ${image} & google`
                    };
                })
            }
        ];
    
        const episodeMessag = `${config.MOVIETITLE || "> *『❤ 𝐒𝐄𝐍𝐔𝐑𝐀 𝐌𝐃 ❤ 𝐂𝐈𝐍𝐄𝐌𝐀 🎬』*"}\n> =====================\n> 🎬 *Series:* ${oce}${episodeInfo.series}${oce}\n> 📺 *Episode:* ${oce}${episodeInfo.seasonEpisode}${oce}\n> 🏷️ *Title:* ${oce}${episodeInfo.episodeTitle}${oce}\n> 📅 *Date:* ${oce}${episodeInfo.date}${oce}\n> ⭐ *Rating:* ${oce}${episodeInfo.rating.value}/10${oce}\n> =====================\n> 📌 *Available Download Links:*`;
    
        const listMessage = {
            caption: episodeMessag,
            image: { url: image },
            footer: config.FOOTER,
            title: "📺 Episode Download",
            buttonText: "📥 Download Options",
            sections: sections
        };
    
        return await conn.listMessage2(from, listMessage, null);
            } catch (e) {
                console.error("Error during movie selection:", e);
                reply("An error occurred while processing your request.");
            }
  }
);

cmd(
  {
    pattern: "download",
    alias: [],
    react: "⬇️",
    category: "no",
    desc: "Download selected movie",
    use: ".download 1 & <url> & 480p",
    filename: __filename,
  },
  async (
    conn,
    m,
    mek,
    { from, q, baseurl,pushname,config, apikey, getThumbnailBuffer, reply }
  ) => {
    try {
let dis = q.split(" & ");
let dl = dis[0];
let url = dis[1];
const quality = dis[2] || "480p";
let type = dis[3];

// Notify user that we're fetching movie info
await conn.sendMessage(from, {
  text: "🔍 Fetching movie information...",
});

const movieResponse = await fetchJson(
  `${baseurl}/api/cinesubz?apikey=${apikey}&url=${encodeURIComponent(url)}`
);
const movieData = movieResponse?.data?.data;

if (!movieData?.downloadLinks) {
  return await reply("❌ Error fetching download links for this movie.");
}

const { title, thumbnail, tagline, description, metadata } = movieData;

// Get rating properly from API response
const rating = movieData.ratings?.imdb || { value: movieData.rating?.value || "N/A" };
const genres = metadata?.genres ? metadata.genres.filter(g => !g.startsWith(".")).join(", ") : "N/A";

let downloadUrl;
let attempt = 0;
const maxAttempts = 10;

// Notify user we're getting download link
await conn.sendMessage(from, {
  text: "⏳ Getting download link... This may take a few seconds.",
});

while (!downloadUrl && attempt < maxAttempts) {
    try {
        const movieLinkResponse = await fetchJson(`${baseurl}/api/cinesubz?apikey=${apikey}&dllink=${encodeURIComponent(dl)}&type=${type}`);
        const movieLinkData = movieLinkResponse?.data;
        console.log(movieLinkData);
        if (Array.isArray(movieLinkData?.Links)) {
            if (type === "google" || type === "gdrive") {
                // Find Google Drive link
                const googleLink = movieLinkData.Links.find(l => 
                    l.type === "Google" || 
                    typeof l.link === "string" || 
                    l.link.includes("drive.usercontent.google.com")
                );
                
                if (googleLink?.link) {
                    downloadUrl = googleLink.link;
                    console.log(`✓ Got Google Drive link...`);
                    break;
                } else {
                    console.log(`✗ No Google Drive link found`);
                }
            } 
            else if (type === "pixel" || type === "pixeldrain" || type === "pix") {
                // Find PixelDrain link
                const pixelLink = movieLinkData.Links.find(l => 
                    l.type.toLowerCase().includes("pixel") || 
                    (typeof l.link === "string" || l.link.includes("pixeldrain.com"))
                );
                
                if (pixelLink?.link) {
                    downloadUrl = pixelLink.link;
                    console.log(`✓ Got PixelDrain link...`);
                    break;
                } else {
                    console.log(`✗ No PixelDrain link found`);
                }
            }
            else {
                // Fallback: get first available link
                const firstLink = movieLinkData.Links.find(l => typeof l.link === "string" && l.link);
                if (firstLink?.link) {
                    downloadUrl = firstLink.link;
                    console.log(`✓ Got ${firstLink.type || 'download'} link...`);
                    break;
                }
            }
        }
    } catch (error) {
        console.log(`Attempt ${attempt + 1} failed:`, error);
    }
    attempt++;
}
            if (!downloadUrl) return await reply("❌ Failed to retrieve a valid download link after 10 attempts.");
            let mediaData;
            let docs;
            if(downloadUrl.includes('drive.usercontent.google.com')){
            mediaData = await getDriveStreamFromUrl(downloadUrl);
            docs = { stream : mediaData.stream }
            } else if (downloadUrl.includes('pixeldrain')){
            docs = { url : downloadUrl }
            }


if (!downloadUrl) {
  return await reply("❌ Failed to retrieve a valid download link after 10 attempts.");
}

// Create formatted info message like in previous examples
let infoMessag;
if(config.isPremium === false) {
  infoMessag = `
${config.MOVIETITLE || "> *『❤ 𝐒𝐄𝐍𝐔𝐑𝐀 𝐌𝐃 ❤ 𝐂𝐈𝐍𝐄𝐌𝐀 🎬 』*"}
> =====================
> 🎬 *Title:* ${oce}${title}${oce}
> 📝 *Tagline:* ${oce}${tagline || "N/A"}${oce}
> ⭐ *IMDb:* ${oce}${typeof rating === 'object' ? rating.value : rating}${oce}
> 🗓️ *Year:* ${oce}${metadata?.year || "N/A"}${oce}
> 🌍 *Country:* ${oce}${metadata?.country || "N/A"}${oce}
> 🎭 *Genres:* ${oce}${genres}${oce}
> ⏱️ *Duration:* ${oce}${metadata?.runtime || metadata?.duration || "N/A"}${oce}
> 🗣️ *Language:* ${oce}${metadata?.language || "English"}${oce}
> 👨‍💻 *Subtitle By:* ${oce}${metadata?.subtitleBy || "N/A"}${oce}
> 📊 *Quality:* ${oce}${quality}${oce}
> =====================
> 📌 *Description:*  
> ${oce}_${description || "No description available."}_${oce}`;
} else {
  infoMessag = castem.CINESUBZ(title, metadata, rating,tagline,genres,quality,description,oce)
}
// Notify user that upload is starting
await conn.sendMessage(from, {
  text: "✅ Download link obtained! Starting upload...",
  react: { text: "⬆️", key: mek.key },
});

// Get the list of receivers
let sendtoList = config.MOVIE_JID?.length > 0 ? config.MOVIE_JID : [from];

for (let sendto of sendtoList) {
  try {
    const isGroup = sendto.endsWith("@g.us");
    let groupName = "";
    
    if (isGroup) {
      const groupMetadata = await conn.groupMetadata(sendto).catch(() => {});
      groupName = groupMetadata?.subject || "";
    }

    // Add group info to caption if it's a group
    let finalCaption = infoMessag;
    let addcap;
    if (isGroup) {
if(config.isPremium === true){
    addcap = castem.GROUP(groupName,config,oce)
} else {
    addcap = `
> 📨 *𝙎𝙝𝙖𝙧𝙚𝙙 𝙄𝙣:* ${oce}${groupName}${oce}
> 🛡️ *𝘼𝙙𝙢𝙞𝙣:* ${oce}${config.MNAME}${oce}`;
}
      finalCaption += addcap
    }
    
    finalCaption += `
${config.FOOTER}`;

    // Send movie info with thumbnail
    await conn.sendMessage(sendto, {
      image: { url: thumbnail },
      caption: finalCaption,
    });

    let cap = `
🎬 *${title}*
📊 Quality: ${quality}
📁 Source: ${config.MNAME || "CineSubz"}
${config.FOOTER}`
    // Send the actual movie file
    await conn.sendMessage(sendto, {
      document: docs,
      mimetype: "video/mp4",
      jpegThumbnail: await getThumbnailBuffer(thumbnail),
      fileName: `${config.MNAME || "CineSubz"} - ${title.replace(/[<>:"/\\|?*]/g, '_')} [${quality}].mp4`,
      caption: cap,
    });

    // Wait 3 seconds before sending to next JID
    await new Promise((resolve) => setTimeout(resolve, 3000));
  } catch (errSend) {
    console.error(`Error sending to ${sendto}:`, errSend);
    
    // Notify user about the error
    if (sendto === from) {
      await conn.sendMessage(from, {
        text: `❌ Error sending to ${isGroup ? 'group' : 'user'}: ${errSend.message}`,
      });
    }
  }
}

// Final success notification
await conn.sendMessage(from, {
  react: { text: "✅", key: mek.key },
  text: "✅ Movie has been successfully sent!",
});

return await reply("✅ Movie has been sent to the selected group(s)/user(s)!");
    } catch (err) {
      console.error("❌ Error during download process:", err);
      return reply("⚠️ An error occurred while processing your request.");
    }
  }
);

cmd(
  {
    pattern: "downloadshow",
    alias: [],
    react: "⬇️",
    desc: "Download selected movie",
    category: "no",
    use: ".download 1 1",
    filename: __filename,
  },
  async (
    conn,
    m,
    mek,
    {
      from,
      q,
      mnu,
      isGroup,
      groupName,
      config,
      baseurl,
      apikey,
      isME,
      getThumbnailBuffer,
      senderNumber,
      reply,
      prefix,
    }
  ) => {
    try {
let dis = q.split(" & ");
let movieData = dis[0];
let url = dis[1];
let quality = dis[2];
let poto = dis[3];
let type = dis[4];
console.log(poto)

// Notify user that we're fetching episode info
await conn.sendMessage(from, {
  text: "🔍 Fetching episode information...",
});

const movieRespons = await fetchJson(
  `${baseurl}/api/cinesubz?apikey=${apikey}&tvdl=${encodeURIComponent(url)}`
);

if (!movieRespons.status) {
  return await reply("❌ Error fetching episode information.");
}

let movieResponse = movieRespons.data;
let episodeInfo = movieResponse.episodeInfo;

// Notify user we're getting download link
await conn.sendMessage(from, {
  text: "⏳ Getting download link... This may take a few seconds.",
});

let downloadUrl;
let attempt = 0;
const maxAttempts = 10;

while (!downloadUrl && attempt < maxAttempts) {
    try {
        const movieLinkResponse = await fetchJson(`${baseurl}/api/cinesubz?apikey=${apikey}&dllink=${encodeURIComponent(movieData)}&type=${type}`);
        const movieLinkData = movieLinkResponse?.data;
        console.log(movieLinkData);
        if (Array.isArray(movieLinkData?.Links)) {
            if (type === "google" || type === "gdrive") {
                // Find Google Drive link
                const googleLink = movieLinkData.Links.find(l => 
                    l.type === "Google" || 
                    typeof l.link === "string" || 
                    l.link.includes("drive.usercontent.google.com")
                );
                
                if (googleLink?.link) {
                    downloadUrl = googleLink.link;
                    console.log(`✓ Got Google Drive link...`);
                    break;
                } else {
                    console.log(`✗ No Google Drive link found`);
                }
            } 
            else if (type === "pixel" || type === "pixeldrain" || type === "pix") {
                // Find PixelDrain link
                const pixelLink = movieLinkData.Links.find(l => 
                    l.type.toLowerCase().includes("pixel") || 
                    (typeof l.link === "string" || l.link.includes("pixeldrain.com"))
                );
                
                if (pixelLink?.link) {
                    downloadUrl = pixelLink.link;
                    console.log(`✓ Got PixelDrain link...`);
                    break;
                } else {
                    console.log(`✗ No PixelDrain link found`);
                }
            }
            else {
                // Fallback: get first available link
                const firstLink = movieLinkData.Links.find(l => typeof l.link === "string" && l.link);
                if (firstLink?.link) {
                    downloadUrl = firstLink.link;
                    console.log(`✓ Got ${firstLink.type || 'download'} link...`);
                    break;
                }
            }
        }
    } catch (error) {
        console.log(`Attempt ${attempt + 1} failed:`, error);
    }
    attempt++;
}
            if (!downloadUrl) return await reply("❌ Failed to retrieve a valid download link after 10 attempts.");
            
            let mediaData;
            let docs;
            if(downloadUrl.includes('drive.usercontent.google.com')){
            mediaData = await getDriveStreamFromUrl(downloadUrl);
            docs = { stream : mediaData.stream }
            } else if (downloadUrl.includes('pixeldrain')){
            docs = { url : downloadUrl }
            }

// Create formatted info message
let episodeMessag;
if(config.isPremium === false) {
  episodeMessag = `
${config.MOVIETITLE || "> *『❤ 𝐒𝐄𝐍𝐔𝐑𝐀 𝐌𝐃 ❤ 𝐂𝐈𝐍𝐄𝐌𝐀 🎬』*"}
> =====================
> 📺 *Series:* ${oce}${episodeInfo.series || "N/A"}${oce}
> 🎬 *Episode:* ${oce}${episodeInfo.seasonEpisode || "N/A"}${oce}
> 🏷️ *Title:* ${oce}${episodeInfo.episodeTitle || "N/A"}${oce}
> 📅 *Date:* ${oce}${episodeInfo.date || "N/A"}${oce}
> ⭐ *Rating:* ${oce}${episodeInfo.rating?.value || "N/A"}/10${oce}
> 📊 *Quality:* ${oce}${quality || "480p"}${oce}
> =====================
> 📌 *Episode Info:*
> ${oce}_${episodeInfo.title || "No additional information available."}_${oce}`;
} else {
  episodeMessag = castem.CINETVSHOW(episodeInfo,quality,oce);
}
// Notify user that upload is starting
await conn.sendMessage(from, {
  text: "✅ Download link obtained! Starting upload...",
  react: { text: "⬆️", key: mek.key },
});

let sendtoList = config.MOVIE_JID.length > 0 ? config.MOVIE_JID : [from];

// Send the episode to each JID one by one, waiting after each send
for (let sendto of sendtoList) {
  try {
    const isGroup = sendto.endsWith("@g.us");
    let groupName = "";
    
    if (isGroup) {
      const groupMetadata = await conn.groupMetadata(sendto).catch(() => {});
      groupName = groupMetadata?.subject || "";
    }

    // Add group info to caption if it's a group
    let finalCaption = episodeMessag;
    let addcap;
    if (isGroup) {
if(config.isPremium === true){
    addcap = castem.GROUP(groupName,config,oce)
} else {
    addcap = `
> 📨 *𝙎𝙝𝙖𝙧𝙚𝙙 𝙄𝙣:* ${oce}${groupName}${oce}
> 🛡️ *𝘼𝙙𝙢𝙞𝙣:* ${oce}${config.MNAME}${oce}`;
}
      finalCaption += addcap
    }
    
    finalCaption += `
${config.FOOTER}`;

    // Send episode info with thumbnail
    await conn.sendMessage(sendto, {
      image: { url: poto },
      caption: finalCaption,
    });

    // Get file details for better file naming
    let fileName;
    try {
      const data = await getFileDetails(downloadUrl);
      fileName = `${episodeInfo.series || "Episode"} - ${episodeInfo.episodeTitle || "Unknown"}.mp4`;
    } catch (error) {
      fileName = `${episodeInfo.series || "Episode"} - ${episodeInfo.episodeTitle || "Unknown"}.mp4`;
    }

    // Send the actual episode file
    await conn.sendMessage(
      sendto,
      {
        document: docs,
        mimetype: "video/mp4",
        fileName: `${config.MNAME || "CineSubz"} - ${fileName.replace(/[<>:"/\\|?*]/g, '_')} [${quality}]`,
        caption: `
📺 *${episodeInfo.series || "TV Show"}*
🎬 *${episodeInfo.episodeTitle || "Episode"}*
📊 Quality: ${quality}
📁 Source: ${config.MNAME || "CineSubz"}
${config.FOOTER}`,
        jpegThumbnail: await getThumbnailBuffer(poto),
      },
      { quoted: kee }
    );

    await new Promise((resolve) => setTimeout(resolve, 3000));
  } catch (errSend) {
    console.error(`Error sending to ${sendto}:`, errSend);
    
    // Notify user about the error
    if (sendto === from) {
      await conn.sendMessage(from, {
        text: `❌ Error sending to ${isGroup ? 'group' : 'user'}: ${errSend.message}`,
      });
    }
  }
}

// Final success notification
await conn.sendMessage(from, {
  react: { text: "✅", key: mek.key },
  text: "✅ Episode has been successfully sent!",
});

return await reply("✅ Episode has been sent to the selected group(s)/user(s)!");
    } catch (e) {
      console.error("Error during download:", e);
      reply("An error occurred while processing your request.");
    }
  }
);
cmd(
  {
    pattern: "downloadallshowquality",
    alias: [],
    react: "🎬",
    desc: "Select movie for download",
    category: "no",
    use: ".movie 1",
    filename: __filename,
  },
  async (
    conn,
    m,
    mek,
    {
      from,
      q,
      mnu,
      apikey,
      config,
      baseurl,
      isME,
      getThumbnailBuffer,
      senderNumber,
      reply,
      prefix,
    }
  ) => {
        try {
            if (!q) return;
            let parts = q.split(" & ");
            let index = parseInt(parts[0]) || 0;
            let url = parts[1];
            let image = parts[2];
            
            const movieResponse1 = await fetchJson(`${baseurl}/api/cinesubz?apikey=${apikey}&tvseries=${encodeURIComponent(url)}`);
            if (!movieResponse1.status || !movieResponse1.data?.data?.seasons) return await reply("❌ Error fetching TV series information.");
            
            const movieData1 = movieResponse1.data.data;
            const seasons = movieData1.seasons;
            if (!seasons[index]) return await reply("❌ Season not found.");
            
            const episodeList = seasons[index].episodes;
            if (!episodeList || episodeList.length === 0) return await reply("❌ No episodes found for this season.");
            
            let dataurl = episodeList[0].episodeLink;
            const movieResponse = await fetchJson(`${baseurl}/api/cinesubz?apikey=${apikey}&tvdl=${encodeURIComponent(dataurl)}`);
            if (!movieResponse.status || !movieResponse.data) return await reply("❌ Error fetching episode download links.");
            
            const episodeInfo = movieResponse.data.episodeInfo;
            const downloadLinks = movieResponse.data.downloadLinks;
            const qualities = ["480p", "720p", "1080p"];
            const availableQualities = qualities.filter(q => downloadLinks.direct?.[q]?.link);
            
            if (availableQualities.length === 0) {
                const telegramQualities = qualities.filter(q => downloadLinks.telegram?.[q]?.link);
                if (telegramQualities.length > 0) {
                    return await reply("⚠️ Only Telegram links available. Please select individual episodes.");
                } else {
                    return await reply("❌ No download links available for this season.");
                }
            }
// Create sections for download options
const sections = [
    {
        title: "📥 PixelDrain Download",
        rows: availableQualities.map((quality) => {
            const linkData = downloadLinks.direct[quality];
            return {
                title: `⬇️ ${quality}`,
                description: `Size: ${linkData?.size || "N/A"}`,
                rowId: `${config.PREFIX}cineshowalldl ${index} & ${url} & ${quality} & ${image} & pix`
            };
        })
    },
    {
        title: "☁️ Google Drive Download",
        rows: availableQualities.map((quality) => {
            const linkData = downloadLinks.direct[quality];
            return {
                title: `☁️ ${quality}`,
                description: `Size: ${linkData?.size || "N/A"}`,
                rowId: `${config.PREFIX}cineshowalldl ${index} & ${url} & ${quality} & ${image} & google`
            };
        })
    },
    {
        title: "📺 Episode Selection",
        rows: [
            {
                title: "📺 Select Episodes",
                description: "Choose specific episodes to download",
                rowId: `cineshowepisodes ${index} & ${url} & ${image}`
            }
        ]
    }
];

const metadata = movieData1.metadata || {};
const rating = movieData1.ratings?.imdb || "N/A";
const genres = metadata.genres ? metadata.genres.filter(g => !g.startsWith(".")).join(", ") : "N/A";

const seasonMessag = `${config.MOVIETITLE || "> *『⚡ 𝗫ＰＲＯ𝗩ＥＲＣＥ 𝑪𝑰𝑵𝑬𝑴𝑨 』*"}\n> =====================\n> 🎬 *Series:* ${oce}${movieData1.title}${oce}\n> 📺 *Season:* ${oce}${seasons[index].seasonTitle}${oce}\n> ⭐ *IMDb:* ${oce}${rating}${oce}\n> 🗓️ *Year:* ${oce}${metadata.year || "N/A"}${oce}\n> 🎭 *Genres:* ${oce}${genres}${oce}\n> 📊 *Episodes:* ${oce}${episodeList.length}${oce}\n> 🌐 *Language:* ${oce}${metadata.language || "English"}${oce}\n> =====================\n> 📌 *Download All Episodes:*\n> ${oce}_Choose a quality and download type to download all episodes of ${seasons[index].seasonTitle}_${oce}`;

const listMessage = {
    caption: seasonMessag,
    image: { url: image },
    footer: config.FOOTER || "Select download option:",
    title: `📺 ${movieData1.title}`,
    buttonText: "📥 Download Options",
    sections: sections
};

return await conn.listMessage2(from, listMessage, null);
        } catch (e) {
            console.error("Error during movie selection:", e);
            reply("An error occurred while processing your request.");
        }
  }
);
cmd(
  {
    pattern: "cineshowalldl",
    alias: [],
    react: "⬇️",
    desc: "Download selected movie",
    category: "no",
    use: ".download 1 1",
    filename: __filename,
  },
  async (
    conn,
    m,
    mek,
    {
      from,
      q,
      mnu,
      isGroup,
      groupName,
      baseurl,
      apikey,
      isME,
      config,
      getThumbnailBuffer,
      senderNumber,
      reply,
      prefix,
    }
  ) => {
   const maxRetries = 3;
const retryDelay = 2000;
let index = 0; // Store the last sent index
let sendtoList = config.MOVIE_JID.length > 0 ? config.MOVIE_JID : [from]; // Use MOVIE_JID if provided, else fallback to `from`.

// Send the movie to each JID one by one, waiting after each send
for (let sendfor of sendtoList) {
  try {
    const fetchMovieData = async (url, retries = 0) => {
      try {
        const movieResponse = await fetchJson(
          `${baseurl}/api/cinesubz?apikey=${apikey}&tvseries=${encodeURIComponent(url)}`
        );

        if (!movieResponse.status || !movieResponse.data?.data?.seasons) {
          throw new Error("Error fetching the TV series.");
        }
        
        const movieData = movieResponse.data.data;
        const isGroup = sendfor.endsWith("@g.us");
        const groupMetadata = isGroup
          ? await conn.groupMetadata(sendfor).catch(() => null)
          : null;
        const groupName = isGroup ? groupMetadata?.subject : "";
        
        // Get series metadata
        const metadata = movieData.metadata || {};
        const rating = movieData.ratings?.imdb || "N/A";
        const genres = metadata.genres ? metadata.genres.filter(g => !g.startsWith(".")).join(", ") : "N/A";
        const seriesTitle = movieData.title;
        
        let downloadMessage;
        if (config.isPremium === true) {
          if (isGroup) {
            downloadMessage = `
${castem.CINETVSHOWALLDL(seriesTitle,rating,metadata,genres,movieData,oce)}

${castem.GROUP(groupName,config,oce)}

━━━━━━━━━━━━━━━
${config.FOOTER}`.trim();
          } else {
            downloadMessage = `
${castem.CINETVSHOWALLDL(seriesTitle,rating,metadata,genres,movieData,oce)}

━━━━━━━━━━━━━━━
${config.FOOTER}`.trim();
          }
        } else {
          // Create formatted info message for TV series
          const seriesMessag = `
${config.MOVIETITLE || "> *『❤ 𝐒𝐄𝐍𝐔𝐑𝐀 𝐌𝐃 ❤ 𝐂𝐈𝐍𝐄𝐌𝐀 🎬 』*"}
> =====================
> 🎬 *Series:* ${oce}${seriesTitle}${oce}
> ⭐ *IMDb:* ${oce}${rating}${oce}
> 🗓️ *Year:* ${oce}${metadata.year || "N/A"}${oce}
> 🎭 *Genres:* ${oce}${genres}${oce}
> 📊 *Seasons:* ${oce}${movieData.seasons.length}${oce}
> 🌐 *Language:* ${oce}${metadata.language || "English"}${oce}
> =====================
> 📌 *Series Description:*  
> ${oce}_${movieData.description || "No description available."}_${oce}`;

          downloadMessage = seriesMessag;
          if (isGroup) {
            downloadMessage += `
> 📨 *𝙎𝙝𝙖𝙧𝙚𝙙 𝙄𝙣:* ${oce}${groupName}${oce}
> 🛡️ *𝘼𝙙𝙢𝙞𝙣:* ${oce}${config.MNAME}${oce}`;
          }
          downloadMessage += `
${config.FOOTER}`;
        }
        
        await conn.sendMessage(sendfor, {
          image: { url: movieData.poster },
          caption: downloadMessage,
        });
        return movieData;
      } catch (error) {
        console.error(`Fetch error: ${error.message}`);
        if (retries < maxRetries) {
          console.error(`Retrying... (${retries + 1}/${maxRetries})`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          return fetchMovieData(url, retries + 1);
        } else {
          return null;
        }
      }
    };

const getDownloadLink = async (linkUrl, type, retries = 0) => {
    const maxRetries = 3;
    const retryDelay = 2000;
    
    try {
        const movieLinkResponse = await fetchJson(`${baseurl}/api/cinesubz?apikey=${apikey}&dllink=${encodeURIComponent(linkUrl)}&type=${type}`);
        const movieLinkData = movieLinkResponse?.data;
        
        if (!Array.isArray(movieLinkData?.Links)) {
            console.log(`✗ No links array found in response`);
            return null;
        }
        
        // Define link finders for different types
        const linkFinders = {
            google: (link) => 
                link.type === "Google" && 
                link.link?.includes("drive.usercontent.google.com"),
            gdrive: (link) => 
                link.type === "Google" && 
                link.link?.includes("drive.usercontent.google.com"),
            pixeldrain: (link) => 
                link.type?.toLowerCase().includes("pixel") ||
                link.type?.toLowerCase().includes("drain") ||
                link.link?.includes("pixeldrain.com"),
            pixel: (link) => 
                link.type?.toLowerCase().includes("pixel") ||
                link.link?.includes("pixeldrain.com"),
            pix: (link) => 
                link.type?.toLowerCase().includes("pixel") ||
                link.link?.includes("pixeldrain.com")
        };
        
        // Get appropriate finder function
        const finder = linkFinders[type.toLowerCase()];
        
        if (finder) {
            const foundLink = movieLinkData.Links.find(finder);
            if (foundLink?.link) {
                console.log(`✓ Got ${type} link: ${foundLink.link.substring(0, 100)}...`);
                return foundLink.link;
            }
            
            // Fallback for Google: any Google link
            if (type.toLowerCase().includes('google') || type.toLowerCase().includes('gdrive')) {
                const anyGoogleLink = movieLinkData.Links.find(l => 
                    l.type?.toLowerCase().includes("google") && l.link
                );
                if (anyGoogleLink?.link) {
                    console.log(`✓ Got alternative Google link: ${anyGoogleLink.link.substring(0, 100)}...`);
                    return anyGoogleLink.link;
                }
            }
            
            // Fallback for PixelDrain: any direct link
            if (type.toLowerCase().includes('pixel') || type.toLowerCase().includes('pix')) {
                const directLink = movieLinkData.Links.find(l => 
                    l.link && (l.link.includes("download") || l.type?.toLowerCase().includes("direct"))
                );
                if (directLink?.link) {
                    console.log(`✓ Got direct download link: ${directLink.link.substring(0, 100)}...`);
                    return directLink.link;
                }
            }
        }
        
        // Ultimate fallback: first available link
        const firstLink = movieLinkData.Links.find(l => l.link);
        if (firstLink?.link) {
            console.log(`✓ Got ${firstLink.type || 'download'} link as fallback: ${firstLink.link.substring(0, 100)}...`);
            return firstLink.link;
        }
        
        console.log(`✗ No ${type} links found`);
        return null;
        
    } catch (error) {
        console.error(`Error getting ${type} link (attempt ${retries + 1}/${maxRetries}):`, error.message);
        
        if (retries < maxRetries) {
            console.log(`Retrying in ${retryDelay/1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            return getDownloadLink(linkUrl, type, retries + 1);
        }
        
        console.error(`Failed to get ${type} link after ${maxRetries} retries`);
        return null;
    }
};

    const sendEpisode = async (episodeList, currentIndex, quality, totalEpisodes,movieData,type) => {
      if (currentIndex >= episodeList.length) {
        await conn.sendMessage(from, {
          text: `✅ Successfully sent all ${totalEpisodes} episodes of the season!`,
        });
        return;
      }

      try {
        const link = episodeList[currentIndex];
        const episodeNumber = currentIndex + 1;
        
        // Notify progress
        await conn.sendMessage(from, {
          text: `⏳ Downloading episode ${episodeNumber}/${totalEpisodes}: ${link.episodeTitle || `Episode ${link.episodeNumber}`}`,
        });

        const episodeUrl = link.episodeLink;
        const poto = link.episodeImage || movieData.poster;
        const movieResponse = await fetchJson(
          `${baseurl}/api/cinesubz?apikey=${apikey}&tvdl=${encodeURIComponent(episodeUrl)}`
        );

        if (!movieResponse.status || !movieResponse.data) {
          throw new Error(`Failed to fetch episode ${episodeNumber} data`);
        }

        const episodeInfo = movieResponse.data.episodeInfo;
        const directLinks = movieResponse.data.downloadLinks?.direct || {};

        let selectedQuality = null;
        let downloadLink = null;

        // Try to get the requested quality first
        if (directLinks[quality]?.link) {
          selectedQuality = quality;
          downloadLink = directLinks[quality].link;
        }
        // Fallback options if the requested quality is not available
        else if (directLinks["720p"]?.link) {
          selectedQuality = "720p";
          downloadLink = directLinks["720p"].link;
        } else if (directLinks["480p"]?.link) {
          selectedQuality = "480p";
          downloadLink = directLinks["480p"].link;
        } else if (directLinks["1080p"]?.link) {
          selectedQuality = "1080p";
          downloadLink = directLinks["1080p"].link;
        }

        if (!downloadLink) {
          throw new Error(`No download links available for episode ${episodeNumber}`);
        }

        // Get the direct download URL
        const downloadUrl = await getDownloadLink(downloadLink,type);
        if (!downloadUrl) {
          throw new Error(`Failed to get direct download link for episode ${episodeNumber}`);
        }

        // Get file details
        let fileName;
        try {
          const data = await getFileDetails(downloadUrl);
          fileName = `${episodeInfo.series || "Series"} - S${episodeInfo.seasonEpisode?.split('×')[0] || "01"}E${link.episodeNumber} - ${link.episodeTitle}.mp4`;
        } catch (error) {
          fileName = `${episodeInfo.series || "Series"} - S${episodeInfo.seasonEpisode?.split('×')[0] || "01"}E${link.episodeNumber} - ${link.episodeTitle}.mp4`;
        }

        // Create episode info message
        const episodeCaption = `
📺 *${episodeInfo.series || "TV Series"}*
🎬 *Episode ${link.episodeNumber}: ${link.episodeTitle}*
📅 *Aired:* ${link.episodeDate || episodeInfo.date || "N/A"}
📊 *Quality:* ${selectedQuality}
📁 *File:* ${fileName}

${config.FOOTER}`;

let mediaData;
            let docs;
            if(downloadUrl.includes('drive.usercontent.google.com')){
            mediaData = await getDriveStreamFromUrl(downloadUrl);
            docs = { stream : mediaData.stream }
            } else if (downloadUrl.includes('pixeldrain')){
            docs = { url : downloadUrl }
            }
        // Send the episode file
        await conn.sendMessage(
          sendfor,
          {
            document: docs,
            mimetype: "video/mp4",
            fileName: `${config.MNAME || "CineSubz"} - ${fileName.replace(/[<>:"/\\|?*]/g, '_')}`,
            caption: episodeCaption,
            jpegThumbnail: await getThumbnailBuffer(movieData.poster),
          }
        );

        // Move to the next episode
        setTimeout(() => sendEpisode(episodeList, currentIndex + 1, quality, totalEpisodes,movieData,type), 5000);
      } catch (e) {
        console.error(`Error downloading episode ${currentIndex + 1}:`, e);
        // Notify about the error but continue with next episode
        await conn.sendMessage(from, {
          text: `⚠️ Failed to download episode ${currentIndex + 1}. Skipping to next episode.\nError: ${e.message}`,
        });
        setTimeout(() => sendEpisode(episodeList, currentIndex + 1, quality, totalEpisodes,movieData,type), 3000);
      }
    };

    try {
      if (!q) return;

      let parts = q.split(" & ");
      index = parseInt(parts[0]) || 0;
      let url = parts[1];
      let quality = parts[2];
      let type = parts[3];

      // Notify start
      await conn.sendMessage(from, {
        text: "🔍 Starting to download all episodes... This may take a while.",
      });

      const movieData = await fetchMovieData(url);
      if (!movieData) {
        await conn.sendMessage(from, {
          text: "❌ Failed to fetch TV series data. Please try again.",
        });
        return;
      }

      const seasons = movieData.seasons;
      if (!seasons[index]) {
        await conn.sendMessage(from, {
          text: "❌ Invalid season index. Please try again.",
        });
        return;
      }

      const episodeList = seasons[index].episodes;
      if (!episodeList || episodeList.length === 0) {
        await conn.sendMessage(from, {
          text: "❌ No episodes found in this season.",
        });
        return;
      }

      // Notify about the download
      await conn.sendMessage(from, {
        text: `📥 Starting download of ${episodeList.length} episodes from ${seasons[index].seasonTitle} in ${quality} quality...`,
      });

      // Start sending episodes
      sendEpisode(episodeList, 0, quality, episodeList.length,movieData,type);

    } catch (e) {
      console.error("Error:", e);
      await conn.sendMessage(from, {
        text: "❌ An error occurred while processing your request. Please try again.",
      });
    }
    
    // Wait before sending to the next JID (if any)
    await new Promise((resolve) => setTimeout(resolve, 3000));
  } catch (errSend) {
    console.error(`Error sending to ${sendfor}:`, errSend);
  }
}
  }
);
