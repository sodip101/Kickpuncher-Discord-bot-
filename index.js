//Import Config file
const config=require('./config.json')
//Import Discord.js module
const Discord=require('discord.js');
//Creating new Discord client
const client=new Discord.Client();

//'ready' event is triggered after login is succesful
client.once('ready', ()=>{
    console.log('Ready!');
});

//Listening for messages
client.on('message', message=>{
    let message_data=message.content;
    if(message_data ==='Kickpuncher'){
        message.reply("Don't call me Kickpuncher. Call me, David.");
    }
    else if(message_data.startsWith(config.prefix+"kickpunch")){
        if(message.member.hasPermission('ADMINISTRATOR')){
            let member=message.mentions.members.first();
            member.kick().then((member)=>{
                message.channel.send(member.displayName+" has been kickpunched!");
        });
        }else{
            message.reply("You are not powerful enough to do that, loser.");
        }
    }else if(message_data.startsWith(config.prefix+"sourcecode")){
        message.reply('https://github.com/sodip101/Kickpuncher-Discord-bot-');
    }
});

//Logging in to Discord using app token 
client.login(config.token);