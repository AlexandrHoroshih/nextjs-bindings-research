import { fork } from 'effector';
import { Provider } from 'effector-react';

export function EffectorSsr({pageProps}: {pageProps: Record<string, unknown>}) {
    
}

function getValues(obj: Record<string, unknown>): Record<string, unknown> {
  return (obj.values && typeof obj.values) === 'object' ? (obj.values as any) : {};
}
