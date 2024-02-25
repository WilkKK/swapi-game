import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { StarshipModel } from '../../models/starship.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-starship-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './starship-card.component.html',
  styleUrl: './starship-card.component.scss'
})
export class StarshipCardComponent {
  @Input({ required: true })starship!: StarshipModel;
  @Input({ required: true })id!: string;

}
