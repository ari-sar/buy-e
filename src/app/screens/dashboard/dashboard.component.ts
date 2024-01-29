import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ProviderService } from 'src/app/services/provider.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isIonScrollDisabled = false;
  courses: any = [];
  renderedCourses: any = [];
  isFilterOpen = false;
  cartItems: any = [];
  isCartOpen = false;
  selectedCourse: any;
  constructor(
    private alertService: AlertService,
    private providerService: ProviderService,
    private router: Router
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  async ngOnInit() {
    const data = JSON.parse(JSON.stringify(await this.providerService.getCourses()))
    data.map((course: any) => {
      course.isExpanded = false;
    })
    this.courses = data;
    this.cartItems = this.courses.filter((course: any) => course.isAddedToCart);
    this.renderedCourses = this.courses.splice(0, 4);
    this.renderedCourses[0].isExpanded = true;
  }

  calculatePrice(actualPrice: string, discountPercentage: string) {
    const formattedPrice = actualPrice.split('₹');
    const price = parseInt(formattedPrice[1]);
    const percentage = parseInt(discountPercentage);
    const discount = (price * percentage) / 100;
    const discountedPrice = price - discount
    return discountedPrice.toFixed(2)
  }

  calculateTotalPrice(coursesList: any) {
    let total = 0;
    coursesList.map((course: any) => {
      const formattedPrice = course.actualPrice.split('₹');
      const price = parseInt(formattedPrice[1]);
      if (course.discountPercentage !== 0) {
        const percentage = parseInt(course.discountPercentage);
        const discount = (price * percentage) / 100;
        const discountedPrice = price - discount
        total += discountedPrice;
        // return discountedPrice.toFixed(2)
      } else {
        total += price
      }
    })
    return total.toFixed(2);
  }

  async addToCart(course: any) {
    if (course.isAddedToCart) {
      this.alertService.presentAlert('Attention !', 'Already exists in the cart')
    } else {
      this.alertService.presentAlert('Success', 'Course successfully added in the cart');
      course.isAddedToCart = true;
      let data = await this.providerService.getDataFromStorage();
      data.map((d: any) => {
        if (d.id === course.id) {
          d.isAddedToCart = true;
          d.isAddedToFavorite = false;
        }
      });
      this.cartItems.push(course);
      this.providerService.setCourses(data);
    }
  }

  async addToFavorites(course: any) {
    course.isAddedToFavorite = true;
    let data = await this.providerService.getDataFromStorage();
    data.map((d: any) => {
      if (d.id === course.id) {
        d.isAddedToFavorite = true;
      }
    });
    this.providerService.setCourses(data);

  }

  private generateItems(ev: any) {
    if (this.courses.length > 0) {
      this.renderedCourses.push(...this.courses.splice(0, 4));
    } else {
      this.isIonScrollDisabled = true;
    }
    // console.log(this.courses, this.isIonScrollDisabled);
    (ev as InfiniteScrollCustomEvent).target.complete();
  }

  onIonInfinite(ev: any) {
    this.generateItems(ev);
  }

  search(event: any) {
    const query = event.target.value.toLowerCase();
    if (query) {
      if (!this.isIonScrollDisabled) {
        this.isIonScrollDisabled = true;
      }
      let courseList = [];
      this.providerService.getDataFromStorage().then(res => {
        courseList = res;
        const filteredData = courseList.filter((course: any) => {
          // Checking if query matches course title, author, or tags
          return (
            course.courseName.toLowerCase().includes(query) ||
            course.author.toLowerCase().includes(query) ||
            course.tags.some((tag: any) => tag.toLowerCase().includes(query))
          );
        });
        this.renderedCourses = filteredData;
      })
    } else {
      this.isIonScrollDisabled = false;
      this.providerService.getDataFromStorage().then(res => {
        this.courses = res;
        this.renderedCourses = this.courses.splice(0, 4);
      })
      console.log(this.isIonScrollDisabled)
    }
  }

  async sortByLowestPrice() {
    this.isIonScrollDisabled = false;
    this.isFilterOpen = !this.isFilterOpen;
    const data = await this.providerService.getDataFromStorage();
    this.courses = data.slice().sort((a: any, b: any) => {
      const priceA = parseFloat(a.actualPrice.replace(/[^\d.-]/g, ''));
      const priceB = parseFloat(b.actualPrice.replace(/[^\d.-]/g, ''));
      return priceA - priceB;
    });
    this.renderedCourses = this.courses.splice(0, 4)
  }

  async sortByHighestPrice() {
    this.isIonScrollDisabled = false;
    this.isFilterOpen = !this.isFilterOpen;
    const data = await this.providerService.getDataFromStorage();
    this.courses = data.slice().sort((a: any, b: any) => {
      const priceA = parseFloat(a.actualPrice.replace(/[^\d.-]/g, ''));
      const priceB = parseFloat(b.actualPrice.replace(/[^\d.-]/g, ''));
      return priceB - priceA;
    });
    this.renderedCourses = this.courses.splice(0, 4)
  }

  onCourseSelect(course: any) {
    this.selectedCourse = course;
    localStorage.setItem('selectedCourse', JSON.stringify(course));
    this.router.navigateByUrl('/screens/course-details')
    // console.log(course);
  }
  goToCart(){
    this.isCartOpen = false;
    this.router.navigateByUrl('/screens/cart')
  }
}
