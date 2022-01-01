const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env['TOKEN'])

// Start
bot.start((ctx) => {
	ctx.reply('Hey there! My name is Krafel.\nType /help to see a list of all my commands!')
})

// Help
bot.help((ctx) => {
	ctx.reply('Krafel Command List\n\nCurrent commands:\n-/start : Shows the introductory message.\n-/help : Shows a list of all commands(this message).\n-/hello : Says hello.\n-/bye : Says bye.\n-/say <msg> : Says the given meessage.')
})

// Hello
bot.command('hello', (ctx) => {
	ctx.reply('Hello!')
})

// Bye
bot.command('bye', (ctx) => {
	ctx.reply('Bye!')
})

// Say
bot.command('say', (ctx) => {
	let message = ctx.message['text']
	if (message !== '/say') {
		message = message.split('/say')
		message = message[1]

		let message_id = ctx.message['id']

		ctx.deleteMessage(message_id)
		ctx.reply(message)
	} else {
		ctx.replyWithMarkdown('You need to specify a message to say!\n\n*Example:*\n/say Hello!')
	}
})

// Run the bot
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
