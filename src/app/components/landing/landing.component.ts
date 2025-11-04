import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import {ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms'
import { ApiService } from '../../services/apiService/apiService';
import { ToastServiceService } from '../../services/toastService/toast-service.service';
import { NavigationService } from '../../services/navigationService/navigation.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  isSignup : boolean = false 

  onClick(){
    this.isSignup = !this.isSignup
    this.form.updateValueAndValidity();
  }

  form : any = new FormGroup({
    email  : new FormControl("",[
      Validators.required,
      Validators.email
    ]),
    firstName : new FormControl(""),
    lastName : new FormControl(""),
    username : new FormControl("", [Validators.required, Validators.minLength(3)]), 
    password : new FormControl("", [Validators.required, Validators.minLength(6)]), 
    confirmPassword : new FormControl("", Validators.required) 
  }, {
    validators : this.validatePassword
  })

  constructor(
    private readonly apiService: ApiService,
    private readonly toastService: ToastServiceService,
    private readonly navigationService: NavigationService
  ) {}

  validatePassword(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { validatePassword: true };
    }
    return null;
  }

  isSignupFormValid(): boolean {
    const requiredFields = ['email', 'firstName', 'lastName', 'username', 'password', 'confirmPassword'];
    const allFieldsValid = requiredFields.every(field => {
      const control = this.form.get(field);
      return control && control.valid && control.value?.trim();
    });
    
    return allFieldsValid && !this.form.hasError('validatePassword');
  }

  isLoginFormValid(): boolean {
    const email = this.form.get('email');
    const password = this.form.get('confirmPassword'); 
    
    return email?.valid && password?.valid && email?.value?.trim() && password?.value?.trim();
  }

  signUp() {
    if (!this.isSignupFormValid()) {
      this.toastService.showToast("Please fill all required fields correctly", "error");
      return;
    }

    // Prepare signup data
    const signupData = {
      email: this.form.get('email')?.value,
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      username: this.form.get('username')?.value,
      confirmPassword: this.form.get('confirmPassword')?.value
    };

    this.apiService.post("/user/signup", signupData)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.toastService.showToast("Signup successful", "success");
            this.navigationService.goTo("/")
            this.isSignup = false;
            this.form.reset();
          }
        },
        error: (err) => {
          const errorMsg = err?.error?.error || "Signup failed";
          this.toastService.showToast(errorMsg, "error");
        }
      });
  }

  login(){
    if (!this.isLoginFormValid()) {
      this.toastService.showToast("Please enter valid email and password", "error");
      return;
    }

    // Prepare login data
    const loginData = {
      email: this.form.get('email')?.value,
      confirmPassword: this.form.get('confirmPassword')?.value 
    };

    this.apiService.post("/auth/login", loginData)
      .subscribe({
        next: (response: any) => {
          if (response) {
            try {
              const token = response?.token || response?.jwtToken || response?.accessToken;
              if (token) {
                localStorage.setItem('authToken', token);
              }
            } catch {}
            this.toastService.showToast("Login successful", "success");
            this.navigationService.goTo('/home');
          }
        },
        error: (err) => {
          const errorMsg = err?.error?.error || "Login failed";
          this.toastService.showToast(errorMsg, "error");
        }
      });
  }
}