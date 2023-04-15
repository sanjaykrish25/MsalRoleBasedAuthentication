import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private msalService:MsalService){}
  haAccess: any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.msalService.instance.getActiveAccount()?.idTokenClaims?.roles?.forEach(role => {
        debugger
        
       this.haAccess=role
       console.log(this.haAccess)
        // hasAccess(role: string): boolean {
        //   return (role === 'owner');
        // }
        debugger
      });
      if(this.haAccess==='owner')
      return true;
      else
      return false;
    }
  
  
}
