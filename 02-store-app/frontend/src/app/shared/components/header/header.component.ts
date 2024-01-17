import { Component } from '@angular/core';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public totalCart: number = 0;
  
  public onSearch(value: string): void {
    console.log({value});
  }
}
