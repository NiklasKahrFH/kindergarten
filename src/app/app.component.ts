import { Component, OnInit } from '@angular/core';
import { StoreService } from './shared/store.service';
import { BackendService } from './shared/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kindergardenApp';
  isShown: boolean = true;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.getKindergardens();

    // function sum(a: number, b: number) {
    //   return a + b;
    // }
    // var result = sum(1, 2); // result = 3
    // console.log(result);

    // var result = 0;

    // setTimeout(function () {
    //   result = sum(1, 2);
    // }, 2000);

    // console.log(result);
    setTimeout(() => {
      this.isShown = false;
    }, 1400);

    }    
  
    public checkSpinner() {
      if (!this.isShown) {
        this.isShown = true;
      }
      this.ngOnInit();
    }
}
