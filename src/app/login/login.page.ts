import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  values: string;
  chave1: any[];
  alunos = [];


  constructor(private router: Router) { }

  ngOnInit() {

  }


  logInMe(){
    this.router.navigate(['/tabs/tab1']);
    }


  recoverME(){
    this.router.navigate(['/recover-password']);
  }


  mail(event: any){
    this.values  = event.target.value;
    console.log(this.values);
  }


  // PersonME(age: int )

  password(event: any){
    this.values  = event.target.value;
    console.log(this.values);
}


  //  array = [
 //   {chave1: "valor1", "valor2"},
  //   {chave2: "valor2", "valor3"}
  // ]


  //  array = [
  //   {chave1: "valor1", "valor2"},
  //   {chave2: "valor2", "valor3"}
  // ]

//  public alunos = ['Wesley', 'Marina', 'Bruno', 'Paula'];

}
