import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let appFixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    appFixture = TestBed.createComponent(AppComponent);
    appFixture.detectChanges();
  }));

  it('should create the app', () => {
    const app = appFixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have main tag', () => {
    const compiled = appFixture.debugElement.nativeElement;
    expect(compiled.querySelector('main')).toBeTruthy();
  });
});
