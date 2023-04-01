import type { ReactNode } from 'react';
import { Provider } from 'effector-react';

import { getScope } from './get-scope';

export function EffectorSsr({
  values,
  children
}: {
  values: Record<string, unknown>;
  children: ReactNode;
}) {
  const scope = getScope(values);

  return <Provider value={scope}>{children}</Provider>;
}
