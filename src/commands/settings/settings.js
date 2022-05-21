const Command = require('../../structures/Command')
const Users = require('../../structures/models/Users')
const { MessageActionRow, MessageButton } = require('discord.js');


module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'settings',
            description: 'Configure seu servidor!',
        })
      }
     run = async (interaction) => {
        const user = await Users.findOne({_id: interaction.member.id});
        const lang = this.client.lang({lang: user.lang, cmd: 'settings'})
        const string = JSON.stringify(lang.text)
                           .replace("{server.icon}", interaction.guild.icon?interaction.guild.iconURL({dynamic:true, size:4096}):"https://cdn.discordapp.com/embed/avatars/0.png?size=4096")
                           .replace("{server.name}", interaction.guild.name)
        const json = JSON.parse(string)
        interaction.reply(json)
     }
}
