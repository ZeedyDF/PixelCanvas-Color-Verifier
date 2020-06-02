# PixelCanvas-Color-Verifier
Discord.js bot that verify if your template has the same canvas colors!

# Requirements

- Node.js.
- Discord Bot.

# How to setup?

- Open the "config.json" file with a text editor.
- Replace "Your super secret token here" with your bot token
- Replace "Your sweet prefix here" with your prefix
- Open cmd in the folder.
- Install some modules: 

- npm install discord.js
- npm install jimp2
- npm install express

4° - node checkColors.js
Now your bot should works!

# Command in discord:

>check

# How do I change the command and the prefix?

- Open the "checkColor.js" and edit the let prefix = ">" to your your prefix;
Ex: prefix = ".";
- If you want to change the command just search Prefix + "check" then you change to yours;
Ex: "checkColors", "colorsCheck", "rgbCheck";
