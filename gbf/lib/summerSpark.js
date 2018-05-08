const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var summerSpark = require("./summerSpark.js");
var spark = require("./../spark.js");

const pullURL = "https://raw.githubusercontent.com/Hanifish/Granblue/master/summer.json";
//const testURL = "https://raw.githubusercontent.com/Hanifish/Enstars/master/Data/testScout.json";

var errorMsg = new discord.RichEmbed();
errorMsg.setTitle("Error:")
    .setColor(0xFF0040)
    .setDescription("An error has occurred! Try again later.")
    .setThumbnail("https://gbf.wiki/images/d/d0/Stamp21.png");

exports.spark = function(names, count, msg) {
    if (count == 300) {
        spark.generatePull(names, 0, msg);
    } else {
        let rand = Math.floor(Math.random() * 100);

        if (rand < 3) {
            //ssr
            request(pullURL, function(error, response, body) {
                if (error) {
                    console.log(error);
                    msg.channel.sendEmbed(errorMsg).then(m => m.delete(4000)).catch(console.error);
                    msg.delete(1500);
                    return;
                }
                if (!error) {
                    data = JSON.parse(body);

                    let num = Math.floor(Math.random() * data.ssr.length);

                    names.push(data.ssr[num]);

                    summerSpark.spark(names, count + 1, msg);
                }
            });
        }
        if (rand > 2) {
            //not ssr
            summerSpark.spark(names, count + 1, msg);
        }
    }
}
