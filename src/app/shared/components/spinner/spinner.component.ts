import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from '@swapi/core/services';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) {}
}
