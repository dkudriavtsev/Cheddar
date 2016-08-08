import HelperInit from '../../../../helpers/init';
import XRegExp from 'xregexp';

export default new Map([
    ['repr', (LHS, RHS) => {
        let CheddarString = require('../String');
        return HelperInit(CheddarString, `/${RHS.value.xregexp.source}/${RHS.value.xregexp.flags}`);
    }],

    ['|', (LHS, RHS) => {
        if (LHS && RHS instanceof LHS.constructor) {
            return HelperInit(LHS.constructor, XRegExp.union([LHS.value, RHS.value]));
        }
    }],

    ['+', (LHS, RHS) => {
        if (LHS && RHS instanceof LHS.constructor) {
            return HelperInit(LHS.constructor, XRegExp.union([LHS.value, RHS.value]));
        }
    }]
]);