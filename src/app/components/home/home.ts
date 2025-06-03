import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { DefaultButton } from '../default-button/default-button';

@Component({
  selector: 'app-home',
  imports: [DefaultButton],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {
  @ViewChild('homeSection') homeSection!: ElementRef;

  ngAfterViewInit() {
    this.setupAnimationObserver();
  }

  private setupAnimationObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.resetAnimations();
        }
      });
    }, {
      threshold: 0.5
    });

    if (this.homeSection?.nativeElement) {
      observer.observe(this.homeSection.nativeElement);
    }
  }

  private resetAnimations() {
    // Adicione um pequeno delay para garantir que o Angular tenha renderizado tudo
    setTimeout(() => {
      const animatedElements = this.homeSection.nativeElement.querySelectorAll(
        '.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-down, ' +
        '.fade-in-scale, .typewriter-line1, .typewriter-line2, ' +
        '.typewriter-description, .float-1, .float-2, .float-3, ' +
        '.float-4, .float-5'
      );

      animatedElements.forEach((el: HTMLElement) => {
        const classes = el.className.split(' ');
        const animationClasses = classes.filter(c => 
          c.startsWith('fade-') || 
          c.startsWith('typewriter-') || 
          c.startsWith('float-')
        );
        
        el.classList.remove(...animationClasses);
        void el.offsetWidth; // Reflow
        el.classList.add(...animationClasses);
      });
    }, 50);
  }
}
