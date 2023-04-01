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
import {
  Job,
  Sponsor,
  Stage,
  Speaker,
  generateJobs,
  generateSpeakers,
  generateSponsors,
  generateStages
} from '@lib/types';

const cmsApi = {
  getAllSpeakers: () => Promise.resolve(generateSpeakers()),
  getAllStages: () => Promise.resolve(generateStages()),
  getAllSponsors: () => Promise.resolve(generateSponsors()),
  getAllJobs: () => Promise.resolve(generateJobs())
};

export async function getAllSpeakers(): Promise<Speaker[]> {
  return cmsApi.getAllSpeakers();
}

export async function getAllStages(): Promise<Stage[]> {
  return cmsApi.getAllStages();
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  return cmsApi.getAllSponsors();
}

export async function getAllJobs(): Promise<Job[]> {
  return cmsApi.getAllJobs();
}
