import { Component, OnInit } from '@angular/core';

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
      icon: 'icon-mc mc-person',
      title: 'Message Notifications',
      subtitle: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
    },
    {
      icon: 'icon-mc mc-person',
      title: 'Message Notifications',
      subtitle: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
    },
    {
      icon: 'icon-mc mc-person',
      title: 'Message Notifications',
      subtitle: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
    }
  ]

}
