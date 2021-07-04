import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forRoot([]),
    AuthModule.forRoot({
      config: [
        {
          configId: 'auth0-config',
          authority: 'https://dev-damienbod.eu.auth0.com',
          redirectUrl: window.location.origin,
          postLogoutRedirectUri: window.location.origin,
          clientId: 'Ujh5oSBAFr1BuilgkZPcMWEgnuREgrwU',
          scope: 'openid profile offline_access auth0-user-api-spa',
          responseType: 'code',
          silentRenew: true,
          useRefreshToken: true,
          logLevel: LogLevel.Debug,
          customParamsAuthRequest: {
            audience: 'https://auth0-api-spa',
          },
          customParamsRefreshTokenRequest: {
            scope: 'openid profile offline_access auth0-user-api-spa',
          },
        },
        {
          configId: 'aad-config',
          authority:
            'https://login.microsoftonline.com/7ff95b15-dc21-4ba6-bc92-824856578fc1/v2.0',
          authWellknownEndpointUrl:
            'https://login.microsoftonline.com/common/v2.0',
          redirectUrl: window.location.origin,
          clientId: 'e38ea64a-2962-4cde-bfe7-dd2822fdab32',
          scope:
            'openid profile offline_access email api://e38ea64a-2962-4cde-bfe7-dd2822fdab32/access_as_user',
          responseType: 'code',
          silentRenew: true,
          maxIdTokenIatOffsetAllowedInSeconds: 600,
          issValidationOff: true,
          autoUserInfo: false,
          // silentRenewUrl: window.location.origin + '/silent-renew.html',
          useRefreshToken: true,
          logLevel: LogLevel.Debug,
          customParamsAuthRequest: {
            prompt: 'select_account', // login, consent
          },
        },
      ],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
