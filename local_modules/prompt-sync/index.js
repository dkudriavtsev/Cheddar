'use strict';

var fs = require('fs');
var term = [13, 10]; //carriage return

/**
 * create -- sync function for reading user input from stdin
 * @param   {Object} config {
 *   sigint: {Boolean} exit on ^C
 *   autocomplete: {StringArray} function({String})
 *   history: {String} a history control object (see `prompt-sync-history`)
 * }
 * @returns {Function} prompt function
 */

function create(config) {

    config = config || {};
    var sigint = config.sigint;
    var autocomplete = config.autocomplete =
        config.autocomplete || function() {
            return []
        };
    var history = config.history;
    prompt.history = history || {
        save: function() {}
    };
    prompt.hide = function(ask) {
        return prompt(ask, {
            echo: ''
        })
    };

    return prompt;


    /**
     * prompt -- sync function for reading user input from stdin
     *  @param {String} ask opening question/statement to prompt for
     *  @param {String} value initial value for the prompt
     *  @param   {Object} opts {
     *   echo: set to a character to be echoed, default is '*'. Use '' for no echo
     *   value: {String} initial value for the prompt
     *   ask: {String} opening question/statement to prompt for, does not override ask param
     *   autocomplete: {StringArray} function({String})
     * }
     *
     * @returns {string} Returns the string input or (if sigint === false)
     *                   null if user terminates with a ^C
     */


    function prompt(ask, value, opts) {
        var insert = 0,
            savedinsert = 0,
            res, i, savedstr;
        opts = opts || {};

        if (Object(ask) === ask) {
            opts = ask;
            ask = opts.ask;
        }
        else if (Object(value) === value) {
            opts = value;
            value = opts.value;
        }
        ask = ask || '';
        var echo = opts.echo;
        var masked = 'echo' in opts;
        autocomplete = opts.autocomplete || autocomplete;

        var fd = (process.platform === 'win32') ?
            process.stdin.fd :
            fs.openSync('/dev/tty', 'rs');

        var wasRaw = process.stdin.isRaw;
        if (!wasRaw && process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }

        var buf = new Buffer(3);
        var str = '',
            char, read;

        savedstr = '';

        if (ask) {
            process.stdout.write(ask);
        }

        var cycle = 0;
        var prevComplete;

        while (true) {
            read = fs.readSync(fd, buf, 0, 3);
            if (read == 3) { // received a control sequence
                switch (buf.toString()) {
                    case '\u001b[A': //up arrow
                        if (masked) break;
                        if (!history) break;
                        if (history.atStart()) break;

                        if (history.atEnd()) {
                            savedstr = str;
                            savedinsert = insert;
                        }
                        str = history.prev();
                        insert = str.length;
                        process.stdout.write('\u001b[2K\u001b[0G' + ask + str);
                        break;
                    case '\u001b[B': //down arrow
                        if (masked) break;
                        if (!history) break;
                        if (history.pastEnd()) break;

                        if (history.atPenultimate()) {
                            str = savedstr;
                            insert = savedinsert;
                            history.next();
                        }
                        else {
                            str = history.next();
                            insert = str.length;
                        }
                        process.stdout.write('\u001b[2K\u001b[0G' + ask + str + '\u001b[' + (insert + ask.length + 1) + 'G');
                        break;
                    case '\u001b[D': //left arrow
                        if (masked) break;
                        var before = insert;
                        insert = (--insert < 0) ? 0 : insert;
                        if (before - insert)
                            process.stdout.write('\u001b[1D');
                        break;
                    case '\u001b[C': //right arrow
                        if (masked) break;
                        insert = (++insert > str.length) ? str.length : insert;
                        process.stdout.write('\u001b[' + (insert + ask.length + 1) + 'G');
                        break;
                }
                if (term.indexOf(buf[read - 1]) > -1) {
                    fs.closeSync(fd);
                    if (!history) break;
                    if (!masked && str.length) history.push(str);
                    history.reset();
                    break;
                }
                continue; // any other 3 character sequence is ignored
            }

            // if it is not a control character seq, assume only one character is read
            char = buf[read - 1];

            // catch a ^C and return null
            if (char == 3) {
                process.stdout.write('^C\n');
                fs.closeSync(fd);

                if (sigint) process.exit(130);

                if (process.stdin.isTTY) {
                    process.stdin.setRawMode(wasRaw);
                }

                return null;
            }

            // catch the terminating character
            if (term.indexOf(char) > -1) {
                fs.closeSync(fd);
                if (!history) break;
                if (!masked && str.length) history.push(str);
                history.reset();
                break;
            }

            // catch a TAB and implement autocomplete
            if (char == 9) { // TAB
                res = autocomplete(str);

                if (str == res[0]) {
                    res = autocomplete('');
                }
                else {
                    prevComplete = res.length;
                }

                if (res.length == 0) {
                    process.stdout.write('\t');
                    continue;
                }

                var item = res[cycle++] || res[cycle = 0, cycle++];

                if (item) {
                    process.stdout.write('\r\u001b[K' + ask + item);
                    str = item;
                    insert = item.length;
                }
            }

            if (char == 127 || (process.platform == 'win32' && char == 8)) { //backspace
                if (!insert) continue;
                str = str.slice(0, insert - 1) + str.slice(insert);
                insert--;
                process.stdout.write('\u001b[2D');
            }
            else {
                if ((char < 32) || (char > 126))
                    continue;
                str = str.slice(0, insert) + String.fromCharCode(char) + str.slice(insert);
                insert++;
            };


            if (masked) {
                process.stdout.write('\u001b[2K\u001b[0G' + ask + Array(str.length + 1).join(echo));
            }
            else {
                process.stdout.write('\u001b[s');
                if (insert == str.length) {
                    process.stdout.write('\u001b[2K\u001b[0G' + ask + str);
                }
                else {
                    if (ask) {
                        process.stdout.write('\u001b[2K\u001b[0G' + ask + str);
                    }
                    else {
                        process.stdout.write('\u001b[2K\u001b[0G' + str + '\u001b[' + (str.length - insert) + 'D');
                    }
                }
                process.stdout.write('\u001b[u');
                process.stdout.write('\u001b[1C');
            }

        }

        if (process.stdin.isTTY) {
            process.stdout.write('\n');
        }

        if (process.stdin.isTTY) {
            process.stdin.setRawMode(wasRaw);
        }

        return str || value || '';
    }
};

module.exports = create;