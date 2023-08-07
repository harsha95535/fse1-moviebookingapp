import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/movie.service';
import { Movie } from '../models/Movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allmovies',
  templateUrl: './allmovies.component.html',
  styleUrls: ['./allmovies.component.css']
})
export class AllmoviesComponent implements OnInit {

  loggedInAsGuest : boolean = false;

  statusColor : string = '';

  movieList : Movie[] = [];

  constructor(public movieService:MovieService,public router:Router) { 
    movieService.getAllMovies().subscribe(
      (response)=>{
        console.log(response);
        this.movieList = response;
        console.log(this.movieList);
      }
    )   
  }
  getMovieImagePath(movieName: string){
    switch(movieName){
      case 'Mission Impossible:7': return '../../../assets/images/movies/MI7a.jpeg';
      case 'Oppenheimer': return '../../../assets/images/movies/oppenheimer_1.jpeg';
      case 'Bro': return '../../../assets/images/movies/BRO.png';
      default: return '';
    }
  }
  isLoggedAsUser(){
    if(sessionStorage.getItem('loginStatus') === 'user'){
      return true;
    }
    else{
      return false;
    }
  }
  getStatusColor(status:string):string{
    if(status === 'SOLD OUT')return 'red'
    else return 'green'
  }

  booktickets(movieName:string, movieTheatre:string){
    this.movieService.setMovieName(movieName);
    this.movieService.setMovieTheatre(movieTheatre);
    this.router.navigate(['/bookticket'])
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('loginStatus') === 'guest') {
      this.loggedInAsGuest = true;
    }
  }

}

