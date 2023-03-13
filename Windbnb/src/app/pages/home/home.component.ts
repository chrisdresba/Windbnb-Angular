import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Housing } from 'src/app/class/housing';
import { HousingServiceService } from 'src/app/shared/service/housing-service.service';
import { SpinnerService } from 'src/app/shared/service/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public arrayHousing: Housing[] = [];
  public countHousing: any;
  public housingNotFound: boolean = true;
  public country: string = 'Argentina';
  public location: string = "";

  constructor(public housingService: HousingServiceService, public servSpinner: SpinnerService) {
  }

  async ngOnInit() {

    this.housingService.isCount.subscribe(value => {
      this.countHousing = value;
    });
    this.housingService.housingNotFound.subscribe(value => {
      this.housingNotFound = value;
    });
    this.loadList();
  }

  loadList() {
    try {
      this.servSpinner.show();
      this.housingService.getHousing().subscribe(item => {
        this.arrayHousing = item;
        this.housingService.reloadCount(this.arrayHousing.length);
      });
    } catch (error) {
      this.servSpinner.hide();
    } finally {
      setTimeout(()=>{
        this.servSpinner.hide();
      },2000)
    }
  }

  onSearch(value: string) {
    this.location = value;
  }

  refresh() {
    window.location.reload();
  }

}
