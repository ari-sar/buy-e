import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-header',
  templateUrl: './my-header.component.html',
  styleUrls: ['./my-header.component.scss'],
})
export class MyHeaderComponent implements OnInit {
  isMobile = false;
  public appPages = [
    { title: 'Courses', url: '/screens', icon: 'home-outline' },
    { title: 'My Wish List', url: '/screens/wishlist', icon: 'heart-outline' },
    { title: 'Cart Details', url: '/screens/cart', icon: 'cart-outline' },
    { title: 'My Profile Page', url: '/screens/profile', icon: 'person-outline' },
  ];
  constructor(private platform: Platform, private router: Router) {
    if (this.platform.width() < 500) {
      this.isMobile = true;
    }
  }


  ngOnInit() { }

  goTo(url: string) {
    // console.log(url);
    this.router.navigateByUrl(url);
  }
}
