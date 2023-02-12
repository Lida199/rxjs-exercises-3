import { Observable, of } from 'rxjs';

export interface Person {
  id: number;
  jobId: number;
  name: string;
  lastname: string;
}

const people: Person[] = [
  {
    id: 1,
    jobId: 5,
    name: 'John',
    lastname: 'Smith',
  },
  {
    id: 2,
    jobId: 1,
    name: 'Barbara',
    lastname: 'Lee',
  },
  {
    id: 3,
    jobId: 3,
    name: 'Baron',
    lastname: 'Brandon',
  },
  {
    id: 4,
    jobId: 2,
    name: 'Suzanne',
    lastname: 'Pietra',
  },
  {
    id: 5,
    jobId: 4,
    name: 'London',
    lastname: 'Gomez',
  },
  {
    id: 6,
    jobId: 4,
    name: 'Olivia',
    lastname: 'Bordeaux',
  },
  {
    id: 7,
    jobId: 1,
    name: 'Oliver',
    lastname: 'Green',
  },
  {
    id: 8,
    jobId: 3,
    name: 'James',
    lastname: 'Gonsalez',
  },
  {
    id: 9,
    jobId: 2,
    name: 'Mark',
    lastname: 'Wilson',
  },
  {
    id: 10,
    jobId: 5,
    name: 'Scott',
    lastname: 'Hill',
  },
];

export function getPeople(jobId: string): Observable<Person[]> {
  const result: Person[] = [];
  people.forEach((person) => {
    if (person.jobId === Number(jobId)) {
      result.push(person);
    }
  });
  return of(result);
}
