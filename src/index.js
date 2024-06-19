const client = require('./client');
const qrcode = require('qrcode-terminal');
const emoji = require('node-emoji');

client.once('qr', (qr)=>{
   qrcode.generate(qr, {small: true});
});

client.on('ready', ()=>{
    console.log('Client is ready');
});

const bomDiaRegex = /\bbom\s*dia\b/i;

client.on('message', async(message) => {
    if (bomDiaRegex.test(message.body))  {
         await message.reply(`Bom dia ${emoji.get(':heart:')}`); 
}
});
client.initialize();