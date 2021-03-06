import CheddarClass from '../env/class';
import CheddarVariable from '../env/var';

import CheddarScope from '../env/scope';

import NIL from '../consts/nil';

import BehaviorOperator from './op/string';
import BehaviorCast from './cast/string';

function InitalizeSubstring(source) {
    var str = new CheddarString(null, null);
    str.init(source);
    return str;
}

export default class CheddarString extends CheddarClass {
    static Name = "String";

    init(string = "") {
        if (string instanceof CheddarClass || string.prototype instanceof CheddarClass) {
            return "Cannot construct string from Cheddar object.";
        }

        this.value = string.toString();

        this.scope_ref = new CheddarScope();
        let scope_ref_setter = this.scope_ref.setter;
        this.scope_ref.setter = (path, res) => {
            scope_ref_setter.call(this.scope_ref, path, res);
        };

        return true;
    }

    // String is the lowest level class
    //  meaning operators can have directly
    //  defined behavior
    Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    Cast = new Map([...CheddarClass.Cast, ...BehaviorCast]);

    eval_accessor(type) {
        if (type.value.isInteger()) {
            let v = type.value.accessAt(this.value);

            if (!v) return new CheddarVariable(new NIL);

            v = InitalizeSubstring(v);
            v.scope = this.scope_ref;
            v.Reference = type.value;
            this.scope_ref.setter(type.value, v = new CheddarVariable(v, {
                Type: CheddarString
            }));

            return v;
        } else {
            return 'accessor must be integer';
        }
    }

    static get Scope() { if (global.DISABLE_STDLIB_ITEM !== "String") return require('../../../stdlib/primitive/String/static'); }
    get Scope()        { if (global.DISABLE_STDLIB_ITEM !== "String") return require('../../../stdlib/primitive/String/lib'); }
}
