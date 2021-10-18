import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permission-accordion',
  templateUrl: './permission-accordion.component.html',
  styleUrls: ['./permission-accordion.component.scss']
})
export class PermissionAccordionComponent implements OnInit {
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  onEvent(event: any) {
    event.stopPropagation();
 }

}
