const { cmd, commands } = require("../Utils/command");
const { fetchJson } = require("../Utils/functions");
cmd(
  {
    pattern: "gemini",
    desc: "Ai chat with gemini.",
    react: "🧠",
    category: "ai",
    use: ".gemini whats your name",
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
      await conn.sendMessage(
    from,
    {
        text: 'This is an Interactive message!',
        title: 'Hiii',
        subtitle: 'There is a subtitle', 
        footer: 'Hello World!',
        interactiveButtons: [
            {
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Click Me!',
                    id: 'your_id'
                })
            },
            {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Follow Me',
                    url: 'https://whatsapp.com/channel/0029Vb3hlgX5kg7G0nFggl0Y',
                    merchant_url: 'https://whatsapp.com/channel/0029Vb3hlgX5kg7G0nFggl0Y'
                })
            },
            {
                name: 'cta_copy',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Click Me!',
                    copy_code: 'https://whatsapp.com/channel/0029Vb3hlgX5kg7G0nFggl0Y'
                })
            },
            {
                name: 'cta_call',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Call Me!',
                    phone_number: '628xxx'
                })
            },
            {
                name: 'cta_catalog',
                buttonParamsJson: JSON.stringify({
                    business_phone_number: '628xxx'
                })
            },
            {
                name: 'cta_reminder',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'cta_cancel_reminder',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'address_message',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'send_location',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'open_webview',
                buttonParamsJson: JSON.stringify({
                    title: 'Follow Me!',
                    link: {
                        in_app_webview: true, // or false
                        url: 'https://whatsapp.com/channel/0029Vb3hlgX5kg7G0nFggl0Y'
                    }
                })
            },
            {
               name: 'mpm',
               buttonParamsJson: JSON.stringify({
                  product_id: '8816262248471474'
               })
            },
            {
               name: 'wa_payment_transaction_details',
               buttonParamsJson: JSON.stringify({
                  transaction_id: '12345848'
               })
            },
            {
               name: 'automated_greeting_message_view_catalog',
               buttonParamsJson: JSON.stringify({
                   business_phone_number: '628xxx', 
                   catalog_product_id: '12345'
               })
            },
            {
                name: 'galaxy_message', 
                buttonParamsJson: JSON.stringify({
                	mode: 'published', 
                    flow_message_version: '3', 
                    flow_token: '1:1307913409923914:293680f87029f5a13d1ec5e35e718af3',
                    flow_id: '1307913409923914',
                    flow_cta: 'samuel -!Rebix', 
                    flow_action: 'navigate', 
                    flow_action_payload: {
                    	screen: 'QUESTION_ONE',
                        params: {
                        	user_id: '123456789', 
                            referral: 'campaign_xyz'
                        }
                    }, 
                    flow_metadata: {
                    	flow_json_version: '201', 
                        data_api_protocol: 'v2', 
                        flow_name: 'Lead Qualification [en]',
                        data_api_version: 'v2', 
                        categories: ['Lead Generation', 'Sales']
                   }
                }) 
            }, 
            {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                    title: 'Click Me!',
                    sections: [
                        {
                            title: 'Title 1',
                            highlight_label: 'Highlight label 1',
                            rows: [
                                {
                                    header: 'Header 1',
                                    title: 'Title 1',
                                    description: 'Description 1',
                                    id: 'Id 1'
                                },
                                {
                                    header: 'Header 2',
                                    title: 'Title 2',
                                    description: 'Description 2',
                                    id: 'Id 2'
                                }
                            ]
                        }
                    ]
                })
            }
        ]
    }
)
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);

//======gpt4=======
cmd(
  {
    pattern: "ai",
    desc: "Ai chat with Gpt.",
    react: "🧠",
    category: "ai",
    use: ".ai whats your name",
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
      if (!q) return reply(`Give me a query`);

      // URL of the new API
      let apiUrl = `https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(
        `speak as XPROVerce MD whatsapp bot.if ask for owner or creater tell Janith Rashmika`
      )}&content=${encodeURIComponent(q)}`;

      // Fetch data from the API
      let data = await fetchJson(apiUrl);

      // Check if the API response has the expected data
      if (!data || !data.data) {
        return reply("Sorry, I couldn't get a response from the AI.");
      }

      // Send the AI response to the user
      await conn.sendMessage(
        from,
        {
          text: data.data, // Assuming the result is directly in the 'result' field
        },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
      reply(`Error: ${e}`);
    }
  }
);

cmd(
  {
    pattern: "meta",
    desc: "Ai chat with meta.",
    react: "🧠",
    category: "ai",
    use: ".meta how are you",
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
      if (!q) return reply(`Give me a quary`);
      let data = await fetchJson(
        `https://api.siputzx.my.id/api/ai/metaai?query=${q}`
      );
      await conn.sendMessage(
        from,
        {
          text: data.data,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);

cmd(
  {
    pattern: "aiimage",
    desc: "Generate an AI image.",
    react: "🧠",
    category: "ai",
    use: ".aiimage beautiful girl in the beach",
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
      senderNumber,
      apikey,
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
      if (!q) return reply(`Please provide a query.`);

      // Fetch the AI image
      let data =
        `https://api.siputzx.my.id/api/ai/flux?prompt=${encodeURIComponent(
          q
        )}`;

      //if (!data.status) return reply(`Failed to generate the image.`);

      // Decode buffer from the API response
      //const imageBuffer = Buffer.from(data.image.data);

      // Send the image
      await conn.sendMessage(
        from,
        {
          image: {url:data},
          caption: `*AI Image Generated:*`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply(`An error occurred: ${e.message}`);
    }
  }
);
