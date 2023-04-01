import { createStore, createEvent, createEffect, sample } from 'effector';

const sleepFx = createEffect(sleep);
export const up = createEvent();
export const $count = createStore(0).on([up, sleepFx.done], s => s + 1);

sample({
  clock: $count,
  fn: () => 1500,
  target: sleepFx
});

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}
