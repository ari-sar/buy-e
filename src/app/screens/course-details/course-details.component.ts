import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  course: any;
  isVideoPlaying = false;

  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.course = JSON.parse(localStorage.getItem('selectedCourse')!)
  }

  ngOnInit() { }

  calculatePrice(actualPrice: string, discountPercentage: string) {
    const formattedPrice = actualPrice.split('₹');
    const price = parseInt(formattedPrice[1]);
    const percentage = parseInt(discountPercentage);
    const discount = (price * percentage) / 100;
    const discountedPrice = price - discount
    return discountedPrice.toFixed(2)
  }

  toggleVideoPlayer() {
    this.isVideoPlaying = !this.isVideoPlaying;
  }

  byPassUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/Ata9cSC2WpM?autoplay=1&mute=1');
  }

  timeLeftUntilMidnight(): string {
    const now: Date = new Date();
    const midnight: Date = new Date();
    midnight.setHours(24, 0, 0, 0); // Set to midnight of the next day

    const timeLeftMilliseconds: number = midnight.getTime() - now.getTime();
    const timeLeftSeconds: number = Math.floor(timeLeftMilliseconds / 1000);
    const hours: number = Math.floor(timeLeftSeconds / 3600);
    const minutes: number = Math.floor((timeLeftSeconds % 3600) / 60);
    const seconds: number = timeLeftSeconds % 60;

    return `${hours} hr`;
}
}
