import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-housing-card',
  templateUrl: './housing-card.component.html',
  styleUrls: ['./housing-card.component.css']
})
export class HousingCardComponent implements OnInit {

  @Input() housing: any;
  public number : number = 0;
  public valMax : boolean = false;
  public animateImg:string = "";

  constructor() { }

  ngOnInit(): void {
  }

  next(){
    let max = this.housing.images.length - 1;
    this.animate();
    if(this.number < max){
      this.number = this.number + 1;
    }
    this.number == max ? this.valMax = true :this.valMax = false;
  }

  previous(){
    this.animate();
    this.number > 0 ?this.number = this.number - 1:this.number = 0;
    this.valMax = false;
  }

  animate(){
    this.animateImg = "animate-[pulse_1s_ease-in-out]";
    setTimeout(()=>{
      this.animateImg = "";
    },1000)
  }
}
