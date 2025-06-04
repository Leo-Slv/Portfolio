import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DefaultCard } from './../default-card/default-card';


@Component({
  selector: 'app-about',
  imports: [DefaultCard],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit, OnDestroy {
  private observer: IntersectionObserver | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.setupAboutAnimations();
    this.setupEducationAnimations();
  }

  private setupAboutAnimations(): void {
    // Verifica se está rodando no navegador
    if (isPlatformBrowser(this.platformId)) {
      const aboutSection = document.getElementById('about-section');
      
      if (!aboutSection) {
        console.warn('Seção "about-section" não encontrada');
        return;
      }

      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.01
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.triggerAnimations(entry.target);
          }
        });
      }, options);

      this.observer.observe(aboutSection);
    }
  }

  private setupEducationAnimations(): void {
    // Verifica se está rodando no navegador
    if (isPlatformBrowser(this.platformId)) {
      const educationSection = document.getElementById('education-section');
      
      if (!educationSection) {
        console.warn('Seção "education-section" não encontrada');
        return;
      }

      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.01
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.triggerAnimations(entry.target);
          }
        });
      }, options);

      this.observer.observe(educationSection);
    }
  }

  private triggerAnimations(section: Element): void {
    const animatedElements = section.querySelectorAll('[class*="fade-in"]');
    
    animatedElements.forEach((el) => {
      const element = el as HTMLElement;
      const originalClasses = element.className.split(' ');
      const animationClasses = originalClasses.filter(c => c.startsWith('fade-in') || c.startsWith('delay-'));
      
      element.classList.remove(...animationClasses);
      element.style.opacity = '0';
      
      // Força um reflow
      void element.offsetWidth;
      
      element.classList.add(...animationClasses);
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}