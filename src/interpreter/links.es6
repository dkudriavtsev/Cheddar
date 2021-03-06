import StatementExpression from './core/eval/eval';
import StatementReturn     from './states/return';
import StatementAssign     from './states/assign';
import StatementBreak      from './states/break';
import StatementClass      from './states/class';
import StatementFunc       from './states/func';
import StatementFor        from './states/for';
import StatementOp         from './states/op';
import StatementIf         from './states/if';

export default delay_addition => ({
    StatementAssign,
    StatementIf,
    StatementOp,
    StatementFor,
    StatementFunc,
    StatementClass,
    StatementBreak,
    StatementReturn,
    StatementExpression
})
