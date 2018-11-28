exports.run = (client, message) => {
    var VC = message.member.voiceChannel;
    if(!VC) {
        return message.channel.send("```Вы не находитесь не в одном голосовом канале.```");
    };
    var JO = client.voiceConnections;
    if(!JO) {
        return message.channel.send("```Бот уже находится в голосовом канале.```");
    };
    VC.join();
    message.channel.send("```Бот подключился к голосовому каналу.```");
};
