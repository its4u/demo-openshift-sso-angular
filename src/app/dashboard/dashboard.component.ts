import { Component, OnInit } from '@angular/core';

import { Movie }        from '../movie/movie';
import { MovieService } from '../movie/movie.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getTop5Movies()
        .then(movies => this.movies = movies);
  }
}

