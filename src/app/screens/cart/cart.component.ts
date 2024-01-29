import { Router, NavigationEnd } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  price: number = 0;
  discountedPrice: any;
  courses: any = [];
  courseList: any = [];
  constructor(
    private providerService: ProviderService,
    private alertService: AlertService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  async ngOnInit() {
    this.courseList = await this.providerService.getDataFromStorage();
    this.courses = this.courseList.filter((ele: any) => ele.isAddedToCart);
    this.updatePrice()
  }
  updatePrice() {
    this.courses.map((ele: any) => {
      const priceArray = ele.actualPrice.split('₹');
      const actualPrice = priceArray[1];
      const price = typeof (actualPrice) === 'string' ? parseInt(actualPrice) : actualPrice;
      this.price += price;
    })
    this.discountedPrice = this.calculateTotalPrice(this.courses);
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

  addToFavorites(course: any, i: number) {
    this.courses.splice(i, 1);
    this.alertService.presentAlert('Success', 'Course successfully moved to wishlist')

    this.courseList.map((cr: any) => {
      if (cr.id === course.id) {
        cr.isAddedToCart = false;
        cr.isAddedToFavorite = true;
      }
    })
    this.providerService.setCourses(this.courseList);
    this.updatePrice()
  }

  async delete(course: any, i: number) {
    this.alertService.presentToast('Course removed from cart', 'dark')
    this.courses.splice(i,1);
    this.courseList.map((cr: any) => {
      if (cr.id === course.id) {
        cr.isAddedToFavorite = false;
        cr.isAddedToCart = false;
      }
    })
    this.providerService.setCourses(this.courseList);
    this.updatePrice()
  }

  async checkout() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Order placed successfully',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.clearCart();
          }
        },
      ],
    });

    await alert.present();
  }

  clearCart() {
    this.courses.map((ele: any) => {
      this.courseList.map((cr: any) => {
        if (ele.id === cr.id) {
          cr.isAddedToFavorite = false;
          cr.isAddedToCart = false;
          cr.hasBeenBrought = true;
        }
      })
    })
    this.providerService.setCourses(this.courseList);
    this.courses = []
    this.price = 0;
    this.discountedPrice = 0;
  }
}
