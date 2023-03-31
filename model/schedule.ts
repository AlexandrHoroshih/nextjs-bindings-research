import { createStore, sample, createEffect } from 'effector';

import { getAllStages } from '@lib/cms-api';
import { Stage } from '@lib/types';

import { matchPage, notifyUserFx } from './app';

const schedulePage = matchPage({
  page: 'schedule'
});

const getAllstagesFx = createEffect(getAllStages);

export const $stages = createStore<Stage[]>([]);

sample({
  clock: schedulePage.opened,
  target: getAllstagesFx
});

sample({
  clock: getAllstagesFx.doneData,
  target: $stages
});

sample({
  clock: getAllstagesFx.fail,
  fn: () => 'Could not get stages((',
  target: notifyUserFx
});
