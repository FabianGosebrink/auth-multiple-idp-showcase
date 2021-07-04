import { Component, OnInit } from '@angular/core';
import {
  AuthenticatedResult,
  OidcSecurityService,
  UserDataResult,
} from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'auth-multiple-idp-showcase';

  aadResult: any;
  auth0Result: any;
  allAuth$: Observable<AuthenticatedResult>;
  allUserData$: Observable<UserDataResult>;

  constructor(private oidcSecurityService: OidcSecurityService) {}

  ngOnInit() {
    this.allAuth$ = this.oidcSecurityService.isAuthenticated$;

    this.allUserData$ = this.oidcSecurityService.userData$;

    this.oidcSecurityService.checkAuthMultiple().subscribe((result) => {
      this.auth0Result = result.find((x) => x.configId === 'auth0-config');

      this.aadResult = result.find((x) => x.configId === 'aad-config');
    });
  }

  loginAuth0() {
    this.oidcSecurityService.authorize('auth0-config');
  }

  logoutAuth0() {
    this.oidcSecurityService.logoff('auth0-config');
  }

  loginAad() {
    this.oidcSecurityService.authorize('aad-config');
  }

  logoutAad() {
    this.oidcSecurityService.logoff('aad-config');
  }
}
