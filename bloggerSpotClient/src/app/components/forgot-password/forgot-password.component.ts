import { Component } from '@angular/core';
import { FormsModule, NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastServiceService } from '../../services/toastService/toast-service.service';
import { ApiService } from '../../services/apiService/apiService';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-otp',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class ForgotPasswordComponent {
  otpValue = '';
  
  constructor(private router: Router,
  private toastService: ToastServiceService,
  private apiService: ApiService,
  private localStorage : LocalStorageService,
) {}

  goBack() {
    this.router.navigate(['/email-verification']);
  }

  onOtpInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    this.otpValue = value;
    input.value = value;
  }

  onKeyPress(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight'
    ];

    if (allowedKeys.includes(event.key)) return;

    if (!/^\d$/.test(event.key)) event.preventDefault();

    if (this.otpValue.length >= 4) event.preventDefault();
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.otpValue.length === 4) {
      this.apiService.post('http://localhost:8080/bloggerSpot/user/resetPassword',   {
        otp: this.otpValue,
        email: this.localStorage.getItem('userEmail'),
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
          this.router.navigate(['/reset-password']);
        },
        error: (err) => {
          console.error('Email verification failed', err);
          
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
}
