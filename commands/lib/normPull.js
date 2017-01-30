const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var normPull = require("./normPull.js");
var scout = require("./../scout.js");

const link = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/NormalScout.json";
const testURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/testScout.json";

exports.tenPull = function(list, names, count, msg) {
	if(count == 10) {
		scout.generatePull(list, names, 0, msg);
	}
	else if (count == 0) {
		let rand = Math.floor(Math.random() * 1000);
		
		if (rand < 15) {
			request(link, function(error, response, body) {
				if (error) { console.log(error); }
				if (!error) { 
					data = JSON.parse(body);
					let num = Math.floor(Math.random() * data.five.length);

					list.push(data.five[num].img);
					names.push(data.five[num].name);

					normPull.tenPull(list, names, 1, msg);
				}
			});
		}
		if (rand > 14 ){
			//4star
				request(link, function(error, response, body) {
					if (error) { console.log(error); }
					if (!error) { 
						data = JSON.parse(body);

						let num = Math.floor(Math.random() * data.four.length);

						list.push(data.four[num].img);
						names.push(data.four[num].name);

						normPull.tenPull(list, names, 1, msg);
					}
				});
		}
	}

	else {
		let rand = Math.floor(Math.random() * 1000);
		
		if (rand < 15) {
			request(link, function(error, response, body) {
				if (error) { console.log(error); }
				if (!error) { 
					data = JSON.parse(body);
					let num = Math.floor(Math.random() * data.five.length);

					list.push(data.five[num].img);
					names.push(data.five[num].name);

					normPull.tenPull(list, names, count+1, msg);
				}
			});
		}
		if (rand > 14 && rand < 81){
			//4star
				request(link, function(error, response, body) {
					if (error) { console.log(error); }
					if (!error) { 
						data = JSON.parse(body);

						let num = Math.floor(Math.random() * data.four.length);

						list.push(data.four[num].img);
						names.push(data.four[num].name);

						normPull.tenPull(list, names, count+1, msg);
					}
				});
			
		}
		if (rand > 80){
			//4star
				request(link, function(error, response, body) {
					if (error) { console.log(error); }
					if (!error) { 
						data = JSON.parse(body);

						let num = Math.floor(Math.random() * data.three.length);

						list.push(data.three[num].img);
						names.push(data.three[num].name);

						normPull.tenPull(list, names, count+1, msg);
					}
				});
			}
		}
	}

exports.solo = function(msg) {
	let rand = Math.floor(Math.random() * 1000);
	if (rand < 15) {
		request(link, function(error,response,body) {
			if (error) { console.log(error) ;}
			if (!error) {
					data = JSON.parse(body);

					let num = Math.floor(Math.random() * data.five.length);

					let id = msg.author.id;
					let embed = new discord.RichEmbed();
						embed.setTitle(msg.guild.member(id).displayName + "'s Scouting Results")
							.setURL("http://enstars.info/card/" + data.five[num].id)
				        	.setColor(0x96F08C)
				        	.setThumbnail(data.five[num].img)
				        	.setDescription(data.five[num].name);
				    msg.channel.sendEmbed(embed).catch(console.error);
			}
		});
	}

	if (rand > 14 && rand < 81) {
		request(link, function(error,response,body) {
			if (error) { console.log(error) ;}
			if (!error) {
					data = JSON.parse(body);

					let num = Math.floor(Math.random() * data.four.length);

					let id = msg.author.id;
					let embed = new discord.RichEmbed();
						embed.setTitle(msg.guild.member(id).displayName + "'s Scouting Results")
							.setURL("http://enstars.info/card/" + data.four[num].id)
				        	.setColor(0x96F08C)
				        	.setThumbnail(data.four[num].img)
				        	.setDescription(data.four[num].name);
				    msg.channel.sendEmbed(embed).catch(console.error);
			}
		});
	}

	if (rand > 80) {
		request(link, function(error,response,body) {
			if (error) { console.log(error) ;}
			if (!error) {
					data = JSON.parse(body);

					let num = Math.floor(Math.random() * data.three.length);

					let id = msg.author.id;
					let embed = new discord.RichEmbed();
						embed.setTitle(msg.guild.member(id).displayName + "'s Scouting Results")
							.setURL("http://enstars.info/card/" + data.three[num].id)
				        	.setColor(0x96F08C)
				        	.setThumbnail(data.three[num].img)
				        	.setDescription(data.three[num].name);
				    msg.channel.sendEmbed(embed).catch(console.error);
			}
		});
	}
}

function download(url, callback) {
	http.get(url, function(res) {
		var data = "";
		res.on('data', function (chunk) {
			data += chunk;
		});
		res.on("end", function() {
			callback(data);
		});
	}).on("error", function() {
		callback(null);
	});
}