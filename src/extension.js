// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')

function activate(context) {
    // create a terminal to run artisan commands in
    let terminal = vscode.window.createTerminal('php-cs-fixer');

    // -------------------------
    // register artisan commands
    // -------------------------
    function makeCommand(name, commandMethod) {
        context.subscriptions.push(vscode.commands.registerCommand(`php-cs-fixer-terminal.${name}`, commandMethod));
    }

    // php artisan |
    makeCommand('php-cs-fixer', () => {
        terminal.show();
        terminal.sendText('php-cs-fixer ', false);
    });

    makeCommand('php-cs-fixer-file', () => {
        terminal.show();
        let path = vscode.window.activeTextEditor.document.fileName;
        path = path.replace(/\\/g, '/').replace('c:/', '/mnt/c/');
        terminal.sendText(`php-cs-fixer fix ${path}`);
    });

    makeCommand('php-cs-fixer-project', () => {
        terminal.show();
        terminal.sendText('php-cs-fixer fix ./');
    });

    makeCommand('php-cs-fixer-project-dry', () => {
        terminal.show();
        terminal.sendText('php-cs-fixer fix ./ --dry-run -vvv');
    });
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;