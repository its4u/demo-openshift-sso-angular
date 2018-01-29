import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Movie }        from './movie';
import { MovieService } from './movie.service';

@Component({
  moduleId: module.id,
  selector: 'my-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: [ './movie-detail.component.css' ]
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.movieService.getMovie(params['id']))
      .subscribe(movie => this.movie = movie);
  }

  save(): void {
    this.movieService.update(this.movie)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

