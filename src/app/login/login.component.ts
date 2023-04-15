import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData:any;
  res: any;
  roles:any;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(  private router:Router, private msalService:MsalService , private broadcastService : MsalBroadcastService){}
  ngOnInit(){
  
    this.msalService.handleRedirectObservable().subscribe({
      next:(result:AuthenticationResult)=>{
        debugger
        if(result != null && result.account != null){
          this.msalService.instance.setActiveAccount(result.account)
        }
      

      },
      error:(error)=>console.log(error)
    })


   debugger
    // this.msalService.instance.getAllAccounts().length>0;

    this.broadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    )
    .subscribe(() => {
      this.setLoginDisplay();
    })



    let allAccounts = this.msalService.instance.getAllAccounts();
    if (allAccounts.length > 0) {
      debugger
      let account = allAccounts[0];
      debugger
      this.roles = account.idTokenClaims?.roles;
      if(this.roles){
        this.router.navigate(['./home'])
      }else{
        this.router.navigate(['./users'])
        
      }
      console.log(this.roles)
      
    }




  }


  
  setLoginDisplay() {
    this.loginDisplay= this.msalService.instance.getAllAccounts().length > 0;
  }

 





  logIn(){
    this.msalService.loginRedirect()
  }


  


  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
