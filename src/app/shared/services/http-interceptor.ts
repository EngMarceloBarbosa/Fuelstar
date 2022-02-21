// import { environment } from "./../../../environments/environment";
// import { Router } from "@angular/router";
// import { AlertService } from "niup-mobile-components-test";
// import { Injectable } from "@angular/core";
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpResponse, HttpHeaders } from "@angular/common/http";

// import { catchError, tap } from "rxjs/operators";
// import { throwError } from "rxjs";

// import { LoadingService } from "./../http/loading.service";
// import { TranslateService } from "@ngx-translate/core";

// @Injectable()
// export class HttpIntercept implements HttpInterceptor {
//   alertMessagesTranslations: any;
//   serverMessagesTranslations: any;

//   constructor(
//     private router: Router,
//     private message: AlertService,
//     private loadingService: LoadingService,
//     private translate: TranslateService
//   ) {
//     this.translate.get("ServerMessages").subscribe((res) => (this.serverMessagesTranslations = res));
//     this.translate.get("AlertMessages").subscribe((res) => (this.alertMessagesTranslations = res));
//   }

//   /**
//    * Intercept HTTP reqeust
//    * @param {HttpRequest<any>} request
//    * @param {HttpHandler} next
//    */
//   intercept(request: any, next: HttpHandler) {
//     return next.handle(request).pipe(tap(this.handleSuccess), catchError(this.handleError));
//   }

//   /**
//    * Handle error
//    * @param {HttpErrorResponse} error
//    */
//   handleError = (error: HttpErrorResponse) => {
//     if (error instanceof HttpErrorResponse) {
//       this.serverError(error);
//       return throwError(error);
//     }
//     this.loadingService.dismiss();

//     return throwError(error);
//   };

//   /**
//    * Switch statement to handle status erros
//    * @param {HttpErrorResponse} response
//    */
//   serverError(response: HttpErrorResponse) {
//     const { status, error } = response;

//     let message = this.serverMessagesTranslations.message;

//     if (status === 200) return;

//     if (error.friendlyMessage || error.friendlyMessage !== "") {
//       message = error.friendlyMessage;
//     }

//     let temp: any = {
//       showTip: false,
//       title: this.serverMessagesTranslations.title,
//       description: this.serverMessagesTranslations.description,
//       state: "warning",

//       leftButtonSize: "btnSmall",
//       leftButtonType: "text",

//       rightButtonSize: "btnSmall",
//       rightButtonType: "text",
//       rightButtonText: this.alertMessagesTranslations.rigthButtonCancel,
//       rightButtonColor: "c-scale-12",
//       rightButtonCallback: () => {
//         this.router.navigate(["/login"]);
//       },
//     };

//     switch (status) {
//       case 400:
//         temp = {
//           title: this.serverMessagesTranslations.title,
//           description: this.serverMessagesTranslations.description,
//           state: "error",
//           leftButtonSize: "btnSmall",
//           leftButtonType: "text",
//           leftButtonText: "",

//           rightButtonSize: "btnSmall",
//           rightButtonType: "text",
//           rightButtonText: this.alertMessagesTranslations.rigthButtonOk,
//           rightButtonColor: "c-scale-12",
//           rightButtonCallback: () => {
//             console.log("ooooooooooooooooooooooooooo");
//             console.log(this.alertMessagesTranslations.rigthButtonOk);
//             console.log("ooooooooooooooooooooooooooo");
//             this.router.navigate(["/login"]);
//           },
//         };
//         this.message.open(temp);

//       case 404:
//         temp = {
//           title: this.serverMessagesTranslations.title,
//           description: this.serverMessagesTranslations.notFound,
//           state: "error",
//           leftButtonSize: "btnSmall",
//           leftButtonType: "text",
//           leftButtonText: "",

//           rightButtonSize: "btnSmall",
//           rightButtonType: "text",
//           rightButtonText: this.alertMessagesTranslations.rigthButtonCancel,
//           rightButtonColor: "c-scale-12",
//           rightButtonCallback: () => {
//             this.router.navigate(["/login"]);
//           },
//         };
//         this.message.open(temp);

//       default:
//         temp = {
//           title: this.serverMessagesTranslations.title,
//           description: this.serverMessagesTranslations.message,
//           state: "error",
//           leftButtonSize: "btnSmall",
//           leftButtonType: "text",
//           leftButtonText: "",

//           rightButtonSize: "btnSmall",
//           rightButtonType: "text",
//           rightButtonText: this.alertMessagesTranslations.rigthButtonOk,
//           rightButtonColor: "c-scale-12",
//           rightButtonCallback: () => {
//             console.log("ooooooooooooooooooooooooooo");
//             console.log("OOOOLLLLLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
//             console.log("ooooooooooooooooooooooooooo");
//             this.router.navigate(["/login"]);
//           },
//         };
//         this.message.open(temp);
//     }
//   }

//   handleSuccess = (response: HttpResponse<any>) => {
//     if (!response) return;

//     if (response.url && response.url.includes(environment.api)) {
//       this.loadingService.dismiss();
//     }
//   };
// }
