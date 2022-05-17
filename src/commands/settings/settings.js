const Command = require('../../structures/Command')
const Users = require('../../structures/models/Users')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'language',
            description: 'Altere idioma do bot para seu cliente.',
        })
      }
     run = async (interaction) => {
        const user = await Users.findOne({_id: interaction.member.id});
        const lang = this.client.lang({lang: user.lang, cmd: 'settings'})
        interaction.reply(lang.text)
     }
}
