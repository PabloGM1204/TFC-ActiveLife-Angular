import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProblemasPage } from './problemas.page';

describe('ProblemasPage', () => {
  let component: ProblemasPage;
  let fixture: ComponentFixture<ProblemasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProblemasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
