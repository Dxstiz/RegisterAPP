import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClasProfePage } from './clas-profe.page';

describe('ClasProfePage', () => {
  let component: ClasProfePage;
  let fixture: ComponentFixture<ClasProfePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasProfePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
