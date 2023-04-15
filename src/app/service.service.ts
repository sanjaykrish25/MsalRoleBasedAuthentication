import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService implements OnInit{

  constructor(private http:HttpClient) { }

  ngOnInit(){
    
  }

  geT(input:any){
    return this.http.get("http://localhost:3000/user",input)
      
  }

  registrationPost(inputdata:any){

    return this.http.post("http://localhost:3000/user",inputdata);
  }

}
