//Const\\
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const token = config.token;
const prefix = config.prefix;

var parseTime = function(milliseconds) {
    var seconds = Math.floor(milliseconds/1000); milliseconds %= 1000;
    var minutes = Math.floor(seconds/60); seconds %= 60;
    var hours = Math.floor(minutes/60); minutes %= 60;
    var days = Math.floor(hours/24); hours %= 24;
    var written = false;
    return (days?(written=true,days+` days`):``)+(written?`, `:``)
        +(hours?(written=true,hours+` hours`):``)+(written?`, `:``)
        +(minutes?(written=true,minutes+` minutes`):``)+(written?`, `:``)
        +(seconds?(written=true,seconds+` seconds`):``)+(written?`, `:``)
        +(milliseconds?milliseconds+` milliseconds`:``);
};

//Ready Event\\
client.on('ready', ready => {
console.log('I am ready.');
console.log('Logged in with the username ' + client.user.username);
console.log('With the ID ' + client.user.id);
client.user.setActivity(prefix + 'help');
});

//Message Event\\
client.on('message', message => {

const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();

if (message.author.bot) return;
if (message.channel.type === 'dm') return;

//Help Command\\
if (message.content.toLowerCase().startsWith(prefix + 'help')) {
    var helpEmbed = new Discord.RichEmbed()
    .setColor('#42c2f4')
    .setTitle(':mailbox_with_mail: Check your DMs!');
message.channel.send({embed: helpEmbed})
    var HelpEmbed = new Discord.RichEmbed()
    .setColor('#42c2f4')
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription('These are all ' + client.user.username + ' commands.')
    .addField(prefix + 'ping', '-Sends the bots ping.')
    .addField(prefix + 'info', '-Sends the bots info.')
    .addField(prefix + 'guildinfo', '-Sends info about the guild.')
    .addField(prefix + 'profile', '-Sends info about the message author or a @mention.')
    .addField(prefix + 'say', '-Sends a embed of what you put.')
    .addField(prefix + 'purge', '-Purges a amount between 1 and 100.')
    .addField(prefix + 'kick', '-Kicks a @mention _you can also add a reason_.')
    .addField(prefix + 'ban', '-Bans a @mention _you can also add a reason_.')
message.author.send({embed: HelpEmbed});
};

//Ping Command\\
if (message.content.toLowerCase().startsWith(prefix + 'ping')) {
    var PingEmbed = new Discord.RichEmbed()
    .setColor('#42c2f4')
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription('Pong! :ping_pong: ' + Math.round(client.ping) + 'ms');
message.channel.send({embed: PingEmbed});
};

//Info Command\\
if (message.content.toLowerCase().startsWith(prefix + 'info')) {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    var InfoEmbed = new Discord.RichEmbed()
    .setColor('#42c2f4')
    .setThumbnail(client.user.avatarURL)
    .setTitle(client.user.tag + `'s Info`)
    .setDescription('Here is what I could find!')
    .addField('Prefix', prefix, true)
    .addField("Creator", "Tyler#1157", true)
    .addField("Libary", "Node.JS & Discord.JS", true)
    .addField("Version", config.ver, true)
    .addField("Channels", client.channels.size, true)
    .addField("Users", client.users.size, true)
    .addField("Ping", Math.round(client.ping) + "ms", true)
    .addField("Memory Used", `${Math.round(used * 100) / 100}MB`,true)
    .addField("Uptime", parseTime(client.uptime), true);
message.channel.send({embed: InfoEmbed});
};

//GuildInfo Command\\
if (message.content.toLowerCase().startsWith(prefix + 'guildinfo')) {
    var GuildInfoEmbed = new Discord.RichEmbed()
    .setColor('#42c2f4')
    .setThumbnail(message.guild.iconURL)
    .setTitle(message.guild.name + ' Info')
    .setDescription('Here is what I could find about this guild.')
    .addField("Name", message.guild.name, true)
    .addField("Owner", message.guild.owner, true)
    .addField("Region", message.guild.region, true)
    .addField("Verification level", message.guild.verificationLevel, true)
    .addField("Members", message.guild.memberCount, true)
    .addField("Channels", message.guild.channels.size, true)
    .addField("Roles", message.guild.roles.size, true)
    .addField("ID", message.guild.id, true)
    .addField("Created On", message.guild.createdAt)
message.channel.send({embed: GuildInfoEmbed});
};

//Profile Command\\
if (message.content.toLowerCase().startsWith(prefix + "profile")) {
    if (message.mentions.members.size < 1) {
    var msga = message.author;
    var status = message.author.presence.status;
    var profileEmbed = new Discord.RichEmbed()
    .setColor('#42c2f4')
    .setThumbnail(message.author.avatarURL)
    .setTitle(message.author.username + "'s Info")
    .setDescription("Heres what I could find about you.")
    .addField("Username", msga.username, true)
    .addField("Discriminator", msga.discriminator, true)
    .addField("AKA", message.member.nickname, true)
    .addField("Status", status, true)
    .addField("Bot", msga.bot, true)
    .addField("ID", msga.id, true)
    .addField("Joined This Server", message.member.joinedAt, true)
    .addField("Created At", msga.createdAt, true);
    message.channel.send(profileEmbed)
    } else {
        var msg = message.mentions.members.first();
        var status = msg.presence.status;
        var profile2Embed = new Discord.RichEmbed()
          .setThumbnail(msg.user.avatarURL)
          .setTitle(`${msg.user.username}'s Info`)
          .setDescription("Heres what I could find about you.")
          .setColor('#42c2f4')
          .addField("Username", `${msg.user.username}`, true)
          .addField("Discriminator", `${msg.user.discriminator}`, true)
          .addField('AKA', `${msg.nickname}`, true)
          .addField('Status', status, true)
          .addField(`Bot`, msg.user.bot, true)
          .addField("ID", `${msg.user.id}`, true)
          .addField("Joined this server", `${msg.joinedAt}`, true)
          .addField('Created At', msg.user.createdAt, true);
        message.channel.send(profile2Embed);
  };
};

if (message.content.toLowerCase().startsWith(prefix + 'say')) {
    message.delete()
if (!args[0]) {
message.channel.send('Please provide somthing to say.')
 } else {
if (args[0]) {
  var SayEmbed = new Discord.RichEmbed()
  .setColor('#42c2f4')
  .setAuthor(message.author.username + ' says.....', message.author.avatarURL)
  .setDescription(args[0]);
message.channel.send({embed: SayEmbed})
};
};
};

//Purge Command\\
if (message.content.toLowerCase().startsWith(prefix + 'purge')) {
    if (!message.guild.member(client.user).hasPermission(['MANAGE_MESSAGES'])) {
        message.reply('I don\'t have the permission **Manage_Messages**.');
        return;
    } else {
        if (message.member.hasPermission(['MANAGE_MESSAGES'])) {
        var amount = args.join(' ')
        if (isNaN(amount)) {
        message.reply('Please provide a number between 1 and 100.')
        return;
      };

      if (!amount) {
      message.reply('Please provide an amount.')
    } else {
      message.channel.bulkDelete(amount);
    var PurgeEmbed = new Discord.RichEmbed()
    .setColor('#4c2f4')
    .setAuthor(client.user.tag, client.user.avatarURL)
    .addField('Action', 'Purge')
    .addField('Purged Amount', amount)
    .addField('Purged By', message.author)
    .addField('Purged Channel', message.channel.name);
    if (!message.guild.channels.find('name', 'logs')) {
        message.channel.send("I couldn't find a `logs` channel so I made one")
          return;
    } else {
      message.guild.channels.find('name', 'logs').send({embed: PurgeEmbed})
      return;
      }
     }
    } else {
       message.channel.send('You don\'t have the permission')
       message.guild.owner.send(`${message.author} tried to use \`purge command\``)
    }
  };
};

//Kick Command\\
if (message.content.toLowerCase().startsWith(prefix + 'kick')) {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
    return message.reply("Sorry, you don't have permissions to use this!");
}

var member = message.mentions.members.first();
var modlog = message.guild.channels.find('name', 'mod-log');

if (!modlog) {
   return message.reply (`I could not find a channel called #mod-log. Please create one to use this command!`)
}
  if(!member)
  return message.reply("Please @mention a valid member of this server");

  if(!member.kickable)
  return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
  
var reason = args.slice(1).join(' ');

  if (!reason) {
  member.kick(`No Reason - by ${message.author}`)
  .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
  message.channel.send (`**${member} was Kicked!**`).then(msg => msg.delete(3000));
  } else {
  member.kick(`${reason} - On command of ${message.author}`)
  .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
  message.channel.send (`**${member} was Kicked for \`${reason}\`**!`).then(msg => msg.delete(3000));
  member.send('You have been kicked for ' + "`" + reason + "`" + ` from ${message.guild.name} if you think you where kicked by mistake please
  contact ${message.guild.owner}.`)
};
  if (reason) {
  var reasonEmbed = new Discord.RichEmbed()
      .addField('Action', 'Kick', true)
      .addField('Moderator', message.author.tag, true)
      .addField('Reason', "`" + reason + "`")
      .setFooter('User Kicked ' + new Date())
      .setColor('#fff');
      modlog.send(reasonEmbed)
  } else {
  var reasEmbed = new Discord.RichEmbed()
     .addField('Action', 'Kick', true)
     .addField('Moderator', message.author.tag, true)
     .setFooter('User Kicked ' + new Date())
     .setColor('#fff');
     modlog.send(reasEmbed)
};
};

//Ban Command\\
if (message.content.toLowerCase().startsWith(prefix + "ban")) {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.reply("Sorry, you don't have permissions to use this!");
};

var member = message.mentions.members.first();
var modlog = message.guild.channels.find('name', 'mod-log');

if (!modlog) {
  return message.reply (`I could not find a channel called #mod-log. Please create one to use this command`)
}
if (!member)
  return message.reply("Please @mention a valid member of this server");
if (!member.ban)
  return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

var reason = args.slice(1).join(' ');

if (!reason) {
member.ban(`No Reason - by ${message.author}`)
  .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
message.channel.send (`**${member} was Banned**`).then(msg => msg.delete(3000));
} else {
member.ban(`${reason} - On command of ${message.author}`)
  .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
message.channel.send (`**${member} was Banned for \`${reason}\`**`).then(msg => msg.delete(3000));
member.send('You have been banned for' + "`" + reason + "`" + `from ${message.guild.name} if you think you where banned by mistake please
contact ${message.guild.owner}.`)
};

if (reason) {
  var reasonEmbed = new Discord.RichEmbed()
      .addField('Action', 'Ban', true)
      .addField('Moderator', message.author.tag, true)
      .addField('Reason', "`" + reason + "`")
      .setFooter('User Banned ' + new Date())
      .setColor('#fff');
      modlog.send(reasonEmbed)
} else {
  var reasEmbed = new Discord.RichEmbed()
     .addField('Action', 'Ban', true)
     .addField('Moderator', message.author.tag, true)
     .setFooter('User Banned ' + new Date())
     .setColor('#fff');
     modlog.send(reasEmbed)
};
};

});

//Logs the bot in.\\
client.login(token)