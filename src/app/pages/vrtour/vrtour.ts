import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-vrtour',
  imports: [CommonModule, RouterModule],
  templateUrl: './vrtour.html',
  styleUrl: './vrtour.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Vrtour {

  scenes = [
    { id: 'lobby', name: 'Lobby', img: 'vr/allphoto-bangkok-GfXqtWmiuDI-unsplash.jpg' },
    { id: 'office', name: 'Office', img: 'vr/jeanne-rose-gomez-Mi2r_KjkW8o-unsplash.jpg' },
    //{ id: 'meeting', name: 'Meeting Room', img: 'vr/meeting.jpg' },
  ];

  currentScene = 'lobby';
  activeImage = this.scenes[0].img;

  goTo(id: string) {
    const target = this.scenes.find(s => s.id === id);
    if (!target) return;

    this.currentScene = id;
    this.activeImage = target.img;
  }

}
