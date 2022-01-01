const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env['TOKEN'])

// Start
bot.start((ctx) => {
	ctx.reply('Hey there! My name is Krafel.\nType /help to see a list of all my commands!')
})

// Help
bot.help((ctx) => {
	ctx.replyWithMarkdown('*Krafel Command List*\n\nCurrent commands:\n-/start : Shows the introductory message.\n-/help : Shows a list of all commands(this message).\n-/hello : Says hello.\n-/bye : Says bye.\n-/say <message> : Says the given message.\n-/poll <question> | <option 1>, <option 2>, <option 3> : Makes a poll.')
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

// Poll
bot.command('poll', (ctx) => {
	try {
		let message = ctx.message['text']
		let params = message.replace('/poll ', '')
		params = params.split('|')
		let question = params[0]
		let options = params[1]
		options = options.split(',')
		ctx.replyWithPoll(question, options, { is_anonymous: false})
	} catch (e) {
		ctx.replyWithMarkdown('You need to follow the command syntax correctly!\n\n*Example:*\n/poll This is question | Option One, Option 2, Option 3\n\n*You must:*\n-Seprate the question and the options with a "|"(vertical slash).\n-Seprate the options with a ","(comma).\n-Specify atleast 2 options.\n\nYou can have upto 10 options.')
	}
})

// Run the bot
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
