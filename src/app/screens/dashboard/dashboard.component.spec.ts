import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { AlertService } from 'src/app/services/alert.service';
import { ProviderService } from 'src/app/services/provider.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;
  let providerServiceSpy: jasmine.SpyObj<ProviderService>;

  beforeEach(async () => {
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['presentAlert']);
    providerServiceSpy = jasmine.createSpyObj('ProviderService', ['getCourses', 'getDataFromStorage', 'setCourses']);

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: ProviderService, useValue: providerServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties on initialization', async () => {
    const mockCourses: any = [

    ];

    providerServiceSpy.getCourses.and.returnValue(Promise.resolve(mockCourses));

    await fixture.detectChanges();

    expect(component.courses).toEqual(mockCourses);
    expect(component.renderedCourses).toEqual(mockCourses);
    expect(component.isIonScrollDisabled).toBe(false);
  });

  it('should add course to cart', async () => {
    const mockCourse = { id: 1, name: 'Course 1', isAddedToCart: false };
    const mockDataFromStorage: any[] = [];
  
    providerServiceSpy.setCourses.and.callFake((coursesArray: any[]) => {
      mockDataFromStorage.push(...coursesArray);
    });
  
    component.addToCart(mockCourse);
  
    expect(alertServiceSpy.presentAlert).toHaveBeenCalledWith('Success', 'Course successfully added in the cart');
    expect(mockCourse.isAddedToCart).toBe(true);
    expect(providerServiceSpy.getDataFromStorage).toHaveBeenCalled();
  });
});
