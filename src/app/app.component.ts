import { Component, OnInit } from '@angular/core';
import {
  ConfigAuthenticated,
  ConfigUserData,
  OidcSecurityService,
} from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'auth-multiple-idp-showcase';

  aadResult: any;
  auth0Result: any;
  allAuth: ConfigAuthenticated[] = [];
  allUserData: ConfigUserData[] = [];

  constructor(private oidcSecurityService: OidcSecurityService) {}

  ngOnInit() {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ allConfigsAuthenticated }) => (this.allAuth = allConfigsAuthenticated)
    );

    this.oidcSecurityService.userData$.subscribe(
      ({ allUserData }) => (this.allUserData = allUserData)
    );

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
