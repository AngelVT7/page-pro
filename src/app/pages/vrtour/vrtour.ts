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
  accepted = false;
  scenes = [
    { id: 'lobby', name: 'Lobby' },
    { id: 'offices', name: 'Offices' },
    { id: 'Museum', name: 'Museum' },
    { id: 'auditorium', name: 'auditorium' },
    { id: 'gas station', name: 'gas station' },
    { id: 'agency', name: 'agency' },
    { id: 'bank', name: 'bank' },
    { id: 'Hotel', name: 'Hotel' },
  ];

  currentScene = 'lobby';

    acceptVr() {
    this.accepted = true;
  }

  goBack() {
    history.back(); // o router.navigate(['/'])
  }

  changeScene(sceneId: string) {
  if (sceneId === this.currentScene) return;

  const sky = document.querySelector('#sky') as any;
  if (!sky) return;

  // Fade out
    sky.setAttribute('animation__fadeout', {
      property: 'material.opacity',
      from: 1,
      to: 0,
      dur: 500,
      easing: 'easeInQuad'
    });

    setTimeout(() => {
      this.currentScene = sceneId;

      // Fade in
      sky.setAttribute('animation__fadein', {
        property: 'material.opacity',
        from: 0,
        to: 1,
        dur: 700,
        easing: 'easeOutQuad'
      });
    }, 500);
  }

showVideo = false;

openVideo() {
  this.showVideo = true;
}

closeVideo() {
  this.showVideo = false;
}
}
