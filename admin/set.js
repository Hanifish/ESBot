const discord = require("discord.js");
var fs = require('fs');
var fileName = "../db/servers.json";
var file = require(fileName);

exports.run = (bot, msg, args) => {

	if (args[0].toLowerCase() == "banalerts") {
		let value = args.slice(1);

		if (value[0].toLowerCase() == "false" || value[0].toLowerCase() == "off") {
			file[msg.guild.id].banAlerts = false;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating banalerts in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Ban Alerts** set to off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
		}

		else if (value[0].toLowerCase() == "true" || value[0].toLowerCase() == "on") {
			file[msg.guild.id].banAlerts = true;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating banalerts in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Ban Alerts** set to on.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("Ban Alerts can only be set to on/off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
		}

	}
//=========================================================================
	if (args[0].toLowerCase() == "notify") {
		let value = args.slice(1);

		if (value[0].toLowerCase() == "false" || value[0].toLowerCase() == "off") {
			file[msg.guild.id].notify = false;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating notifications in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Notifications** set to off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
		}

		else if (value[0].toLowerCase() == "true" || value[0].toLowerCase() == "on") {
			file[msg.guild.id].notify = true;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating notifications in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Notifications** set to on.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("Notifications can only be set to on/off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
		}

	}
//=========================================================================
	if (args[0].toLowerCase() == "greet") {
		let value = args.slice(1);

		if (value[0].toLowerCase() == "false" || value[0].toLowerCase() == "off") {
			file[msg.guild.id].greet = false;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating greetings in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Greetings** set to off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
		}

		else if (value[0].toLowerCase() == "true" || value[0].toLowerCase() == "on") {
			file[msg.guild.id].greet = true;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating greetings in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Greetings** set to on.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("Greetings can only be set to on/off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
		}

	}
//=========================================================================
	if (args[0].toLowerCase() == "tags") {
		let value = args.slice(1);

		if (value[0].toLowerCase() == "false" || value[0].toLowerCase() == "off") {
			file[msg.guild.id].tags = false;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating tagging in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Self-tagging** set to off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
		}

		else if (value[0].toLowerCase() == "true" || value[0].toLowerCase() == "on") {
			file[msg.guild.id].tags = true;

			fs.writeFile(fileName, JSON.stringify((file)), function (err) {
		 		if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating tagging in ' + fileName);
			});

			updateSettings();

			let embed = new discord.RichEmbed();

			embed.setTitle("Confirmation:")
				.setColor(0x3399FF)
				.setDescription("**Self-taggin** set to on.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
		}

		else {
			let embed = new discord.RichEmbed();

			embed.setTitle("Error:")
				.setColor(0xFF0040)
				.setDescription("Self-tagging can only be set to on/off.")
				.setThumbnail("http://i.imgur.com/7TL0t99.png");
			msg.channel.sendEmbed(embed).catch(console.error);
		}

	}

//=========================================================================

if (args[0].toLowerCase() == "check") {
	let embed = new discord.RichEmbed();

	embed.setTitle("Server Settings for: " + msg.guild.name)
		.setColor(0x3399FF)
		.addField("Notifications", file[msg.guild.id].notify)
		.addField("Greetings", file[msg.guild.id].greet)
		.addField("Ban Alerts", file[msg.guild.id].banAlerts)
		.addField("Tagging", file[msg.guild.id].tags)
		.setThumbnail("http://i.imgur.com/7TL0t99.png");
		if (file[msg.guild.id].welcome != "") {
			embed.addField("Welcome Msg", file[msg.guild.id].welcome);
		}
		else {
			embed.addField("Welcome Msg", "None");
		}
	msg.channel.sendEmbed(embed).catch(console.error);
}

//=========================================================================

	else {
		let embed = new discord.RichEmbed();

		embed.setTitle("Error:")
			.setColor(0xFF0040)
			.setDescription("Only `banAlerts, notify, greet, tags` are allowed.")
			.setThumbnail("http://i.imgur.com/7TL0t99.png");
		msg.channel.sendEmbed(embed).catch(console.error);
	}

}

exports.help = (bot, msg, args) => {
	return "Use `set check` to see server settings or `set [var] [value]` to change the server settings.  Allowed: `banAlerts, notify, greet, tags`";
}

function updateSettings() {
	fs.writeFile(__dirname + '/../db/servers-temp.json', JSON.stringify(file, null, 4), error=>{
		if (error) console.log(error)
		else {
			fs.stat(__dirname + '/../db/servers-temp.json', (err, stats)=>{
				if (err) console.log(err)
				else if (stats["size"] < 2) console.log('Prevented servers from being overwritten');
				else {
					fs.rename(__dirname + '/../db/servers-temp.json', __dirname + '/../db/servers.json', e=>{if(e)console.log(e)});
				}
			});
		}
	})
}