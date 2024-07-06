const client = require('./client');
const qrcode = require('qrcode-terminal');
const logger = require('./winstonLogger');
const { goodMorningAnswer } = require('./controller/goodMorning');

client.once('qr', (qr)=>{
   qrcode.generate(qr, {small: true});
});

client.on('ready', ()=>{
    console.log('Client is ready');
    logger.info('Client is ready');
});


client.on('message', async(message) => {
    await goodMorningAnswer(client, message, logger);
});
client.initialize();