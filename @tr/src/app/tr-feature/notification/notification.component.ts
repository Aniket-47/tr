import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  date: any;


  constructor() { }

  ngOnInit(): void {
    this.date = new Date()
  }

  notifications_data = [
    {
      icon: 'icon-mc mc-person',
      title : 'Twitter Notifications'
    },
    {
      icon: 'icon-mc mc-person',
      title : 'Roy tagged you'
    }
  ]

}
