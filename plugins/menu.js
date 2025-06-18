module.exports = {
  command: ['menu', 'help', 'list'],
  description: 'Shows all available commands in a stylish list.',
  category: 'main',
  async handler(m, { commands }) {
    const { sock, config, pushName } = m;
    
    let menuText = `
Hello, *${pushName || 'Jaan'}*! 
Main aapki personal assistant, *${config.BOT_NAME}* 👰‍♀️
Neeche di gayi list se koi bhi option chunein.`;

    const categories = {};
    const uniqueCommands = new Set();

    commands.forEach(cmd => {
        if (cmd && cmd.command && !uniqueCommands.has(cmd.command[0])) {
            const category = cmd.category ? cmd.category.toUpperCase() : 'MISC';
            if (!categories[category]) categories[category] = [];
            categories[category].push(cmd);
            uniqueCommands.add(cmd.command[0]);
        }
    });

    const sections = [];
    for (const category in categories) {
        sections.push({
            title: `*${category}*`,
            rows: categories[category].map(cmd => ({
                title: `${config.PREFIX}${cmd.command[0]}`,
                rowId: `${config.PREFIX}${cmd.command[0]}`, // User can click this to run the command
                description: cmd.description || ''
            }))
        });
    }

    const listMessage = {
      text: menuText,
      footer: `© Powered by MALIK SAHAB`,
      title: `*╔═.✾. ${config.BOT_NAME} MENU .✾.═╗*`,
      buttonText: "View All Commands",
      sections
    }

    await sock.sendMessage(m.key.remoteJid, listMessage, { quoted: m });
  }
};
