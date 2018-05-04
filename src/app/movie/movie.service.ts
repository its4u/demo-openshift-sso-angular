import { Injectable }    from '@angular/core';
import { Http, RequestOptionsArgs, Response, RequestOptions, Headers, ResponseOptions } from '@angular/http';
import { KeycloakService } from '../security/keycloak.service';

import { Movie } from './movie';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovieService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private backendURL = 'https://secure-movies-backend-demo-rhsso.e4ff.pro-eu-west-1.openshiftapps.com/movies-backend';
  private moviesUrl = '/api/movies';   // URL to movies API

  constructor(private http: Http, private keycloak: KeycloakService) { }

  getMovies(options?: RequestOptionsArgs): Promise<Movie[]> {
    console.log("Getting all movies");
    options = this.initializeRequestOptionArgs(options);
    return this.keycloak.getToken().then(token => {
        options.headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.backendURL + this.moviesUrl, options)
          .toPromise()
          .then(response => response.json() as Movie[])
          .catch(this.handleError);
    }).catch(this.handleError);
  }

  getTop5Movies(options?: RequestOptionsArgs): Promise<Movie[]> {
    console.log("Getting top 5 movies");
    const url = `${this.backendURL + this.moviesUrl}Top5`;

    options = this.initializeRequestOptionArgs(options);
    return this.keycloak.getToken().then(token => {
        options.headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(url, options)
          .toPromise()
          .then(response => response.json() as Movie[])
          .catch(this.handleError);
    }).catch(this.handleError);
  }

  getMovie(id: string, options?: RequestOptionsArgs): Promise<Movie> {
    const url = `${this.backendURL + this.moviesUrl}/${id}`;
    
    options = this.initializeRequestOptionArgs(options);
    return this.keycloak.getToken().then(token => {
        options.headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(url, options)
          .toPromise()
          .then(response => response.json() as Movie)
          .catch(this.handleError);
    }).catch(this.handleError);
  }

  delete(id: string, options?: RequestOptionsArgs): Promise<void> {
    const url = `${this.backendURL + this.moviesUrl}/${id}`;
    
    options = this.initializeRequestOptionArgs(options);
    return this.keycloak.getToken().then(token => {
        options.headers.append('Authorization', 'Bearer ' + token);
        options.headers.append('Content-Type', 'application/json');
        return this.http.delete(url, options)
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }).catch(this.handleError);
  }

  create(name: string, options?: RequestOptionsArgs): Promise<Movie> {
    options = this.initializeRequestOptionArgs(options);
    return this.keycloak.getToken().then(token => {
        options.headers.append('Authorization', 'Bearer ' + token);
        options.headers.append('Content-Type', 'application/json');
        return this.http.post(this.backendURL + this.moviesUrl, JSON.stringify({name: name}), options)
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);
    }).catch(this.handleError);
  }

  update(movie: Movie, options?: RequestOptionsArgs): Promise<Movie> {
    const url = `${this.backendURL + this.moviesUrl}/${movie.id}`;
    
    options = this.initializeRequestOptionArgs(options);
    return this.keycloak.getToken().then(token => {
        options.headers.append('Authorization', 'Bearer ' + token);
        options.headers.append('Content-Type', 'application/json');
        return this.http.put(url, JSON.stringify(movie), options)
          .toPromise()
        .then(() => movie)
          .catch(this.handleError);
    }).catch(this.handleError);
  }

  searchByName(term: string, options?: RequestOptionsArgs): Promise<Movie[]> {
    const url = `${this.backendURL + this.moviesUrl}ByName/${term}`;
    
    options = this.initializeRequestOptionArgs(options);
    return this.keycloak.getToken().then(token => {
        options.headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(url, options)
          .toPromise()
          .then(response => response.json() as Movie[])
          .catch(this.handleError);
    }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private initializeRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
      if (options == null) {
          options = new RequestOptions();
      }

      if (options.headers == null) {
          options.headers = new Headers();
      }

      return options;
  }

}

