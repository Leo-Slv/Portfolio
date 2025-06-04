import { Component } from '@angular/core';
import { DefaultButton } from '../default-button/default-button';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-home',
  imports: [DefaultButton],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor(public translationService: TranslationService) {}
  
    changeLanguage(lang: string) {
      this.translationService.setLanguage(lang);
    }

  
}
