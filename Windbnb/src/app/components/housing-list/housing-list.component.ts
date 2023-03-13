import { Component, Input, OnInit } from '@angular/core';
import { Housing } from 'src/app/class/housing';

@Component({
  selector: 'app-housing-list',
  templateUrl: './housing-list.component.html',
  styleUrls: ['./housing-list.component.css']
})

export class HousingListComponent implements OnInit {

  @Input() arrayHousing: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
