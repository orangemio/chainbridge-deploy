#!/usr/bin/env node

const {Command} = require('commander');
const program = new Command();

// Comands
const {
    deploy,
    bridge,
    admin,
    erc20,
    erc721,
    centrifuge,
} = require('./cmd/index');
const constants = require('./constants');


program.option('--url <value>', 'URL to connect to', "http://localhost:8545");
program.option('--privateKey <value>', 'Private key to use', constants.deployerPrivKey);
program.option('--jsonWallet <path>', '(Optional) Encrypted JSON wallet');
program.option('--jsonWalletPassword <value>', '(Optional) Password for encrypted JSON wallet');
program.option('--gasLimit <value>', "Gas limit for transactions", "8000000")
program.option('--gasPrice <value>', "Gas price for transactions", "20000000")
program.option('--networkId <value>', "Network Id")

program.addCommand(deploy)
program.addCommand(bridge)
program.addCommand(admin)
program.addCommand(erc20)
program.addCommand(erc721)
program.addCommand(centrifuge)

program.allowUnknownOption(false);

const run = async () => {
    try {
        await program.parseAsync(process.argv);
    } catch (e) {
        console.log({ e });
        process.exit(1)
    }
}


if (process.argv && process.argv.length <= 2) {
    program.help();
} else {
    run()
}
