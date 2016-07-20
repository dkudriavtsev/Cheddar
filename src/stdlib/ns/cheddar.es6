export default function(cheddar) {
    return cheddar.namespace([
        ['argv', cheddar.from(require('./cheddar/argv'))],
        ['argc', cheddar.from(require('./cheddar/argc'))],
        ['version', cheddar.from(require('./cheddar/version'))],
        ['internal', cheddar.from(require('./cheddar/internal'))],

        ['uid', new cheddar.variable(require('./cheddar/uid')(cheddar), { Writeable: true })]
    ]);
}