import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgBrandIconComponent } from './svg-brand-icon.component';

describe('SvgBrandIconComponent', () => {
  let component: SvgBrandIconComponent;
  let fixture: ComponentFixture<SvgBrandIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgBrandIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgBrandIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
