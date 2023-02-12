import { Component } from '@angular/core';
import { from, mergeMap, of, Observable } from 'rxjs';
import { getJob } from '../apis/jobs-api';
import { Job } from '../apis/jobs-api';
import { getPeople } from '../apis/people-api';

@Component({
  selector: 'app-task-three',
  templateUrl: './task-three.component.html',
  styleUrls: ['./task-three.component.scss'],
})
export class TaskThreeComponent {
  getResult(jobNames: string[]): Observable<string[]> {
    const result: Job[] = [];
    jobNames.forEach((job) => {
      getJob(job).subscribe((x) => result.push(x));
    });
    const people: string[] = [];
    result.forEach((jobId) => {
      getPeople(`${jobId.id}`)
        .pipe(mergeMap((x) => from(x)))
        .subscribe((x) =>
          people.push(`${x.name} ${x.lastname} is a ${jobId.name}`)
        );
    });
    return of(people);
  }
  constructor() {
    this.getResult(['Teacher', 'Developer', 'Chef']).subscribe((x) =>
      console.log(x)
    );
  }
}
