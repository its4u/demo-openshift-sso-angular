import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MoviesComponent }      from './movie/movies.component';
import { MovieDetailComponent }  from './movie/movie-detail.component';
import { MovieService }          from './movie/movie.service';
import { MovieSearchComponent }  from './movie-search/movie-search.component';
import { KeycloakService } from './security/keycloak.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
//    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MovieDetailComponent,
    MoviesComponent,
    MovieSearchComponent
  ],
  providers: [ MovieService, KeycloakService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

