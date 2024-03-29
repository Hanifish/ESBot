const discord = require("discord.js");
var http = require("http");
var request = require("request");
var trim = require("trim");
var fs = require("fs");

const url = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/Boys/";
// + boy + "/" + rare + ".json"

var errMsg = new discord.RichEmbed();
errMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("Please enter in the form of `!bloom [character first name] (alias)`!")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

var oops = new discord.RichEmbed();
oops.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("An error has occurred! Try again later.")
    .setThumbnail("http://i.imgur.com/7TL0t99.png");

exports.run = (bot, msg, args) => {

    if (args.length < 2) {
        msg.channel.sendEmbed(errMsg).then(m => m.delete(4000)).catch(console.error);
        msg.delete(1500);
        return;
    } else {

        bloom(args, msg);
        return;
    }
}

exports.help = (bot, msg, args) => {
    return "To bloom a card, please use the format of `!bloom [character firstname] (alias)`.";
}

//====================================================================================================


function bloom(args, msg) {

    let boy = args[0].toLowerCase(),
        alias = args[1].toLowerCase(),
        star;

    if (alias.startsWith("r")) star = "three";
    else if (alias.startsWith("s")) star = "four";
    else if (alias.startsWith("u")) star = "five";

    let check = null;
    let list = [];

    request(url + boy + "/" + star + ".json", function(error, response, body) {
        if (error) {
            console.log(error);
            msg.channel.sendEmbed(oops).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }
        if (!(response.statusCode === 200)) {
            let embed = new discord.RichEmbed();
            embed.setTitle("Error:")
                .setColor(0xFF0040)
                .setDescription("Card was not found.")
                .setThumbnail("http://i.imgur.com/7TL0t99.png");
            msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
            msg.delete(1500);
            return;
        }
        if (!error) {
            data = JSON.parse(body);
            //console.log(data);
            for (var id in data.cards) {
                //console.log(data.cards[id].nick);
                if (data.cards[id].nick == boy.toLowerCase() && alias == data.cards[id].alias) {
                    check = id;
                    //console.log("found" + id);
                }
            }

            if (check != null) {
                let embed = new discord.RichEmbed();
                embed.setTitle(data.cards[check].name + " [" + data.cards[check].star + "★]")
                    .setURL("http://enstars.info/card/" + data.cards[check].id)
                    .setColor(0x96F08C)
                    .setImage(data.cards[check].imgbloomed);
                msg.channel.sendEmbed(embed).catch(console.error);
            } else {

                let embed = new discord.RichEmbed();
                embed.setTitle("Error:")
                    .setColor(0xFF0040)
                    .setDescription("Card was not found.")
                    .setThumbnail("http://i.imgur.com/7TL0t99.png");
                msg.channel.sendEmbed(embed).then(m => m.delete(4000)).catch(console.error);
                msg.delete(1500);
                return;

            }
        }
    });

}

function download(url, callback) {
    http.get(url, function(res) {
        var data = "";
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on("end", function() {
            callback(data);
        });
    }).on("error", function() {
        callback(null);
    });
}

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
