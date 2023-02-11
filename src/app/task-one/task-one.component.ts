import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  of,
  from,
  filter,
  Observable,
  toArray,
  switchMap,
} from 'rxjs';
import { Movie } from '../model/model.interface';

@Component({
  selector: 'app-task-one',
  templateUrl: './task-one.component.html',
  styleUrls: ['./task-one.component.scss'],
})
export class TaskOneComponent implements OnInit, AfterViewInit {
  @ViewChild('search') search: ElementRef | undefined;
  movies$: Observable<null | Movie[]> | undefined;

  allMovies: Movie[] = [
    {
      title: 'The White Lotus',
      year: 2021,
      image:
        'https://m.media-amazon.com/images/M/MV5BYTAyYzg3MDQtODA4Yy00NmU5LTkxOGQtMDRmYmZkYWYwYzUyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
      actors: ['Jennifer Coolidge', 'Jon Gries'],
    },
    {
      title: 'The Last of Us',
      year: 2023,
      image:
        'https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_.jpg',
      actors: ['Pedro Pascal', 'Bella Ramsey'],
    },
    {
      title: 'Everything Everywhere All at Once',
      year: 2022,
      image:
        'https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_FMjpg_UX1000_.jpg',
      actors: ['Michelle Yeoh', 'Stephanie Hsu'],
    },
  ];
  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.movies$ = fromEvent(this.search?.nativeElement, 'input').pipe(
      map((event: any) => event.target.value.trimStart().trimEnd()),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((x) => {
        if (x === '') {
          return of(null);
        } else {
          const obs$ = from(this.allMovies);
          const result$ = obs$.pipe(
            filter((y) => y.title.toLowerCase().includes(x.toLowerCase())),
            toArray()
          );
          return from(result$);
        }
      })
    );
  }
}
