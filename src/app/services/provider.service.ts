import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { courses } from '../data';

@Injectable({
  providedIn: 'root'
})


export class ProviderService {


  private courseList: any = []
  constructor(private storage: Storage) {
    storage.create();
  }


  public getCourses(): Promise<any> {
    if (this.courseList.length > 0) {
      return Promise.resolve(this.courseList);
    }
    else {
      return this.storage.get('courses').then((res) => {
        if (res) {
          this.courseList = res;
        } else {
          this.courseList = courses;
          this.setCourses(courses);
        }
        return this.courseList;
      });
    }
  }

  public getDataFromStorage(): Promise<any>{
    return this.storage.get('courses').then((res) => {
      return res;
    });
  }


  public setCourses(coursesArray: any): void {
    this.courseList = coursesArray;
    this.storage.set("courses", this.courseList);
  }
}
