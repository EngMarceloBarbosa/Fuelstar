import { trigger, transition, style, animate } from "@angular/animations";

export const FadeAnimation = [
  trigger("fade", [
    // transition(':enter', [style({ opacity: 0 }), animate('0.15s ease-out', style({ opacity: 1 }))]),
    // transition(':leave', [style({ opacity: 1 }), animate('0.15s ease-in', style({ opacity: 0 }))]),

    transition(":enter", [style({ opacity: 0 }), animate(".3s", style({ opacity: 1 }))]),
  ]),
];
