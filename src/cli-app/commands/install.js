const { Command } = require('commander');
const { MongoClient } = require('mongodb');

function InstallCommand() {

    const command = new Command('install');

    command
        .requiredOption('-u, --username [value]')
        .requiredOption('-p, --password [value]')
        .requiredOption('-h, --hostname [value]')
        .action(function({ username, password, hostname }) {
            const connectionString = `mongodb+srv://${username}:${password}@${hostname}`;
            const dbName = 'PlanningPokerDB';
            const collections = [
                'Sessions', // to store session information
                'UserSessions', // to store user access to specific sessions
                'Rounds', // to store each planning poker round information
                'Voting', // to store votes for each player and round
            ];
            
            new MongoClient(connectionString)
                .connect()
                .then(client => client.db(dbName))
                .then(db => { return {db, collections}; })
                .then(({ db, collections }) => Promise.all(collections.map(async col => await db.createCollection(col))))
                .then(() => process.exit(0))
                .catch(() => process.exit(1));
        });

    return command;
}

module.exports = InstallCommand;