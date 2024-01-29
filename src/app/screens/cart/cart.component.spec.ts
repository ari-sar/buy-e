import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CartComponent } from './cart.component';
import { ProviderService } from 'src/app/services/provider.service';
import { AlertService } from 'src/app/services/alert.service';
import { AlertController } from '@ionic/angular';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let providerServiceSpy: jasmine.SpyObj<ProviderService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(waitForAsync(() => {
    const providerSpy = jasmine.createSpyObj('ProviderService', ['getDataFromStorage', 'setCourses']);
    const alertSpy = jasmine.createSpyObj('AlertService', ['presentAlert', 'presentToast']);
    const alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);

    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ProviderService, useValue: providerSpy },
        { provide: AlertService, useValue: alertSpy },
        { provide: AlertController, useValue: alertCtrlSpy }
      ]
    }).compileComponents();

    providerServiceSpy = TestBed.inject(ProviderService) as jasmine.SpyObj<ProviderService>;
    alertServiceSpy = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
    alertControllerSpy = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties on initialization', fakeAsync(() => {
    const mockCourses = [{ id: 1, name: 'Course 1', actualPrice: '₹100', discountPercentage: '10', isAddedToCart: true }];
    providerServiceSpy.getDataFromStorage.and.returnValue(of(mockCourses).toPromise());

    component.ngOnInit();
    tick();

    expect(component.courseList).toEqual(mockCourses);
    expect(component.courses).toEqual(mockCourses);
    expect(component.price).toBe(100);
    expect(component.discountedPrice).toBe('90.00');
  }));

  it('should add course to favorites', () => {
    const mockCourse = { id: 1, name: 'Course 1', isAddedToCart: true, isAddedToFavorites: false };
    const index = 0;
    component.addToFavorites(mockCourse, index)

    expect(alertServiceSpy.presentAlert).toHaveBeenCalledWith('Success', 'Course successfully moved to wishlist');
  });
});
