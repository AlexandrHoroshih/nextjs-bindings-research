/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { fork, serialize, allSettled } from 'effector';
import { useUnit } from 'effector-react';

import Page from '@components/page';
import JobsGrid from '@components/jobs-grid';
import Layout from '@components/layout';
import Header from '@components/header';

import { pageStarted } from '@model/app';
import { $jobs, createJobsGSP } from '@model/jobs';
import { META_DESCRIPTION } from '@lib/constants';

export default function Jobs() {
  const meta = {
    title: 'Career Fair - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };
  const jobs = useUnit($jobs);

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Career Fair" description={meta.description} />
        <JobsGrid jobs={jobs} />
      </Layout>
    </Page>
  );
}

export const getStaticProps = createJobsGSP()
