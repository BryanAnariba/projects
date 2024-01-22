import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image-loading',
  templateUrl: './lazy-image-loading.component.html',
  styleUrl: './lazy-image-loading.component.scss'
})
export class LazyImageLoadingComponent implements OnInit {
  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.url) throw new Error('Image URL is required');
  }

  public onLoad(): void {
    //console.log('Image loaded');
    this.hasLoaded = true;
  }
}
