import { fork, Scope, serialize } from 'effector';

type Values = Record<string, unknown>;
export const getScope = typeof window !== 'undefined' ? getClientScope : getServerScope;

const _currentScope: Scope = fork();
function getClientScope(values: Values) {
  HACK_injectValues(_currentScope, values);
  HACK_resetScopeRefs(_currentScope);

  return _currentScope;
}

function getServerScope(values: Values) {
  return fork({ values });
}

function HACK_injectValues(scope: Scope, values: Values) {
  const oldValues = serialize(scope);

  // @ts-expect-error this is a really hacky way to "hydrate" scope
  scope.sidValuesMap = {
    ...oldValues,
    ...values
  };
}

function HACK_resetScopeRefs(scope: Scope) {
  /**
   * Kind of equal to proposed fork(scope) behaviour
   */
  // @ts-expect-error hacky way to reset state refs owned by this scope
  scope.reg = {};
  // @ts-expect-error hacky way to reset state refs owned by this scope
  scope.sidIdMap = {};
}
