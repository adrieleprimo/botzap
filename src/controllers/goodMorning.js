const emoji = require('node-emoji');
const bomDiaRegex = /\bbom\s*dia\b/i;

async function generateReplyMessage(client, message){
    let contact = (await client.getContactById(message.from)).name;
    let group = ((await client.getChatById(message.from)).isGroup);
    let replyMessage = `Bom dia, ${contact}${emoji.get(':heart:')}`;

    if(!contact || group){
        replyMessage = `Bom dia ${emoji.get(':heart:')}`;
    }

    return replyMessage;
}

async function goodMorningAnswer(client, message, logger){
    try{
        if (bomDiaRegex.test(message.body)) {
            const replyMessage = await generateReplyMessage(client, message);
            await message.reply(replyMessage);
            logger.info(`Replied to Bom dia message from ${message.from}`);
          }
    }catch(error){
        logger.error(`Error handling message: ${error}`);
    }
}

module.exports = {
    goodMorningAnswer
}