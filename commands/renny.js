var request = require("superagent");
const discord = require("discord.js");

let face = {
  mouth: [
    ["v"],
    ["ᴥ"],
    ["ᗝ"],
    ["Ѡ"],
    ["ᗜ"],
    ["ヮ"],
    ["͜ʖ╮"],
    [" ͟ل͜"],
    [" ͟ل"],
    [" ͜ʖ"],
    [" ͟ʖ"],
    [" ʖ̯"],
    ["ω"],
    [" ³"],
    [" ε "],
    ["﹏"],
    ["□"],
    ["ل͜"],
    ["‿"],
    ["╭╮"],
    ["‿‿"],
    ["▾"],
    ["‸"],
    ["Д"],
    ["∀"],
    ["꒳"],
    ["!"],
    ["人"],
    ["."],
    ["ロ"],
    ["_"],
    ["෴"],
    ["ꔢ"],
    ["ѽ"],
    ["ഌ"],
    ["⏠"],
    ["⏏"],
    ["⍊"],
    ["⍘"],
    ["ツ"],
    ["益"],
    ["╭∩╮"],
    ["Ĺ̯"],
    ["◡"],
    [" ͜つ"],
    ["◞ "],
    ["ヘ"],
    ["💋"],
    ["👄"],
    ["👃"],
    ["👅"],
    ["▽"],
    ["っ"],
    ["▿"],
    ["×"],
    ["ㅅ"],
    ["㉨"],
    ["w"],
    ["⌒"],
    ["︵"]
  ],
  eyes: [
    ["⌐■", "■"],
    [" ͠°", " °"],
    ["⇀", "↼"],
    ["´• ", " •\`"],
    ["´", "\`"],
    ["\`", "´"],
    ["ó", "ò"],
    ["ò", "ó"],
    [">", "<"],
    ["Ƹ̵̡", "Ʒ"],
    ["ᗒ", "ᗕ"],
    ["⪧", "⪦"],
    ["⪦", "⪧"],
    ["⪩", "⪨"],
    ["⪨", "⪩"],
    ["⪰", "⪯"],
    ["⫑", "⫒"],
    ["⨴", "⨵"],
    ["⩿", "⪀"],
    ["⩾", "⩽"],
    ["⩺", "⩹"],
    ["⩹", "⩺"],
    ["◥▶", "◀◤"],
    ["◍", "◎"],
    ["/͠-", " ͝-\\"],
    ["⌣", "⌣”"],
    [" ͡⎚", " ͡⎚"],
    ["≋","≋"],
    ["૦ઁ","૦ઁ"],
    ["  ͯ","  ͯ"],
    ["  ͌","  ͌"],
    ["ꗞ","ꗞ"],
    ["ꔸ","ꔸ"],
    ["꘠","꘠"],
    ["ꖘ","ꖘ"],
    ["܍","܍"],
    ["ළ","ළ"],
    ["◉","◉"],
    ["☉","☉"],
    ["・","・"],
    ["▰","▰"],
    ["ᵔ","ᵔ"],
    [" ﾟ"," ﾟ"],
    ["□","□"],
    ["☼","☼"],
    ["\*","*"],
    ["\`","\`"],
    ["⚆","⚆"],
    ["⊜","⊜"],
    [">",">"],
    ["❍","❍"],
    ["￣","￣"],
    ["─","─"],
    ["✿","✿"],
    ["•","•"],
    ["T","T"],
    ["^","^"],
    ["@","@"],
    ["ȍ","ȍ"],
    ["x","x"],
    ["-","-"],
    ["$","$"],
    ["Ȍ","Ȍ"],
    ["ʘ","ʘ"],
    ["๏","๏"],
    ["ⴲ","ⴲ"],
    [" ﾟ"," ﾟ"],
    ["◕","◕"],
    ["◔","◔"],
    ["✧","✧"],
    ["■","■"],
    ["♥","♥"],
    ["♡", "♡"],
    [" ͡°"," ͡°"],
    ["¬","¬"],
    [" º "," º "],
    ["⨶","⨶"],
    ["⨱","⨱"],
    ["⍜","⍜"],
    ["⍤","⍤"],
    ["ᚖ","ᚖ"],
    ["ᴗ","ᴗ"],
    ["ಠ","ಠ"],
    ["σ","σ"],
    ["☯","☯"],
    ["の","の"],
    ["￢ ","￢ "],
    ["э","э"],
    ["👁️","👁️"],
    ["👀","👀"],
    ["eye", "eye"],
    ["👁️‍🗨️", "👁️‍🗨️"],
    ["╹","╹"],
    ["❀","❀"],
    ["✪","✪"],
    ["≧","≦"],
    ["★","★"],
    ["°","°"],
    ["☆","☆"],
    ["⌒","⌒"],
    ["´• "," •\`"],
    ["눈","눈"],
    ["ಥ", "ಥ"],
    ["Φ","Φ"],
    ["×", "×"]
  ],
  ears: [
    ["q", "p"],
    ["ʢ", "ʡ"],
    ["d", "b"],
    ["ʕ", "ʔ"],
    ["ᖗ", "ᖘ"],
    ["ᕦ", "ᕥ"],
    ["ᕦ(", ")ᕥ"],
    ["ᕙ(", ")ᕗ"],
    ["ᘳ", "ᘰ"],
    ["ᕮ", "ᕭ"],
    ["ᕳ", "ᕲ"],
    ["(", ")"],
    ["[", "]"],
    ["¯\\\\\\_", "_/¯"],
    ["୧", "୨"],
    ["୨", "୧"],
    ["⤜(", ")⤏"],
    ["☞", "☞"],
    ["(╭☞", ")╭☞"],
    ["ᑫ", "ᑷ"],
    ["ᑴ", "ᑷ"],
    ["ヽ(", ")ﾉ"],
    ["\\\\\\(", ")/"],
    ["乁(", ")ㄏ"],
    ["└[", "]┘"],
    ["(づ", ")づ"],
    ["(ง", ")ง"],
    ["⎝", "⎠"],
    ["ლ(", "ლ)"],
    ["ᕕ(", ")ᕗ"],
    ["(∩", ")⊃━☆ﾟ.*"],
    ["【", "】"],
    ["﴾", "﴿"],
    ["﴾✿", "﴿"],
    ["(❀", ")"],
    ["(╯", "）╯︵ ┻━┻"],
    ["|","|"],
    ["(ﾉ", ")ﾉ*:･ﾟ✧"],
    ["(","ʋ)"],
    ["(๑",")"],
    ["Σ(",")"],
    ["(",")ゞ"],
    ["d(", ")"],
    ["q(", ")"],
    ["凸(",")凸"],
    ["☆\*:.｡.o(",")o.｡.:*☆"],
    ["┐(",")┌"],
    ["╮(",")╭"],
    ["ヽ(", " )ノ"],
    ["(⊃",")⊃"],
    ["⊂(","⊂)"],
    ["ε=ε=ε=ε=┌(",")┘"],
    ["ヽ(",")ノ=3=3=3"],
    ["｀、ヽ｀ヽ｀、ヽ(ノ",")ノ ｀、ヽ｀☂ヽ｀、ヽ  "]
  ]
}



exports.run = (bot, msg, args) => {

	let rMouth = face.mouth[Math.floor(Math.random() * (face.mouth.length))];
	let rEyes = face.eyes[Math.floor(Math.random() * (face.eyes.length))];
	let rEars = face.ears[Math.floor(Math.random() * (face.ears.length))];

	let tempFace = "" + rEars[0] + rEyes[0] + rMouth[0] + rEyes[1] + rEars[1];

    let embed = new discord.RichEmbed();
    embed.setColor(0xFFB6C1)
        .setDescription(tempFace);

    msg.channel.sendEmbed(embed).catch(console.error);

}

exports.help = (bots, msg, args) => {
    return "( ͡° ͜ʖ ͡° )?";
}