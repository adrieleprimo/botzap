const client = require('./client');
const qrcode = require('qrcode-terminal');
const emoji = require('node-emoji');
const logger = require('./winstonLogger');

client.once('qr', (qr)=>{
   qrcode.generate(qr, {small: true});
});

client.on('ready', ()=>{
    console.log('Client is ready');
    logger.info('Client is ready');
});

const bomDiaRegex = /\bbom\s*dia\b/i;

client.on('message', async(message) => {
    try{
    if (bomDiaRegex.test(message.body))  {
         await message.reply(`Bom dia ${emoji.get(':heart:')}`); 
         logger.info(`Replied to Bom dia message from ${message.from}`);
}   
    }catch(error){
        logger.error(`Error handling message:${error}`);
    }
});
client.initialize();