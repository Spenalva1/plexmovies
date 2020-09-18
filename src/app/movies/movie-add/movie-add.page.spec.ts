import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovieAddPage } from './movie-add.page';

describe('MovieAddPage', () => {
  let component: MovieAddPage;
  let fixture: ComponentFixture<MovieAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
