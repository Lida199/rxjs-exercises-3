import { Component } from '@angular/core';
import { Job, Person } from '../model/model.interface';
import { from, toArray, mergeMap } from 'rxjs';

@Component({
  selector: 'app-task-three',
  templateUrl: './task-three.component.html',
  styleUrls: ['./task-three.component.scss'],
})
export class TaskThreeComponent {
  jobs: Job[] = [
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

  people: Person[] = [
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

  getPeople(arr: string[]) {
    const obs1$ = from(this.jobs).pipe(
      mergeMap((x) => {
        const result: Job[] = [];
        arr.forEach((item) => {
          if (item === x.name) {
            result.push(x);
          }
        });
        return from(result);
      }),
      mergeMap((x) => {
        const result: string[] = [];
        this.people.forEach((person) => {
          if (person.jobId === x.id) {
            result.push(`${person.name} ${person.lastname} is a ${x.name}`);
          }
        });
        return from(result);
      }),
      toArray()
    );
    return obs1$;
  }
  constructor() {
    this.getPeople(['Teacher']).subscribe((x) => console.log(x));
  }
}
