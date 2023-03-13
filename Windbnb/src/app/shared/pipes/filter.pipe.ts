import { Pipe, PipeTransform } from '@angular/core';
import { HousingServiceService } from '../service/housing-service.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(public housingService: HousingServiceService) {
  }

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const results = [];
    for (const entity of value) {
      if (((entity.city.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().indexOf(arg.location.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase()) > -1) || (entity.state.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().indexOf(arg.location.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase()) > -1)) && (arg.guests <= entity.maxGuests)) {
        results.push(entity);
      };
    };
    setTimeout(()=>{
    this.housingService.reloadCount(results.length);
    },0)
    return results;
  }

}
