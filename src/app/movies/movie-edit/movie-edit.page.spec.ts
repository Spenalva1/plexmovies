import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovieEditPage } from './movie-edit.page';

describe('MovieEditPage', () => {
  let component: MovieEditPage;
  let fixture: ComponentFixture<MovieEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
