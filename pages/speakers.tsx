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
import SpeakersGrid from '@components/speakers-grid';
import Layout from '@components/layout';
import Header from '@components/header';

import { pageStarted } from '@model/app';
import { $speakers } from '@model/speakers';
import { META_DESCRIPTION } from '@lib/constants';

export default function Speakers() {
  const meta = {
    title: 'Speakers - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };
  const speakers = useUnit($speakers);

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Speakers" description={meta.description} />
        <SpeakersGrid speakers={speakers} />
      </Layout>
    </Page>
  );
}

export const getServerSideProps = async () => {
  const scope = fork();

  await allSettled(pageStarted, {
    scope,
    params: {
      page: 'speakers'
    }
  });

  const values = serialize(scope);

  console.log(values);

  return {
    props: {
      values
    }
  };
};
