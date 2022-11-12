const { Command } = require('commander');
const { Install, Uninstall } = require('./commands');

const mainCmd = new Command();
mainCmd.addCommand(new Install());
mainCmd.addCommand(new Uninstall());

mainCmd.parse(process.argv);

//user: planningpokeradmin
//password: planningpoker1
//mongo name: cluster0.kxuni