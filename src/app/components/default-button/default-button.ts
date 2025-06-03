import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-default-button',
  imports: [],
  templateUrl: './default-button.html',
  styleUrl: './default-button.css'
})
export class DefaultButton {

  // Propriedades que podem ser passadas para o componente
  @Input() texto: string = 'Botão'; // Valor padrão
  @Input() cor: string = '#7f5af0'; // Cor padrão
  @Input() paddingX: string = '10'; // px padrão (padding eixo x)
  @Input() paddingY: string = '4'; // py padrão (padding eixo y)

  // No componente .ts
  get buttonClasses(): string {
  const paddingXClass = this.getPaddingClass('x', this.paddingX);
  const paddingYClass = this.getPaddingClass('y', this.paddingY);
  
  return `text-white button-hover font-medium border-black border-b-5 border-r-5 text-xl ${paddingXClass} ${paddingYClass} mb-2`;
}

private getPaddingClass(direction: 'x' | 'y', value: string): string {
  const classMap: { [key: string]: string } = {
    'x-1': 'px-1', 'x-2': 'px-2', 'x-3': 'px-3', 'x-4': 'px-4', 
    'x-5': 'px-5', 'x-6': 'px-6', 'x-8': 'px-8', 'x-9': 'px-9', 'x-10': 'px-10',
    'y-1': 'py-1', 'y-2': 'py-2', 'y-3': 'py-3', 'y-4': 'py-4',
    'y-5': 'py-5', 'y-6': 'py-6', 'y-8': 'py-8', 'y-9': 'py-9', 'y-10': 'py-10'
  };
  
  return classMap[`${direction}-${value}`] || `p${direction}-4`; // fallback
}
}
