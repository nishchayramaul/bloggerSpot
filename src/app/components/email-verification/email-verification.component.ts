import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/apiService/apiService';
import { ToastServiceService } from '../../services/toastService/toast-service.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
})
export class EmailVerificationComponent {

  constructor(
    private readonly apiService: ApiService,
    private router: Router,
    private toastService: ToastServiceService,
    private localStorage : LocalStorageService
  ) {}

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  onSubmit() {
    if (this.form.valid) {
      console.log('Email submitted:', this.form.value.email);
      this.localStorage.setItem('userEmail', this.form.value.email);
      // Show loading toast or indicator if needed
      this.toastService.showToast('Sending OTP...', 'info', 1500);
      
      // Send email to backend for verification with proper headers
      this.apiService.post(`/user/forgotPassword?email=${this.form.value.email}`, {
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'text' 
      }).subscribe({
        next: (response: any) => {
          console.log('Response received:', response);
          
          const message = response || 'OTP sent to your email';
          this.toastService.showToast(message, 'success');
          this.router.navigate(['/forgot-password']);
        },
        error: (err: any) => {
          console.error('Email verification failed', err);
          
          let errorMsg = "Failed to send OTP. Please try again.";
          
          if (err?.error) {
            const backendError =  err.error;
            errorMsg = backendError.error || errorMsg;
          }
          this.toastService.showToast(errorMsg, "error");
        }
      });
    }
  }
}