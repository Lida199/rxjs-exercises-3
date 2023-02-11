export interface Job {
  id: number;
  name: string;
}

export interface Person {
  id: number;
  jobId: number;
  name: string;
  lastname: string;
}

export interface Movie {
  title: string;
  year: number;
  actors: string[];
  image: string;
}

export interface List {
  image: string;
  title: string;
  description: string;
}
