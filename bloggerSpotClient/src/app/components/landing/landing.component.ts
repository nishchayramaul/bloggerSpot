
import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import {ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms'
import { first, last, Observable } from 'rxjs';
import { ApiService } from '../../services/apiService/apiService';
import { ToastServiceService } from '../../services/toastService/toast-service.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  isSignup : boolean = false 


  onClick(){
    this.isSignup = !this.isSignup
  }


   form : any = new FormGroup({
    email  : new FormControl("",[
      Validators.required,
      Validators.email
    ]),
    firstName : new FormControl(""),
    lastName : new FormControl(""),
    username : new FormControl("",Validators.minLength(8)),
    password : new FormControl("",Validators.required),
    confirmPassword : new FormControl("")},
    {
      validators : this.validatePassword
    })


   constructor(
    private readonly apiService: ApiService,
    private readonly toastService: ToastServiceService
  ) {}
   signUp() {
    this.apiService.signIn("http://localhost:8080/bloggerSpot/user/signup", this.form.value)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.toastService.showToast("Signup successful", "success");
          }
        },
        error: (err) => {
          const errorMsg = err?.error?.error || "Signup failed";
          this.toastService.showToast(errorMsg, "error");
        }
      });
  }

validatePassword(formGroup: AbstractControl): ValidationErrors | null{
 const password = formGroup.get('password')?.value;
 const confirmPassword = formGroup.get('confirmPassword')?.value;

 if(password === confirmPassword){
  return null;
 }
  return {validatePassword : true };

}


login(){
  this.apiService.Login("http://localhost:8080/bloggerSpot/user/login",this.form.value)
    .subscribe({
      next: (response: any) => {
        if (response) {
          this.toastService.showToast("Login successful", "success");
        }
      },
      error: (err) => {
        const errorMsg = err?.error?.error || "Login failed";
        this.toastService.showToast(errorMsg, "error");
      }
    });
  }

}

