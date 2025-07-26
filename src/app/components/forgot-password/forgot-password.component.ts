import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class ForgotPasswordComponent {
  otpValue = '';

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
      console.log('OTP Submitted:', this.otpValue);
      // perform your OTP verification logic here
    }
  }
}
