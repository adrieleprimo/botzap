const { Client, NoAuth} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new NoAuth(),
    webVersionCache: {
        type: "remote",
        remotePath:
        "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    },
});

client.once('qr', (qr)=>{
   qrcode.generate(qr, {small: true});
});

client.on('ready', ()=>{
    console.log('Client is ready');
});

client.on('message_create', message =>{
    if(message.body === "Bom dia!"){
        client.sendMessage(message.from, 'Bom dia!');    }
});
client.initialize();