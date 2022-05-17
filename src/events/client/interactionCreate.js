const Event = require('../../structures/Event')
const User = require('../../structures/models/Users')
const Guild = require('../../structures/models/Guilds')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }
    run = async (interaction) => {
        if (interaction.isCommand()) {
          const guild = await Guild.findOne({ _id: interaction.guild.id });
          const user = await User.findOne({_id: interaction.member.id});
          if (!guild) {
		new Guild({
			_id: interaction.guild.id,
			name: interaction.guild.name,
			icon: interaction.guild.icon ? interaction.guild.iconURL({ size: 4096 }) : "https://cdn.discordapp.com/embed/avatars/0.png",
			bio: "Um servidor :D",
			verified: false,
			config: {
				welcome: {
					channel: "",
					message: "{\"content\":\"Bem vindo(a) {user.username} ao servidor!\"}"
				},
				bye: {
					channel: "",
					message: "{\"content\":\"{user.username} saiu do servidor.\"}"
				},
				system: {
					antispam: {
						check: false,
						config: {
							blacklist: []
						}
					},
					antilink: false
				}
			}
		}).save()
	}
          if(!user) {
           new User({_id: interaction.member.id,
			lang: "pt-br",
			about: "Olá, parece que ainda não tenho um sobre mim!",
			economy: {
				coins: 500
			}
           }).save()
          }
          const cmd = this.client.commands.find(c => c.name === interaction.commandName)
            if (cmd) {
             cmd.run(interaction)
            }
        }
    }
}
