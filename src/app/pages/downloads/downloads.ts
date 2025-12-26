import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DocumentItem {
  id: number;
  name: string;
  description: string;
  url: string;
  size?: string; 
}


@Component({
  selector: 'app-downloads',
  imports: [CommonModule],
  templateUrl: './downloads.html',
  styleUrl: './downloads.scss',
})
export class Downloads {


}
