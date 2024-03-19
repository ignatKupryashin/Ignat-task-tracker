import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAndSortingComponent } from './filter-and-sorting.component';

describe('FilterAndSortingComponent', () => {
  let component: FilterAndSortingComponent;
  let fixture: ComponentFixture<FilterAndSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterAndSortingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterAndSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
