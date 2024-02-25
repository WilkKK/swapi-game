import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { PersonModel } from '../../models/person.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.scss'
})
export class PersonCardComponent {

  @Input({ required: true })person!: PersonModel;
  @Input({ required: true })id!: string;

}

