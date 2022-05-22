const animality = require('animality');

const Command = require('../../structures/Command')
const Users = require('../../structures/models/Users')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'animal',
            description: 'Fotinhas de animais',
            options: [{
              name: 'animals',
              description: 'Selecione um animal!',
              type: 3,
              required: false,
              choices: [{name: "Gato", value: 'cat'}]
            }]
        })
    }
    run = async (interaction) => {
        const user = await Users.findOne({_id: interaction.member.id});
        // const lang = this.client.lang({lang: user.lang, cmd: 'animal'});
        const animal = await animality.getAsync(interaction.options.getString('animals') || 'random', process.env.apikey);
        interaction.reply({embeds: [{color: 'RANDOM', image: {url: animal.image}}]})
    }
}
