import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  courseList: any[] = []; // Ensure it's initialized properly

  constructor(private storage: Storage) {}

  async getCourses(): Promise<any[]> {
    const courses = await this.storage.get('courses');
    if (courses) {
      this.courseList = courses;
    } else {
      this.courseList = [{ id: 1, name: 'Default Course 1' }, { id: 2, name: 'Default Course 2' }];
      await this.storage.set('courses', this.courseList);
    }
    return this.courseList;
  }

  async getDataFromStorage(): Promise<any> {
    return await this.storage.get('data');
  }

  setCourses(courses: any[]): void {
    this.courseList = courses;
    this.storage.set('courses', courses);
  }
}
