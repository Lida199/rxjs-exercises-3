import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Observable, fromEvent, map, mergeMap, of, take, toArray } from 'rxjs';
import { List } from '../model/model.interface';

@Component({
  selector: 'app-task-two',
  templateUrl: './task-two.component.html',
  styleUrls: ['./task-two.component.scss'],
})
export class TaskTwoComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container: ElementRef | undefined;
  users = 1;
  list = new Array(100).fill({}).map(() => {
    return {
      image: 'https://www.knack.com/_images/live/users.png',
      title: `List Item ${this.users}`,
      description: `This is some description of the list - item # ${this
        .users++}`,
    };
  });
  amount: number = 10;
  lists$: Observable<List[]> = of(...this.list).pipe(
    take(this.amount),
    toArray()
  );

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    fromEvent(this.container?.nativeElement, 'scroll')
      .pipe(
        map((event: any) => {
          return {
            scrollAmount: event.target.scrollTop,
            containerHeight: parseInt(getComputedStyle(event.target).height),
            itemHeight: parseInt(
              getComputedStyle(event.target.querySelector('li')).height
            ),
          };
        }),
        mergeMap((x) => {
          if (
            x.scrollAmount === this.amount * x.itemHeight - x.containerHeight &&
            this.amount < this.list.length
          ) {
            this.amount += 10;
            this.lists$ = of(...this.list).pipe(take(this.amount), toArray());
          }
          return this.lists$;
        })
      )
      .subscribe();
  }
}
