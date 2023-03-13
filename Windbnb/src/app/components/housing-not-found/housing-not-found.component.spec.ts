import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingNotFoundComponent } from './housing-not-found.component';

describe('HousingNotFoundComponent', () => {
  let component: HousingNotFoundComponent;
  let fixture: ComponentFixture<HousingNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
