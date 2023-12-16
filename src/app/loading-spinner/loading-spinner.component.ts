import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  isShown: boolean = true;

  ngOnInit() {
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
