import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoRutinaPage } from './info-rutina.page';

describe('InfoRutinaPage', () => {
  let component: InfoRutinaPage;
  let fixture: ComponentFixture<InfoRutinaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoRutinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
