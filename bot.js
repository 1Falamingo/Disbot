//############################################################################################
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = config.token;
//############################################################################################
client.on('ready', () => {
    client.user.setStatus('dnd');
    console.log(`На момент запуска, бот находится на ${client.guilds.size} сервере(-ах), в котором(-ых) ${client.users.size} пользователей.`);
    client.user.setPresence({
        game: {
            name: 'понты Фиша',
            type: "LISTENING",
            url: "https://youtu.be/Llxvrh21OEY"
        }
    });
});
//############################################################################################
client.on("message", message => {
//############################################################################################
    if(message.author.bot) return;
    if (message.channel.type === "dm") return;
//############################################################################################
    if(message.content.startsWith("post")) {

      let canal = message.mentions.channels.first();
      if(message.content.startsWith("post" + " | ")) {

        if(message.content.startsWith("post" + " | " + canal)) {

          if(message.content.startsWith("post" + " | " + canal + " |")) {

              let postMessage = message.content.slice(30)
              if(!postMessage) return message.channel.send("```Укажите сообщение для отправки.```")
              try {
                  canal.send(postMessage)
                  message.channel.send(`\`\`\`Сообщение успешно отправлено.\`\`\``)
                  console.log(`POST COMMAND /// ${message.author.tag} : ${postMessage}(${canal.name}) /// ${message.guild.name}`)
              } catch(e) {
                  message.channel.send(`Ошибочка товарищ: ${e}`)
              }
          } else { return message.channel.send("```Использование: post | #канал | %сообщение%```"); }
        } else { return message.channel.send("```Укажите канал.```"); }
      } else { return message.channel.send("```Использование: post | #канал | %сообщение%```"); }
    } else { return; }
//############################################################################################
    if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
//############################################################################################
    try {
      let commands = require(`./commands/${command}.js`);
      commands.run(client, message, args);
    } catch (err) {
      if(message.content.endsWith("F.")) {
          return;
      } else {
          message.channel.send("```Данная команда в боте отсутствует.```" + `\n${err}`);
      }
    }
//############################################################################################
});
//############################################################################################
    client.on('message', message => {
      const emojinotok = "498460152056512532";
      if(message.content.endsWith("F.")) message.react(emojinotok);
      const fgood = ["я сделал", "Я сделал", "Я СДЕЛАЛ", "Я НАКОНЕЦ-ТО СДЕЛАЛ", "Я наконец-то сделал", "я наконец-то сделал", "я наконец сделал", "Я наконец сделал", "Я НАКОНЕЦ СДЕЛАЛ", "я наконец то сделал", "Я наконец то сделал", "Я НАКОНЕЦ ТО СДЕЛАЛ"];

      if(message.content.startsWith("F.")) return;
      if(message.author.bot) return;

      if(message.content.includes("<@498452802113110028>")) message.channel.send("<:476351684138893312:498454490467270668>");
      if(fgood.some(word => message.content.includes(word)) ) message.channel.send("класна<:468127291134967808:498454490882637824>");
    });
//############################################################################################
    client.on('guildMemberAdd', member => {
      const embed = new Discord.RichEmbed()
      .setColor("#800080")
      .setTitle(`**Добро пожаловать в Discord-сервер ${member.guild.name}.**`)
      .addField("**Пропиши: `F.rules` чтобы узнать правила.**", "Если есть вопросы - пиши модераторам или администраторам данного сервера")
      member.send({ embed });
    });
//############################################################################################
   client.on('message', message => {
      const swearWords = ["https://discordapp.com/oauth2/authorize?client_id=256556410031046657&scope=bot&permissions=1", "https://discordbots.org/bot/astolfo/vote", "!s invite", "!s info", "Oops! That command was used incorrectly. Command arguments: []Usage: !s infoIF.you are still experiencing issues, type !s help to get a link to the bot's official server where we would be glad to help you.", "https://discord.gg/"];
      if( swearWords.some(word => message.content.includes(word)) ) {
          message.delete();
          message.author.send('```Так как выше сообщение содержало запрещенное(-ые) слово(-а), оно было удалено.```');
        }
    });
//############################################################################################
    client.on('guildMemberAdd', member => {
        const embed = new Discord.RichEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL)
        .setColor("#00FF7F").setFooter(`зашел на сервер ${member.guild.name}`)
      .setTimestamp()
      let mach = member.guild.channels.find(channel => channel.name === "новые-игроки");
      if(!mach) return
      mach.send({embed})
      console.log(`Пользователь под ником "${member.user.username}" зашел на сервер "${member.guild.name}"` );
    });
//############################################################################################
    client.on('guildMemberRemove', member => {
        const embed = new Discord.RichEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL)
        .setColor("#FFCC99")
        .setFooter(`покинул сервер ${member.guild.name}`)
      .setTimestamp()
      let mach = member.guild.channels.find(channel => channel.name === "ливеры");
      if(!mach) return
      mach.send({embed});
      console.log(`Пользователь под ником "${member.user.username}" покинул сервер "${member.guild.name}"` );
    });
//############################################################################################
    client.on('messageDelete', async message => {
      if(message.author.bot) return;
      if(message.content.startsWith("F.")) return;
      const embed = new Discord.RichEmbed()
      .setColor("#ff0000")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .addField(`Сообщение от: `, message.author)
      .addField(`Было удалено в канале: `, message.channel)
      .addField(`Сообщение: `, message.content)
      .setFooter(`ID канала, в котором было удалено сообщение: ${message.channel.id}`)
      .setTimestamp()
      let logs = message.guild.channels.find(channel => channel.name === "logs");
      if(!logs) return
      logs.send({ embed });
    });
//############################################################################################
    client.on('messageUpdate', async (oldMessage, newMessage) => {
      if(oldMessage.author.bot) return;
      const site = ["http://", "https://"];
      if( site.some(word => oldMessage.content.includes(word)) ) {
        return;
        }
      const embed = new Discord.RichEmbed()
      .setColor("#008000")
      .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL)
      .addField("Сообщение от: ", oldMessage.author)
      .addField("Было изменено в канале: ", oldMessage.channel)
      .addField("Старая версия сообщения: ", oldMessage.content)
      .addField("Новая версия сообщения: ", newMessage.content)
      .setFooter(`ID канала, в котором было изменено сообщение ${newMessage.channel.id}`)
      .setTimestamp()

      let logs = oldMessage.guild.channels.find(channel => channel.name === "logs");
      if(!logs) return
      logs.send({ embed });
    });
//############################################################################################
    client.on("error", error => {
        console.log(`Ошибочка, товарищ: \n${JSON.stringify(error)}`);
    });
//############################################################################################
    client.on("guildCreate", async guild => {
      const invite = await guild.channels.first().createInvite({
        maxAge: 0
      });
      console.log(`Новый сервер: ${guild.name} /// инвайт: https://discord.gg/${invite.code}`)
    });
//############################################################################################
client.login(token);
