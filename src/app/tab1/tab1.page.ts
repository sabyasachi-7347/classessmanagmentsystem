import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { book, people, calendar } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon
  ],
  standalone: true
})
export class Tab1Page {
  items = [
    {
      title: 'Class Management',
      description: 'Manage your classes efficiently',
      icon: 'book'
    },
    {
      title: 'Student Records',
      description: 'View and update student information',
      icon: 'people'
    },
    {
      title: 'Schedule',
      description: 'Manage class schedules and timings',
      icon: 'calendar'
    }
  ];

  constructor() {
    addIcons({ book, people, calendar });
  }
}
