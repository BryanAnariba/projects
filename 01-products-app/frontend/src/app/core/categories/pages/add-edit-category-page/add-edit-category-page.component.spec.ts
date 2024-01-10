import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCategoryPageComponent } from './add-edit-category-page.component';

describe('AddEditCategoryPageComponent', () => {
  let component: AddEditCategoryPageComponent;
  let fixture: ComponentFixture<AddEditCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditCategoryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
