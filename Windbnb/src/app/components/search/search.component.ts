import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { debounce, interval, Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/shared/service/spinner.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchLocation = new EventEmitter<any>();
  public formulario: FormGroup;
  public search: boolean = false;
  public location: boolean = true;
  public guests: boolean = false;
  public auxSuggest: boolean = false;
  public numberGuestsAdult: number = 0;
  public numberGuestsChilden: number = 0;
  public numberGuests: number = 0;
  public suggestedCities: string[] = ["Bariloche, Argentina", "Córdoba, Argentina", "Mendoza, Argentina", "Misiones, Argentina"]
  public listLocation: string[] = ["San Carlos de Bariloche, Río Negro, Argentina", "Mina Clavero, Córdoba, Argentina", "Mendoza, Mendoza, Argentina", "San Rafael, Mendoza, Argentina", "Villa General Belgrano, Córdoba, Argentina", "Puerto Iguazú, Misiones, Argentina"];
  public suggest: string[] = [];
  public busqueda: string = '';
  public obs: Subscription = new Subscription();

  constructor(public fb: FormBuilder, public serv: SpinnerService) {
    this.formulario = this.fb.group({
      'location': ['', [Validators.required, Validators.minLength(3)]],
      'guests': ['', [Validators.required, Validators.min(1), Validators.max(10)]],
    })

    this.obs = this.formulario.valueChanges
      .pipe(debounce(() => interval(200)))
      .subscribe(data => this.busqueda = data.location
      );
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    if ($event.target['scrollingElement'].scrollTop != 0) {
      this.viewSearch(false);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.obs.unsubscribe()
  }

  viewSuggest() {

    setTimeout(() => {
      console.log(this.busqueda.length)
      if(this.busqueda.length == 0){this.location = true , this.auxSuggest = false};
      if (this.busqueda.length > 2) {
        this.suggest = [];
        for (const entity of this.listLocation) {
          if ((entity.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().indexOf(this.busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase()) > -1)) {
            this.suggest.push(entity);
            this.auxSuggest = true;
            this.location = false;
          };
        };
      }
    }, 300)
  }

  viewSearch(value: boolean) {
    value == true ? this.search = true : this.search = false;
    this.guests = false;
    this.location = true;
    this.auxSuggest = false;
  }

  viewLocation(value: boolean) {
    if (value == true) {
      if (this.suggest.length > 0) {
        this.guests = false;
        this.location = false;
        this.auxSuggest = true;
      } else {
        this.guests = false;
        this.auxSuggest = false;
        this.location = true;
      }
    }
  }

  viewGuests(value: boolean) {
    if (value == true) {
      this.guests = true;
      this.location = false;
      this.auxSuggest = false;
    }
  }

  selectCity(value: string) {
    this.formulario.controls['location'].setValue(value);
  }

  countGuestsAdult(value: number) {

    if ((this.numberGuests > 0 && this.numberGuestsAdult != 0) || (this.numberGuestsAdult == 0 && value > 0)) {
      this.numberGuests = this.numberGuests + value;
      this.numberGuestsAdult = this.numberGuestsAdult + value;
      this.formulario.controls['guests'].setValue(this.numberGuests);
    }

  }

  countGuestsChildren(value: number) {

    if ((this.numberGuests > 0 && this.numberGuestsChilden != 0) || (this.numberGuestsChilden == 0 && value > 0)) {
      this.numberGuests = this.numberGuests + value;
      this.numberGuestsChilden = this.numberGuestsChilden + value;
      this.formulario.controls['guests'].setValue(this.numberGuests);
    }

  }

  searchCity() {
    const value = this.formulario.value.location.split(',', 3)
    let city, state, country;
    switch (value.length) {
      case 1:
        city = value[0];
        break;
      case 2:
        city = value[0];
        state = value[1]
        break;
      case 3:
        city = value[0];
        state = value[1]
        country = value[2]
        break;
    }
    let obj = {
      location: city,
      state: state,
      country: country,
      guests: this.formulario.value.guests
    }
    this.searchLocation.emit(obj);
    this.serv.show();
    setTimeout(() => {
      this.viewSearch(false);
      this.serv.hide();
    }, 1000)

  }

}
