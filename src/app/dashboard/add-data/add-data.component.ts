import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    public storeService: StoreService,
    public backendService: BackendService,
  ) {}
  
  public addChildForm: any;
  @Input() currentPage!: number;
  showSuccessAlert = false;
  
  ngOnInit(): void {
    this.clearForm();
  }

  onSubmit() {
    //console.log(this.addChildForm.value);
    if (this.addChildForm.valid) {
      //console.log(this.currentPage);
      this.showSuccessAlert = true;
      setTimeout(() => this.showSuccessAlert = false, 3000);
      this.backendService.addChildData(this.addChildForm.value, this.currentPage);
      this.clearForm();
    }
  }

  clearForm() {
    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      kindergardenId: ['', Validators.required],
      birthDate: [null, [Validators.required, this.pastDateValidator()]],
    })
  }

  pastDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value) {
        const birthDate = new Date(value);
        const today = new Date();
        // strip the time part
        today.setHours(0, 0, 0, 0);
        return birthDate > today ? { 'futureDate': true } : null;
      }
      return null; // in case one does not want to enforce this field as required
    };
  }

}
