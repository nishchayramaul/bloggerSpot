import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Quill
import Quill from 'quill';

@Component({
  selector: 'app-post-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent implements AfterViewInit {
  @ViewChild('editor', { static: true }) editorElement!: ElementRef<HTMLDivElement>;
  @ViewChild('toolbar', { static: true }) toolbarElement!: ElementRef<HTMLDivElement>;
  @ViewChild('titleInput', { static: true }) titleInputElement!: ElementRef<HTMLTextAreaElement>;

  private quillInstance!: Quill;

  ngAfterViewInit(): void {
    // Initialize Quill with basic configuration first
    this.quillInstance = new Quill(this.editorElement.nativeElement, {
      modules: {
        toolbar: this.toolbarElement.nativeElement,
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
    });

  }
}
