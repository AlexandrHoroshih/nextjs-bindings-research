import { createStore, sample, createEffect } from 'effector';

import { getAllSpeakers } from '@lib/cms-api';
import { Speaker } from '@lib/types';

import { matchPage, notifyUserFx } from './app';

const speakersPage = matchPage({
  page: 'speakers'
});

const getAllSpeakersFx = createEffect(getAllSpeakers);

export const $speakers = createStore<Speaker[]>([]);

sample({
  clock: speakersPage.opened,
  target: getAllSpeakersFx
});

sample({
  clock: getAllSpeakersFx.doneData,
  target: $speakers
});

sample({
  clock: getAllSpeakersFx.fail,
  fn: () => 'Could not get speakers((',
  target: notifyUserFx
});
