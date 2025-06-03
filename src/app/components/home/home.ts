import { Component } from '@angular/core';
import { DefaultButton } from '../default-button/default-button';

@Component({
  selector: 'app-home',
  imports: [DefaultButton],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
}
