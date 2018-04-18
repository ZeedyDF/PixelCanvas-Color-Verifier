// Variables
const Discord = require("discord.js"),
    client = new Discord.Client(),
    fs = require('fs'),
      // JIMP was the best manipulate PNG module I found
    PNG = require('jimp2'),
    https = require('https'),
    Stream = require('stream').Transform,
    http = require('http'),
    express = require('express'),
    app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 3600000);

// Bot running
client.on('ready', () => {
    console.log("Bot Running Yay! Developed by Zeedy")
});

// Bot on message
client.on('message', message => {
    let Prefix = ">";
    let PREFIX = Prefix;

    if (message.content.toLowerCase() == Prefix + "check") {
        // Check if the command has a url;
        var Attachment = (message.attachments).array();
        if (Attachment.length == 0) return message.reply("You must send the template image!");
        // Fun startTyping, I literally don't know how it works that's why I put 1000000000
        message.channel.startTyping(1);
        // Get the attachment url
        var url = Attachment[0].url;
        var check = url.endsWith(".png");
        if(check == false) return message.reply("You upload must a PNG image");
        // Downloading the image
        var certos = 0;
        var errados = 0;
        var pixeis = 0;
        var x;
        var y;
        var time = (new Date()).getTime();
        // Using jimp to read the IMAGE
        PNG.read(url, function(err, image) {
            for (y = 0; y < image.bitmap.height; y++) {
                for (x = 0; x < image.bitmap.width; x++) {
                    pixeis++;
                    let tamanho = image.bitmap.height * image.bitmap.width;
                    var cinza = PNG.rgbaToInt(228, 228, 228, 255);
                    // Checking how many were checked and compare with the image size
                    if (pixeis >= tamanho) {
                        // Finishing the edits
                        image.write("./templates/" + time + "1.png");
                        console.log("Response in: " + (new Date().getTime() - message.createdTimestamp))
                        // if no errors send the message  
                        if (errados == 0) message.reply("There are " + errados + "/" + tamanho + " non canvas colors in this template (errors/imagesize)");
                        else {
                            // sending the attachment
                            setTimeout(() => {
                                message.reply("There are " + errados + "/" + tamanho + " non canvas colors in this template (errors/imagesize)", {
                                    files: [{
                                        attachment: './templates/' + time + '1.png',
                                        name: 'wrongColors.png'
                                    }]
                                })
                                message.channel.stopTyping(true);
                            }, 1500);
                        }
                        // deleting the attachment
                        setTimeout(() => {
                            fs.unlink('./templates/' + time + '1.png', function(err) {
                                if (err) console.log(err);
                            });
                        }, 5000);
                    }
                    // getting the int of the x, y
                    // then converting it to rgba
                    let color1 = JSON.stringify(PNG.intToRGBA(image.getPixelColor(x, y)));
                    let color = getColorID(JSON.stringify(PNG.intToRGBA(image.getPixelColor(x, y))));
                    if (color == -1) {
                        errados++;
                        var vermelho = PNG.rgbaToInt(255, 0, 0, 255);
                        // setting red as wrong pixels in image
                        image.setPixelColor(vermelho, x, y);
                    } else {
                        if (color == -2) continue;
                        var colorjson = PNG.intToRGBA(image.getPixelColor(x, y));
                        // getting the RGBA and changing it opacity
                        var transparente = PNG.rgbaToInt(colorjson.r, colorjson.g, colorjson.b, 50);
                        image.setPixelColor(transparente, x, y);
                    };

                }

            }
        });
        // read the rgb and take the color from it
        function getColorID(rgb) {
            switch (rgb) {
                case '{"r":255,"g":255,"b":255,"a":255}':
                    return 0;
                    break;
                case '{"r":228,"g":228,"b":228,"a":255}':
                    return 1;
                    break;
                case '{"r":136,"g":136,"b":136,"a":255}':
                    return 2;
                    break;
                case '{"r":34,"g":34,"b":34,"a":255}':
                    return 3;
                    break;
                case '{"r":255,"g":167,"b":209,"a":255}':
                    return 4;
                    break;
                case '{"r":229,"g":0,"b":0,"a":255}':
                    return 5;
                    break;
                case '{"r":229,"g":149,"b":0,"a":255}':
                    return 6;
                    break;
                case '{"r":160,"g":106,"b":66,"a":255}':
                    return 7;
                    break;
                case '{"r":229,"g":217,"b":0,"a":255}':
                    return 8;
                    break;
                case '{"r":148,"g":224,"b":68,"a":255}':
                    return 9;
                    break;
                case '{"r":2,"g":190,"b":1,"a":255}':
                    return 10;
                    break;
                case '{"r":0,"g":211,"b":221,"a":255}':
                    return 11;
                    break;
                case '{"r":0,"g":131,"b":199,"a":255}':
                    return 12;
                    break;
                case '{"r":0,"g":0,"b":234,"a":255}':
                    return 13;
                    break;
                case '{"r":207,"g":110,"b":228,"a":255}':
                    return 14;
                    break;
                case '{"r":130,"g":0,"b":128,"a":255}':
                    return 15;
                    break;
                    // transparent
                case '{"r":0,"g":0,"b":0,"a":0}':
                    return -2;
                    break;
                    // none of the other colors
                default:
                    return -1;
                    break;
            }
        }

    }
});
client.login("Your_Token_Here");