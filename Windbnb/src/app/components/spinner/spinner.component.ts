import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/shared/service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  public isLoading = this.service.isLoading;

  constructor(private readonly service : SpinnerService) {
    this.isLoading = this.service.isLoading;
   }

  ngOnInit(): void {
  }

}
