
import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _service: ServiceService,
    private router: Router,
    private ts:ToastrService
  ) {}

  ngOnInit() {}

  registrationForm = this.fb.group({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    lastName:new FormControl('',[Validators.required]),
    Email: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
  });

  registration1(input:any) {
    if(this.registrationForm.valid){
      console.log(input)
      this._service.registrationPost(input).subscribe((res) => {
        console.log(res);
        this.ts.success('your add sucessfully')
        this.router.navigate(['/login']);
      });

    }else{
      console.log('you are not a vaild candidate');
    }
   
  }
}
