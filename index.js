//YouTube Video Search package
const yts=require('yt-search');
//Import Config file
const {prefix,token,sourcecode}=require('./config.json')
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
    if(message.content.toLowerCase() ==='kickpuncher'){
        message.reply("Don't call me Kickpuncher. Call me, David.");
    }else{
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        switch (command) {
            case 'sourcecode':
                message.reply(sourcecode)
                break;
            case 'yts':
                if(!args) message.reply('Please provide a search term.');
                let searchterm=args.join(" ");
                yts( searchterm, function ( err, r ) {
                    if(err){
                        console.log(err);
                    }
                    const video = r.videos[0].url;
                    message.channel.send(video);
                });
                break;
            case 'kickpunch':
                if(!message.mentions.users.size){
                    message.reply('Please mention the member who you want to get Kickpunched.');
                }
                if(message.member.hasPermission('ADMINISTRATOR')){
                    let member=message.mentions.members.first();
                    member.kick().then((member)=>{
                        message.channel.send(member.displayName+" has been kickpunched!");
                    });
                }else{
                    message.reply("You are not powerful enough to do that, loser.");
                }
                break;
        }
    }
});

//Logging in to Discord using app token 
client.login(token);