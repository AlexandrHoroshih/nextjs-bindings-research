import { createStore, sample, createEffect } from 'effector';

import { getAllJobs } from '@lib/cms-api';
import { Job } from '@lib/types';
import { createGSPFactory } from 'nextjs-effector';

import { matchPage, notifyUserFx } from './app';

const jobsPage = matchPage({
  page: 'jobs'
});

const getAllJobsFx = createEffect(getAllJobs);

export const $jobs = createStore<Job[]>([]);

sample({
  clock: jobsPage.opened,
  target: getAllJobsFx
});

sample({
  clock: getAllJobsFx.doneData,
  target: $jobs
});

sample({
  clock: getAllJobsFx.fail,
  fn: () => 'Could not get jobs((',
  target: notifyUserFx
});

export const createJobsGSP = createGSPFactory({
  sharedEvents: [jobsPage.open]
})
