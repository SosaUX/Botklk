const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: false});
const config = require("./config.json");
const mysql = require("mysql")
const client = new Discord.Client();
const token = '';
//Bot on
bot.on('ready', () =>{
  var channel = bot.channels.find(channel => channel.id === '742109465981223002');
  var staffchannel = bot.channels.find(channel => channel.id === '742109465981223002');
    console.log('Bot Listo');
    if (config.activity.streaming == true) {
      bot.user.setActivity('PR 1v1 - SOSAUX!', {url: 'https://discord.gg/K37vHmK8Pj'});
    } else if (config.activity.streaming == false) {
      bot.user.setActivity('PR 1v1 - SOSAUX!');
    }
})
var prefix = config.prefix;

//Load Commands
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  
  if (jsfiles.length <= 0) return console.log("No hay comandos para ejecutar");

  console.log(`Loading ${jsfiles.length} comandos....`);
  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i + 1}: ${f} cargando`);
    bot.commands.set(props.help.name, props);
  });
});

//message event
bot.on("message", async message => {
  if (message.author.bot) return;
  
  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  if (!command.startsWith(prefix)) return;

  let cmd = bot.commands.get(command.slice(prefix.length));
  if (cmd) cmd.run(bot, message, args);
});

bot.on("message", (message) =>{

    if (message.content.startsWith(prefix +"ip")){
      message.channel.send({embed: {
        color: 15158332,
        description: "IP: NEVEL BBY"
      }});
}

});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.on("message", async message => {
  if(message.author.bot || message.channel.type === "help") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}help`){
    let sEmbed = new Discord.RichEmbed()
    .setColor("#E5DA2A")
    .setTitle("Comandos")
    .setThumbnail(message.guild.iconURL)
    .addField("**Usuarios**", "/ip | /status", true)
    message.channel.send({embed: sEmbed});
  }
})

bot.login(config.token);