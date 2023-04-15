import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { IPublicClientApplication, InteractionType, PublicClientApplication } from '@azure/msal-browser';

export function MsalInstanceConfig(): IPublicClientApplication{
  return new PublicClientApplication({
    auth:{
      clientId:'506d1d0c-f129-48dd-9dda-bdb06c273024',
      redirectUri:'http://localhost:4200',
      authority:'https://login.microsoftonline.com/{8f6bd982-92c3-4de0-985d-0e287c55e379}/'

    },
    cache:{
      cacheLocation:'localStorage',
    }
  })
  
}
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    }
  };
}




@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MsalModule,
  
   
  
  ],
  providers: [
    {
      provide:MSAL_INSTANCE,
      useFactory:MsalInstanceConfig
    },{
      provide:HTTP_INTERCEPTORS,
      useClass:MsalInterceptor,
      multi:true
    },{
      provide:MSAL_GUARD_CONFIG,
      useFactory:MSALGuardConfigFactory
    },{
      provide:MSAL_INTERCEPTOR_CONFIG,
      useFactory:MSALInterceptorConfigFactory
    },
    MsalService,
    MsalBroadcastService,
    MsalGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
