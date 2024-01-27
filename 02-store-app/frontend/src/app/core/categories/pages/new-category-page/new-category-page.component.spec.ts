import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCategoryPageComponent } from './new-category-page.component';

describe('NewCategoryPageComponent', () => {
  let component: NewCategoryPageComponent;
  let fixture: ComponentFixture<NewCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewCategoryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
