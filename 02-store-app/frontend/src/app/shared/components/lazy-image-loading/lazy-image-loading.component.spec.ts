import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyImageLoadingComponent } from './lazy-image-loading.component';

describe('LazyImageLoadingComponent', () => {
  let component: LazyImageLoadingComponent;
  let fixture: ComponentFixture<LazyImageLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LazyImageLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LazyImageLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
