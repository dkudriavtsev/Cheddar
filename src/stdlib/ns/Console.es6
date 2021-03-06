export default function(cheddar) {
    return cheddar.namespace([
        ["printf", cheddar.from(require("./Console/printf"))],
        ["sprintf", cheddar.from(require("./Console/sprintf"))],
        ["argc", cheddar.from(require("./Console/argc"))],
        ["args", cheddar.from(require("./Console/args"))],
        ["put", cheddar.from(require("./Console/put"))],
        ["size", require("./Console/size")(cheddar)],
        ["clear", cheddar.from(require("./Console/clear"))]
    ]);
}
