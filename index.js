//YouTube Video Search package
const yts=require('yt-search');
//https module
const https=require('https');
//Import Config file
const {prefix,token,sourcecode}=require('./config.json')
//Import Discord.js module
const Discord=require('discord.js');
//Creating new Discord client
const client=new Discord.Client();

//'ready' event is triggered after login is succesful
client.once('ready', (err)=>{
    if (err) console.log(err);
    console.log('Ready!');
});

//Listening for messages
client.on('message', function(message){
    if(message.content.toLowerCase() ==='kickpuncher'){
        message.reply("Don't call me Kickpuncher. Call me, David.");
    }else{
        //store user message in array after removing prefix and spliting between spaces using regex
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();//remove command from array and change to lowercase

        switch (command) {
            case 'sourcecode'://display github repo link
                message.reply(sourcecode)
                break;
            case 'yts'://return first link of youtube video search
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
            case 'kickpunch'://kick member
                if(!message.mentions.members.size){
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
            case 'call'://set member nickname
                if(!message.mentions.members.size){
                    message.reply('Please mention the member whose nickname you want to change.');
                }else if(message.mentions.members.size){
                    if(!args[1]){
                        message.reply('Please provide a nickname.');
                    }else if(args[1]){
                        if(message.member.hasPermission('ADMINISTRATOR')){
                            let member=message.mentions.members.first();
                            member.setNickname(args[1]).then((member)=>{
                                message.channel.send(member.user.tag+" will now be called "+ args[1]);
                            });
                        }else if(!message.member.hasPermission('ADMINISTRATOR')){
                            message.reply("You're not powerful enough to do that, loser.");
                        }
                    }
                }
                break;
        }
    }
});

//Logging in to Discord using app token 
client.login(token);