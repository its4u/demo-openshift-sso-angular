import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { MovieService } from '../movie/movie.service';
import { Movie } from '../movie/movie';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Component({
  moduleId: module.id,
  selector: 'movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: [ './movie-search.component.css' ],
  providers: [MovieService]
})
export class MovieSearchComponent implements OnInit {
  movies: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private movieService: MovieService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.movies = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.movieService.searchByName(term)
        // or the observable of empty moviees if there was no search term
        : Observable.of<Movie[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Movie[]>([]);
      });
  }

  gotoDetail(movie: Movie): void {
    let link = ['/detail', movie.id];
    this.router.navigate(link);
  }
}

