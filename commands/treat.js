const discord = require("discord.js");
const config = require("../config.json");
var treset = require("./treat.js");
var fs = require('fs');
var fileName = "./../db/servers.json";
var file = require(fileName);

exports.run = (bot, msg, args) => {

	if (args.length > 0 && args[0].toLowerCase() == "reset" && msg.author.id == config.admin_id) {
		//console.log(file[msg.guild.id]);

		treset.reset(bot);
		return;
	}

	if (args.length > 0 && args[0].toLowerCase() == "check") {
		//console.log(file[msg.guild.id]);

		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("Today's Daily Treats")
			.setThumbnail("http://i.imgur.com/gUWJl0u.png")
			.setDescription("Daikichi has gotten " + file[msg.guild.id].treats + " treats today! ❤️️");

		msg.channel.sendEmbed(embed).catch(console.error);
		
	}

	else if ( !isNaN(args[0]) ) {
		
		if ( parseInt(args[0]) < 11 && parseInt(args[0]) > 1) {

			file[msg.guild.id].treats = parseInt(file[msg.guild.id].treats) + parseInt(args[0]);

			fs.writeFile(fileName, JSON.stringify(parseInt(file),null,4), function (err) {
	  			if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating daily treats in ' + fileName);
			});

			updateTreats();

			let embed = new discord.RichEmbed();
			embed.setColor(0xFFB6C1)
				.setTitle("You have given Daikichi " + parseInt(args[0]) + " treats.")
				.setThumbnail("http://i.imgur.com/gUWJl0u.png")
				.setDescription("He is pleased.  Today's treats: " + file[msg.guild.id].treats + " ❤️️");

			msg.channel.sendEmbed(embed).catch(console.error);
		}

		else if ( parseInt(args[0]) == 1) {

			file[msg.guild.id].treats = parseInt(file[msg.guild.id].treats) + parseInt(args[0]);

			fs.writeFile(fileName, JSON.stringify(parseInt(file),null,4), function (err) {
	  			if (err) return console.log(err);
				//console.log(JSON.stringify(file));
				console.log('updating daily treats in ' + fileName);
			});

			updateTreats();

			let embed = new discord.RichEmbed();
			embed.setColor(0xFFB6C1)
				.setTitle("You have given Daikichi a treat.")
				.setThumbnail("http://i.imgur.com/gUWJl0u.png")
				.setDescription("He is pleased.  Today's treats: " + file[msg.guild.id].treats + " ❤️️");

			msg.channel.sendEmbed(embed).catch(console.error);
		}

		else {
			let embed = new discord.RichEmbed();
			embed.setColor(0xFF0040)
				.setTitle("Error:")
				.setThumbnail("http://i.imgur.com/gUWJl0u.png")
				.setDescription("The max amount of treats Daikichi can receive at one time is 10!");

			msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
			msg.delete(1500);
		}
	}

	else {	
		//console.log(file.dailyTreats);

		//file.dailyTreats = parseInt(file.dailyTreats) + 1;
		//console.log(file[msg.guild.id].treats);
		file[msg.guild.id].treats = parseInt(file[msg.guild.id].treats) + 1;

		fs.writeFile(fileName, JSON.stringify(parseInt(file),null,4), function (err) {
  			if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('updating daily treats in ' + fileName);
		});

		updateTreats();

		let embed = new discord.RichEmbed();
		embed.setColor(0xFFB6C1)
			.setTitle("You have given Daikichi a treat.")
			.setThumbnail("http://i.imgur.com/gUWJl0u.png")
			.setDescription("He is pleased.  Today's treats: " + file[msg.guild.id].treats + " ❤️️");

		msg.channel.sendEmbed(embed).catch(console.error);
	}
	
}

exports.reset = (bot) => {

	for(var id in file){
		//console.log(id+": "+file[treats].treats);
	    file[id].treats = 0;

		fs.writeFile(fileName, JSON.stringify(parseInt(file),null,4), function (err) {
	  		if (err) return console.log(err);
			//console.log(JSON.stringify(file));
			console.log('resetting daily treats in ' + fileName);
			console.log('treats reset ');
		});
	}

	updateTreats();
}

exports.help = (bot, msg, args) => {
	return "To give Daikichi a treat, just use `!treat`. You can check how many treats he's gotten per day with `!treat check`.";
}

/*==============FUNCTIONS===============*/

function updateTreats() {
	fs.writeFile(__dirname + '/../db/servers-temp.json', JSON.stringify(file,null,4), error=>{
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
	});
}