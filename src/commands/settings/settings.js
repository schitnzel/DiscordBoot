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
        const json = JSON.parse(JSON.stringify(lang.text))
        interaction.reply(json)
     }
}
