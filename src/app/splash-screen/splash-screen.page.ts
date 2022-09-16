import { Component, OnInit } from '@angular/core';
import { SplashScreenStateService } from '../shared/services/splash-screen-state.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(   private splashScreenStateService: SplashScreenStateService) { }

  ngOnInit() {
      // Somewhere the stop method has been invoked
   this.splashScreenStateService.subscribe(res => {
    this.hideSplashAnimation();
 });
  }

  public opacityChange = 1;
  public splashTransition;
  // First access the splash is visible
  public showSplash = true;
  readonly ANIMATION_DURATION = 1;


  private hideSplashAnimation() {
    // Setting the transition
    this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
    this.opacityChange = 0;
    setTimeout(() => {
       // After the transition is ended the showSplash will be hided
       this.showSplash = !this.showSplash;
    }, 1000);
 }

}
