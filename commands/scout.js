const discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var gm = require("gm");
var scout = require("./scout.js");
var eventPull = require("./lib/eventPull.js");
var normPull = require("./lib/normPull.js");
var ptsPull = require("./lib/ptsPull.js");

var scoutError = new discord.RichEmbed();
scoutError.setTitle("You're going too fast!")
    .setColor(0x96F08C)
    .setDescription("The Adoarmy arrives..");

var dir = './img/';
var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        //console.log('content-type:', res.headers['content-type']);
        //console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

exports.run = (bot, msg, args) => {

    if (args.length < 2) {
        let embed = new discord.RichEmbed();
        embed.setTitle("Error:")
            .setColor(0xFF0040)
            .setDescription("Please enter in the format of `scout [event/dia/points] [1/10]`!")
            .setThumbnail("http://i.imgur.com/7TL0t99.png");
        msg.channel.sendEmbed(embed).catch(console.error);
        return;
    }

    if (args[0].toLowerCase() == "event") {

        if (args[1] == "10") {

            let list = [];
            let names = [];
            eventPull.tenPull(list, names, 0, msg);
            return;
        } else if (args[1] == "1" || args[1].toLowerCase() == "solo") {
            eventPull.solo(msg);
            return;
        }
    }

    if (args[0].toLowerCase() == "normal" || args[0].toLowerCase() == "norm" || args[0].toLowerCase() == "dia") {

        if (args[1] == "10") {

            let list = [];
            let names = [];
            normPull.tenPull(list, names, 0, msg);
            return;
        } else if (args[1] == "1" || args[1].toLowerCase() == "solo") {
            normPull.solo(msg);
            return;
        }
    }

    if (args[0].toLowerCase() == "points" || args[0].toLowerCase() == "pts" || args[0].toLowerCase() == "point" || args[0].toLowerCase() == "pt") {

        if (args[1] == "10") {

            let list = [];
            let names = [];
            ptsPull.tenPull(list, names, 0, msg);
            return;
        } else if (args[1] == "1" || args[1].toLowerCase() == "solo") {
            ptsPull.solo(msg);
            return;
        }
    }
    let embed = new discord.RichEmbed();
    embed.setTitle("Error:")
        .setColor(0xFF0040)
        .setDescription("Scout not found! Woof! 🐾")
        .setThumbnail("http://i.imgur.com/7TL0t99.png");
    msg.channel.sendEmbed(embed).catch(console.error);
}

exports.help = (bot, msg, args) => {
    return "To pull from the gacha, please use the format of `!scout [event/normal/points] [1/10]`.";
}

exports.generatePull = function(list, names, count, msg) {
    if (count == 0) {
        download(list[0], dir + 'base' + msg.author.id + '.png', function() {

            gm(dir + 'base' + msg.author.id + '.png').resize(null, 156)
                .write(dir + 'base' + msg.author.id + '.png', function(err) {
                    if (!err) {
                        console.log("Written composite image.");
                        scout.generatePull(list, names, count + 1, msg);
                    } else if (err) {
                        console.log(err);
                        msg.author.sendEmbed(scoutError).catch(console.error);
                        msg.author.sendFile(dir + '10pull.png', "error.png");
                        return;
                    }
                });
        });
    } else if (count == 5) {
        download(list[count], dir + 'row' + msg.author.id + '.png', function() {

            gm(dir + 'row' + msg.author.id + '.png').resize(null, 156)
                .write(dir + 'row' + msg.author.id + '.png', function(err) {
                    if (!err) {

                        scout.generatePull(list, names, count + 1, msg);
                    } else if (err) {
                        console.log(err);
                        msg.author.sendEmbed(scoutError).catch(console.error);
                        msg.author.sendFile(dir + '10pull.png', "error.png");
                        return;
                    }
                });
        });
    } else if (count > 5 && count < 10) {
        download(list[count], dir + 'temp' + msg.author.id + '.png', function() {

            gm(dir + 'temp' + msg.author.id + '.png').resize(null, 156)
                .write(dir + 'temp' + msg.author.id + '.png', function(err) {
                    if (!err) {

                        gm(dir + 'row' + msg.author.id + '.png').append(dir + 'temp' + msg.author.id + '.png', true)
                            .write(dir + 'row' + msg.author.id + '.png', function(err) {
                                if (!err) {

                                    scout.generatePull(list, names, count + 1, msg);
                                } else if (err) {
                                    console.log(err);
                                    msg.author.sendEmbed(scoutError).catch(console.error);
                                    msg.author.sendFile(dir + '10pull.png', "error.png");
                                    return;
                                }
                            })
                    } else if (err) {
                        console.log(err);
                        msg.author.sendEmbed(scoutError).catch(console.error);
                        msg.author.sendFile(dir + '10pull.png', "error.png");
                        return;
                    }
                });
        });
    } else if (count == 10) {

        gm(dir + 'base' + msg.author.id + '.png').append(dir + 'row' + msg.author.id + '.png')
            .write(dir + 'scout' + msg.author.id + '.png', function(err) {
                if (!err) {
                    let id = msg.author.id;

                    let embed = new discord.RichEmbed();
                    embed.setTitle(msg.author + "'s Scouting Results")
                        .setColor(0x96F08C)
                        .setDescription(names.join(" ★ "));
                    //.setDescription("•" + names.join("\n•"));
                    msg.author.sendEmbed(embed).catch(console.error);

                    msg.author.sendFile(dir + 'scout' + msg.author.id + '.png', "scout.png").then(
                        function() {
                            fs.unlink(dir + 'temp' + msg.author.id + '.png', function() {
                                fs.unlink(dir + 'base' + msg.author.id + '.png', function() {
                                    fs.unlink(dir + 'row' + msg.author.id + '.png', function() {
                                        fs.unlink(dir + 'scout' + msg.author.id + '.png', function() {
                                            return;
                                        });
                                    });
                                });
                            });
                        });

                    /*let note = new discord.RichEmbed();
                    note.setTitle("Finished!")
                        .setColor(0x96F08C)
                        .setDescription("Finished processing " + msg.author + "'s scout!")
                        .setThumbnail("http://i.imgur.com/7TL0t99.png");
                    msg.channel.sendEmbed(note).catch(console.error)*/

                } else if (err) {
                    console.log(err);
                    msg.author.sendEmbed(scoutError).catch(console.error);
                    msg.author.sendFile(dir + '10pull.png', "error.png");
                    return;
                }
            });

    } else {
        download(list[count], dir + 'temp' + msg.author.id + '.png', function() {
            gm(dir + 'temp' + msg.author.id + '.png').resize(null, 156)
                .write(dir + 'temp' + msg.author.id + '.png', function(err) {
                    if (!err) {

                        gm(dir + 'base' + msg.author.id + '.png').append(dir + 'temp' + msg.author.id + '.png', true)
                            .write(dir + 'base' + msg.author.id + '.png', function(err) {
                                if (!err) {
                                    scout.generatePull(list, names, count + 1, msg);
                                } else if (err) {
                                    console.log(err);
                                    msg.author.sendEmbed(scoutError).catch(console.error);
                                    msg.author.sendFile(dir + '10pull.png', "error.png");
                                    return;
                                }
                            })
                    } else if (err) {
                        console.log(err);
                        msg.author.sendEmbed(scoutError).catch(console.error);
                        msg.author.sendFile(dir + '10pull.png', "error.png");
                        return;
                    }
                });
        });
    }

}
