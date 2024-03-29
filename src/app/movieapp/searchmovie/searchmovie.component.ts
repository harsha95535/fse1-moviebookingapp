import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from 'src/app/movie.service';
import { Movie } from '../models/Movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchmovie',
  templateUrl: './searchmovie.component.html',
  styleUrls: ['./searchmovie.component.css']
})
export class SearchmovieComponent implements OnInit {

  searchForm : FormGroup;

  movieName : string = ""
  message : string = '';
  movies : Movie[] = []
  isSearchedForMovie : boolean = false;
  errorMes :string = ''

  constructor(private movieService:MovieService,private fb: FormBuilder,private router:Router) { 
    this.searchForm = this.fb.group({
      movieName: ['', Validators.required]})
  }

  onSubmit(){
    // console.log(this.movieName);
    this.movieName = this.movieService.validateMovieName(this.movieName);
    this.isSearchedForMovie=true;
    this.movieService.getMovieByName(this.movieName).subscribe(
      res=>{
        this.errorMes = ''
        this.movies = res
        // console.log(res)
      },
      err=>{
        console.log(err)
        this.movies = []
        this.errorMes = err.error;
        this.message = "No movie found with name '" + this.movieName ;
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

  booktickets(movieName:string, movieTheatre:string){
    this.movieService.setMovieName(movieName);
    this.movieService.setMovieTheatre(movieTheatre);
    this.router.navigate(['/bookticket'])
  }
  ngOnInit(): void {
  }

}
