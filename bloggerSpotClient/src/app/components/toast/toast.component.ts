import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { ToastServiceService, ToastMessage } from '../../services/toastService/toast-service.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  message: ToastMessage | null = null;
  private toastSub!: Subscription;
  private timerSub!: Subscription;

  constructor(private toastService: ToastServiceService) {}

  ngOnInit() {
    this.toastSub = this.toastService.toast$.subscribe((msg) => {
      this.message = msg;
      if (this.timerSub) this.timerSub.unsubscribe();
      this.timerSub = timer(msg.duration || 3000).subscribe(() => this.message = null);
    });
  }

  ngOnDestroy() {
    if (this.toastSub) this.toastSub.unsubscribe();
    if (this.timerSub) this.timerSub.unsubscribe();
  }
} 