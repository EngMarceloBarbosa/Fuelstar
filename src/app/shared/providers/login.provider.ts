import { Injectable } from "@angular/core";

@Injectable()
export class LoginProvider {
  public loginResult?;
  public individualNiup?;
  public representationNiup?;
  public selectedAccount?;
  public selectEntityRelationTo?;
  public withAlias;
  public authenticationLogin;
  // public avatarSelectAccount;
  // public avatarSelectEntityRelationTo;

  //feature for apresentation
  public ownProductDomainEndpoints?;
}
