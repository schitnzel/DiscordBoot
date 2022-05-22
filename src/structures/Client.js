const { Client } = require('discord.js')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const { readdirSync } = require('fs')
const { join } = require('path')

module.exports = class extends Client {
    constructor(options) {
        super(options)
        this.commands = []
        this.loadCommands()
        this.loadEvents()
    }
    lang(opt) {
     const lang = require(`./Lang/${opt.lang}/${opt.cmd}.json`);
     return lang;
    }
    async registryCommands() {
     const rest = new REST({ version: '9' }).setToken(process.env.token);
     var cmds = this.commands;
     try {
        await rest.put(
            Routes.applicationCommands(process.env.client_id),
            { body: cmds },
         );
         await rest.put(
            Routes.applicationGuildCommands(process.env.client_id, process.env.guild_id),
            { body: cmds },
        )
        console.log('Slash commands successfully deployed !');
      } catch(e) {console.log(e)}
    }
    loadCommands(path = 'src/commands') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)

            for (const command of commands) {
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
                const cmd = new (commandClass)(this)

                this.commands.push(cmd)
            }
        }
    }
    loadEvents(path = 'src/events') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const events = readdirSync(`${path}/${category}`)

            for (const event of events) {
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
                const evt = new (eventClass)(this)

                this.on(evt.name, evt.run)
            }
        }
    }
}
