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
import { faker } from '@faker-js/faker';
import {klona} from "klona/json";

export type Image = {
  url: string;
  blurDataURL?: string;
};

export type Speaker = {
  name: string;
  bio: string;
  title: string;
  slug: string;
  twitter: string;
  github: string;
  company: string;
  talk: Talk;
  image: Image;
  imageSquare: Image;
};

const getSpeaker = (): Speaker => {
  const baseSpeaker = {
    name: faker.name.fullName(),
    bio: faker.random.words(5),
    title: faker.vehicle.bicycle(),
    slug: faker.word.adjective(),
    twitter: faker.internet.avatar(),
    github: faker.internet.avatar(),
    company: faker.company.name(),
    image: {
      url: faker.internet.avatar()
    },
    imageSquare: {
      url: faker.internet.avatar()
    }
  };

  // @ts-expect-error kek
  baseSpeaker.talk = generateTalk(klona(baseSpeaker));

  return baseSpeaker as Speaker;
};
export const generateSpeakers = (): Speaker[] => list(getSpeaker);

export type Stage = {
  name: string;
  slug: string;
  stream: string;
  discord: string;
  schedule: Talk[];
  isLive: boolean;
  roomId: string;
  stagePeers: string[];
  backstagePeers: string[];
};
const getStage = (): Stage => ({
  name: faker.color.human(),
  slug: '',
  stream: '',
  discord: '',
  schedule: list(generateTalk),
  isLive: false,
  roomId: '',
  stagePeers: [],
  backstagePeers: []
});
export const generateStages = () => list(getStage);

export type Talk = {
  title: string;
  description: string;
  start: string;
  end: string;
  speaker: Speaker[];
};
export const generateTalk = (speakers: Speaker[] = generateSpeakers()) => ({
  title: faker.vehicle.bicycle(),
  description: faker.company.bs(),
  speaker: speakers,
  start: faker.date.soon(10).toISOString(),
  end: faker.date.soon(11).toISOString()
});

export type Link = {
  url: string;
};

export type Sponsor = {
  name: string;
  description: string;
  slug: string;
  website: string;
  callToAction: string;
  callToActionLink: string;
  links: SponsorLink[];
  discord: string;
  tier: string;
  cardImage: Image;
  logo: Image;
  youtubeSlug: string;
};
const getSponsor = (): Sponsor => ({
  name: faker.company.name(),
  description: faker.company.bs(),
  slug: faker.company.name(),
  website: '',
  callToAction: faker.company.catchPhrase(),
  callToActionLink: '',
  links: [],
  discord: '',
  tier: 'top',
  cardImage: {
    url: faker.image.business()
  },
  logo: {
    url: faker.image.cats()
  },
  youtubeSlug: ''
});
export const generateSponsors = () => list(getSponsor);

export type SponsorLink = {
  text: string;
  url: string;
};

export type Job = {
  id: string;
  companyName: string;
  title: string;
  description: string;
  discord: string;
  link: string;
  rank: number;
};
const getJob = (): Job => ({
  id: faker.datatype.uuid(),
  companyName: faker.company.name(),
  title: faker.animal.cat(),
  description: faker.company.bs(),
  discord: '',
  link: '',
  rank: 5
});
export const generateJobs = () => list(getJob);

export type ConfUser = {
  id?: string;
  email?: string;
  ticketNumber?: number | null;
  name?: string | null;
  username?: string | null;
  createdAt?: number | null;
};

export type GitHubOAuthData =
  | {
      type: 'token';
      token: string;
    }
  | {
      type: 'user';
      name: string;
      login: string;
    };

function list<T>(cb: () => T) {
  const count = Math.ceil(Math.random() * 10);

  const result = [];

  for (let i = 0; i < count + 1; i++) {
    result.push(cb());
  }

  return result;
}
