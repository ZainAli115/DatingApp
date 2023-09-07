import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  RegisterForm!: FormGroup;
  maxDate!:Date;
  validationErrors: string[] =[];

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate= new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  initializeForm(){
    this.RegisterForm= this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password:['', [Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]

    })
  }

 matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      const parent = control.parent as FormGroup | null; // Explicitly assert as FormGroup or null
      
      if (parent && parent.get(matchTo)) {
        const matchingControl = parent.get(matchTo);
  
        return control.value === matchingControl?.value ? null : {isMatching: true };
      }
  
      return null;
    };
  }
  

  register(){
   this.accountService.register(this.RegisterForm.value).subscribe(response =>{
    this.router.navigateByUrl('/members');
   }, error =>{
    this.validationErrors=error;
      })
  }

  cancel(){
   this.cancelRegister.emit(false);
  }

}
