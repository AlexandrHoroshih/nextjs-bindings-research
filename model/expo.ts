import { createStore, sample, createEffect } from 'effector';

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types';

import { matchPage, notifyUserFx } from './app';
import { createGSSPFactory } from 'nextjs-effector';

const expoPage = matchPage({
  page: 'expo'
});

const getAllSponsorsFx = createEffect(getAllSponsors);

export const $sponsors = createStore<Sponsor[]>([]);

sample({
  clock: expoPage.opened,
  target: getAllSponsorsFx
});

sample({
  clock: getAllSponsorsFx.doneData,
  target: $sponsors
});

sample({
  clock: getAllSponsorsFx.fail,
  fn: () => 'Could not get sponsors((',
  target: notifyUserFx
});

export const createExpoGssp = createGSSPFactory({
  // Will be called on first request and on each page navigation (always on server side)
  sharedEvents: [expoPage.open]
});
