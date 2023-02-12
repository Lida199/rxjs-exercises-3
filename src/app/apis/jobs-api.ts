import { Observable, filter, from } from 'rxjs';

export interface Job {
  id: number;
  name: string;
}

const jobs: Job[] = [
  {
    id: 1,
    name: 'Developer',
  },
  {
    id: 2,
    name: 'Farmer',
  },
  {
    id: 3,
    name: 'Actor',
  },
  {
    id: 4,
    name: 'Teacher',
  },
  {
    id: 5,
    name: 'Chef',
  },
];

export function getJob(jobName: string): Observable<Job> {
  return from(jobs).pipe(filter((x) => x.name === jobName));
}
