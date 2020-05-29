const Discord=require("discord.js");
const {config}=require("dotenv");
const client=new Discord.Client({
    disableEveryone:true,
});
config({path:__dirname+'/.env'});
client.once("ready",
()=>{
    console.log(`Seaase adım ${client.user.username}`),
    client.user.setPresence({
        status:"online",
        activity:{
            name:"Popstar",
            type:"WATCHING",
        }
       });
    
});
client.on("message",message=>{
const prefix="_";
if(message.author.bot){
return;
};
if(!message.guild){
return;
};
if(!message.content[0]===prefix){
    return;
    };
const args=message.content.slice(prefix.length).trim().split(/ +/g);
const cmd=args.shift().toLowerCase();
//console.log(args);
//console.log(cmd);
if(cmd==="msg" && args.length>=2){
    //console.log(args[0].toString());
    //console.log(`${args[1]}`);
    const roleIdNo=args[0].slice(3,21).toString();
    let roleMan=
    message.guild.roles.cache.find(x=> x.id==roleIdNo);
    if(roleMan!=null){
    roleMan.members.forEach(m=> {
       m.send(` From:${message.author.toString()} =>
        ${args.slice(1).join(" ").toString()}`)
    });}
    if(args[0]==="@everyone" && args.length>=2){
        let allMembers= message.guild.members.cache;

        allMembers.forEach(m=>{
            m.send(` From:${message.author.toString()} =>
             ${args.slice(1).join(" ").toString()}`)
        });

    }
    let singleMember=message.guild.members.cache.find(m=> m.id==args[0].substring(3,21));

    if(typeof singleMember !=='undefined'){
        message.guild.members.cache.find(m=> m.id==args[0].substring(3,21)).send(` From:${message.author.toString()} =>
        ${args.slice(1).join(" ").toString()}`);
    }
}
});

client.login(process.env.TOKEN);

