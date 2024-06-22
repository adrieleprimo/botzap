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
        let contact = (await client.getContactById(message.from)).name;
        if (bomDiaRegex.test(message.body)){
            let replyMessage = `Bom dia ${contact}${emoji.get(':heart:')}`;
            if(!contact){
                replyMessage = `Bom dia ${emoji.get(':heart:')}`;
            }
            await message.reply(replyMessage); 
            logger.info(`Replied to Bom dia message from ${message.from}`); 
    }        
}catch(error){
        logger.error(`Error handling message:${error}`);
}
});
client.initialize();