import api from '../../api';

export default new Map([
    require('./lib/rand')(api),
    require('./lib/max')(api),
    require('./lib/min')(api),
    require('./lib/len')(api),
    require('./lib/turn')(api),
    require('./lib/fuse')(api),
    require('./lib/vfuse')(api),
    require('./lib/join')(api),
    require('./lib/each')(api),
    require('./lib/map')(api),
    require('./lib/cycle')(api),
    require('./lib/shift')(api),
    require('./lib/all')(api),
    require('./lib/any')(api),
    require('./lib/chunk')(api),
    require('./lib/rev')(api),
    require('./lib/unshift')(api),
    require('./lib/head')(api),
    require('./lib/tail')(api),
    require('./lib/index')(api),
    require('./lib/slice')(api),
    require('./lib/sum')(api),
    require('./lib/pop')(api),
    require('./lib/reduce')(api),
    require('./lib/push')(api)
]);
