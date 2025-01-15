import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Holi2Page } from './holi2.page';

describe('Holi2Page', () => {
  let component: Holi2Page;
  let fixture: ComponentFixture<Holi2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Holi2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
