import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonLevelPage } from './pokemon-level.page';

describe('PokemonLevelPage', () => {
  let component: PokemonLevelPage;
  let fixture: ComponentFixture<PokemonLevelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonLevelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
