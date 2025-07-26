import { Component, OnDestroy, OnInit, signal } from '@angular/core';
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
  message = signal<ToastMessage | null>(null);
  isExiting = signal<boolean>(false);
  
  private toastSub!: Subscription;
  private timerSub!: Subscription;

  constructor(private toastService: ToastServiceService) {}

  ngOnInit() {
    this.toastSub = this.toastService.toast$.subscribe((msg) => {
      // If a toast is already exiting, clear it immediately before showing the new one.
      if (this.isExiting()) {
        this.message.set(null);
      }
      
      this.isExiting.set(false);
      this.message.set(msg);
      
      if (this.timerSub) {
        this.timerSub.unsubscribe();
      }
      
      // Start countdown for exit
      this.timerSub = timer(msg.duration || 3000).subscribe(() => {
        this.startExitAnimation();
      });
    });
  }

  private startExitAnimation() {
    if (!this.message()) return; // Don't run if there's no message

    this.isExiting.set(true);
    
    // **Wait 500ms (the length of the CSS animation) before removing the element**
    timer(500).subscribe(() => {
      this.message.set(null);
      this.isExiting.set(false);
    });
  }

  ngOnDestroy() {
    if (this.toastSub) this.toastSub.unsubscribe();
    if (this.timerSub) this.timerSub.unsubscribe();
  }
}