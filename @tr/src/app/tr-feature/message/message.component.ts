import { Component, OnInit } from '@angular/core';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'tr-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  date: any;

  constructor() { }

  ngOnInit(): void {

    this.date = new Date()
  }

  messages = [
    {
      icon: 'icon-mcf mcf-add_task',
      title: 'Message Notifications',
      subtitle: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
    },
    {
      icon: 'icon-mcf mcf-settings ',
      title: 'Message Notifications',
      subtitle: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
    },
    {
      icon: 'icon-mc mc-monetization_on',
      title: 'Message Notifications',
      subtitle: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
    }
  ]

}
