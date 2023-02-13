
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  bottom1: any;
  lastScrollY: any;
  constructor() {}



  invest() {
    this.bottom1= document.querySelector(".bottom1");
    this.lastScrollY = window.scrollY;

     window.addEventListener("scroll", () => {
    if(this.lastScrollY < window.scrollY) {
      console.log("We are going down ");

    }
    else {
      console.log("we are going up");
    }
  });
}
}
