import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { CategoryService } from '../../../core/categories/services/category.service';

@Component({
  selector: 'shared-app-search-by',
  templateUrl: './search-by.component.html',
  styleUrl: './search-by.component.scss'
})
export class SearchByComponent implements OnInit, OnDestroy {
  @Input() public searchByLabel: string = '';
  @ViewChild('search-by') public tagInput!: ElementRef<HTMLInputElement>;

  private debouncer: Subject<string> = new Subject<string>();
  private deboucerSuscription?: Subscription;

  constructor (
    private categoryService: CategoryService
  ) {}

  onSearchBy(value: string) {
    this.debouncer.next(value);
  }

  ngOnInit(): void {
    this.deboucerSuscription = this.debouncer
    .pipe(
      debounceTime(300),
    )
    .subscribe(
      value => {
        //console.log({value});
        this.categoryService.getCategoryByName(value)
          .subscribe({
            next: (categories) => {
              console.log(categories)
            }
          })
      }
    )
  }

  ngOnDestroy(): void {
    this.deboucerSuscription?.unsubscribe();
  }
}
