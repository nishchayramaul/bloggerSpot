import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/apiService/apiService';
import { ToastServiceService } from '../../services/toastService/toast-service.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
})
export class ResetPasswordComponent {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastService: ToastServiceService,
    private localStorage: LocalStorageService,
  ) {}
  
  form: FormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ])
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    }
    return { passwordMismatch: true };
  }

  onSubmit() {
    if (this.form.valid) {
      this.apiService.post('http://localhost:8080/bloggerSpot/user/resetPassword',   {
        email : this.localStorage.getItem('userEmail'),
        newPassword: this.form.value.password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'text'
      }).subscribe({
        next: (response: any) => {
          console.log('Response received:', response);
          
          const message = response;
          this.toastService.showToast(message, 'success');
          this.router.navigate(['/']);
        },
        error: (err) => {     
          let errorMsg = "Something went wrong. Please try again.";
          if (err?.error) {
            const backendError =  err.error;
            errorMsg = backendError.error || errorMsg;
          }
          this.toastService.showToast(errorMsg, "error");
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/forgot-password']);
  }
}