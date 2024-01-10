import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public navigationItems: MenuItem[] = [
    {
      name: 'Categories',
      icon: 'checklist',
      url: './categories/category-list'
    },
    {
      name: 'New Category',
      icon: 'save_alt',
      url: './categories/new-category'
    },
    {
      name: 'Products',
      icon: 'article',
      url: './products/product-list'
    },
    {
      name: 'New Product',
      icon: 'save_alt',
      url: './products/new-product'
    }
  ];
}
