import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WishListComponent } from './wish-list.component';
import { AlertService } from 'src/app/services/alert.service';
import { ProviderService } from 'src/app/services/provider.service';

describe('WishListComponent', () => {
  let component: WishListComponent;
  let providerServiceSpy: jasmine.SpyObj<ProviderService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  beforeEach(() => {
    const providerServiceSpyObj = jasmine.createSpyObj('ProviderService', ['getDataFromStorage', 'setCourses']);
    const alertServiceSpyObj = jasmine.createSpyObj('AlertService', ['presentAlert', 'presentToast']);

    TestBed.configureTestingModule({
      declarations: [WishListComponent],
      providers: [
        { provide: ProviderService, useValue: providerServiceSpyObj },
        { provide: AlertService, useValue: alertServiceSpyObj }
      ],
      imports: [RouterTestingModule]
    });

    providerServiceSpy = TestBed.inject(ProviderService) as jasmine.SpyObj<ProviderService>;
    alertServiceSpy = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;

    component = TestBed.createComponent(WishListComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties on initialization', async () => {
    const mockCourseList = [{ id: 1, name: 'Course 1', isAddedToFavorite: true, actualPrice: '₹100', discountPercentage: '10' }];
    const mockCourses = [{ id: 1, name: 'Course 1', isAddedToFavorite: true, actualPrice: '₹100', discountPercentage: '10' }];

    providerServiceSpy.getDataFromStorage.and.resolveTo(mockCourseList);

    await component.ngOnInit();


    expect(component.courses).toEqual(mockCourses);
    expect(component.price).toEqual(100);
    expect(component.discountedPrice).toEqual('90.00');
  });

  it('should add course to cart', () => {
    const mockCourse = { id: 1, name: 'Course 1', isAddedToFavorite: true, isAddedToCart: false };

    component.courses = [mockCourse];
    const mockCourseList: any = []; 
    providerServiceSpy.setCourses.and.callFake((courses) => {
      mockCourseList.push(...courses);
    });

    component.addToCart(mockCourse, 0);

    expect(component.courses.length).toBe(0);
    expect(alertServiceSpy.presentAlert).toHaveBeenCalledWith('Success', 'Course successfully added to cart');
    expect(providerServiceSpy.setCourses).toHaveBeenCalledWith(mockCourseList);
  });

  it('should delete course from favorites', async () => {
    const mockCourse = { id: 1, name: 'Course 1', isAddedToFavorite: true };
    const mockCourseList:any = [];

    providerServiceSpy.setCourses.and.callFake(async (courses) => {
      mockCourseList.push(...courses);
    });

    component.courses = [mockCourse];
    await component.delete(mockCourse, 0);

    expect(component.courses.length).toBe(0);
    expect(alertServiceSpy.presentToast).toHaveBeenCalledWith('Course removed from favorites', 'dark');
    expect(providerServiceSpy.setCourses).toHaveBeenCalledWith(mockCourseList);
  });
});
