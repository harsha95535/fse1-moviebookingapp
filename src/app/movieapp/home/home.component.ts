import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/movie.service';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchMovie : string = '';
  loggedInAsGuest : boolean = false; 
  loggedInAsUser : boolean = false;
  movieNameToSearch : string = '';
  message : string = '';
  movies : Movie[] = []
  isSearchedForMovie : boolean = false;
  
  constructor(public router: Router,private movieService:MovieService){
  }
  
  loginForGuest(){
    sessionStorage.removeItem('loginStatus');
    this.router.navigate(['/register']);
  }

  getUserStatus(){
    if(sessionStorage.getItem('loginStatus') === 'guest' || sessionStorage.getItem('loginStatus') === 'user'){
      return false;
    }
    else {
      return true;
    }
  }

  isLoggedInAsUser(){
    if(sessionStorage.getItem('loginStatus') === 'user'){
      return true;
    } 
    else{
      return false;
    }
  }

  getStatusForLogout(){
    if(sessionStorage.getItem('loginStatus') === 'user' || sessionStorage.getItem('loginStatus') === 'admin'){
      return true;
    }
    else {
      return false;
    }
  }

  logout(){
    sessionStorage.removeItem('loginStatus');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loginId');
    this.router.navigate(['/login']);
  }

  onSubmit(){
    this.movieService.setMovieNameToSearch(this.movieNameToSearch);
    this.router.navigate(['/searchmovie']);
  }

  
  ngOnInit(): void {
    if(sessionStorage.getItem('loginStatus') === 'guest') {
      this.loggedInAsGuest = true;
    }
    else if(sessionStorage.getItem('loginStatus') === 'user'){
      this.loggedInAsUser = true;
    }
  }

}
