import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-distributors-sales-rep',
  imports: [CommonModule, FormsModule],
  templateUrl: './distributors-sales-rep.html',
  styleUrl: './distributors-sales-rep.scss',
})
export class DistributorsSalesRep implements AfterViewInit {
    map!: L.Map;
    markers: L.Marker[] = [];

  locations = [
    {
      name: 'Distributor Miami',
      address: '1170 NW 163rd, Miami, Florida',
      phone: '+1 (305) 549 0105',
      lat: 25.9227218669382,       
      lng: -80.21983461865803,
    },
    {
      name: 'Laredo Warehouse',
      address: '402 Enterprise Interamerica Industrial Park, TX',
      phone: '+1 (801) 831 2100',
      lat: 27.621893420794905, 
      lng: -99.53131713646715,
    },
    {
      name: 'Alutec Factory',
      address: 'Libramiento León-Querétaro k. 4.6 Las Malvas. Parque Industrial Apolo Irapuato, Guanajuato, México. 36547',
      phone: '+52 (800) 337 2635',
      lat: 20.694828627429935,              
      lng: -101.2994611036836,
    },
    {
      name: 'Distributor Puerto Rico',
      address: 'Urb. Industrial Minillas Calle D #320 Bayamón, Puerto Rico. 00959',
      phone: '1 (787) 758 56 00',
      lat: 18.490415884727067, 
      lng: -66.1346313503207,   
    },
    {
      name: 'UTAH',
      address: 'UTAH',
      phone: '801 831 2100',
      lat: 39.10740641044133, 
      lng: -111.67475910674831,   
    },
    {
      name: 'IDAHO',
      address: 'IDAHO',
      phone: '801 831 2100',
      lat: 43.601278979904855, 
      lng: -114.26680838934594,
    },
    {
      name: 'CALIFORNIA',
      address: 'CALIFORNIA',
      phone: '206 226 2311',
      lat: 36.518546653618664, 
      lng: -119.17187831792096,  
    },
    {
      name: 'NEVADA',
      address: 'NEVADA',
      phone: '206 226 2311',
      lat: 39.81500235484288,     
      lng: -116.97535377519155,  
    },
    {
      name: 'ARIZONA',
      address: 'ARIZONA',
      phone: '206 226 2311',
      lat: 34.30880942755507,    
      lng: -111.97368462853763,  
    },
    {
      name: 'WASHINGTON',
      address: 'WASHINGTON',
      phone: '206-669-4765',
      lat: 38.9107899179128,    
      lng: -76.98839878417374,  
    }
  ];

  ngAfterViewInit() {
    this.initMap();
    this.filteredLocations = [...this.locations];

  }

createCustomIcon() {
  return L.icon({
    iconUrl: 'assets/icon/ubication.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
}

initMap() {
  this.map = L.map('map', {
    zoomControl: false
  }).setView([39.5, -98.35], 4);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }
  ).addTo(this.map);

  this.markers = [];

  const customIcon = this.createCustomIcon(); // Crea el icono una vez

  this.locations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng], {
      icon: customIcon // <-- AQUÍ ESTÁ EL CAMBIO
    })
      .addTo(this.map)
      .bindPopup(this.popupTemplate(loc));

    // Guardamos referencia
    (marker as any).__data = loc;
    this.markers.push(marker);
  });

  setTimeout(() => this.map.invalidateSize(), 0);
}




searchTerm = '';
filteredLocations: any[] = [];

applySearch() {
  const term = this.searchTerm.toLowerCase().trim();

  this.filteredLocations = this.locations.filter(loc =>
    loc.name.toLowerCase().includes(term) ||
    loc.address.toLowerCase().includes(term) ||
    loc.phone.toLowerCase().includes(term)
  );

  // 🔥 Ocultar / mostrar markers
  this.markers.forEach(marker => {
    const loc = (marker as any).__data;
    if (this.filteredLocations.includes(loc)) {
      marker.addTo(this.map);
    } else {
      this.map.removeLayer(marker);
    }
  });
}

focusLocation(loc: any) {
  this.map.setView([loc.lat, loc.lng], 8);

  const marker = this.markers.find(
    m => (m as any).__data === loc
  );

  if (marker) {
    marker.openPopup();
  }
}


popupTemplate(loc: any) {
    const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(loc.address);
  return `
    <div class="custom-popup">

      <div class="popup-header">
        ${loc.name}
        <button class="close-btn"
          onclick="this.closest('.leaflet-popup')
          .querySelector('.leaflet-popup-close-button').click()">×</button>
      </div>

      <div class="popup-body">

        <div class="row">
          <span class="icon icon-location"></span>
          <span>${loc.address}</span>
        </div>

        <div class="row">
          <span class="icon icon-phone"></span>
          <a href="tel:${loc.phone}">${loc.phone}</a>
        </div>

        <div class="row">
          <span class="icon icon-maps"></span>
          <a href="${mapsUrl}" target="_blank" rel="noopener">
            Open in Google Maps
          </a>
        </div>

      </div>
    </div>
  `;
}





iconPinPng() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAD///////////////////////////////////////////////////////////////8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///9l0z7QAAAAHXRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobGx2y+G8AAABHSURBVBjTY2AgDGBgYGBkYGRgZGBkYGJiYmBgZGJiYmBgZGRkYGRgYmJiYGBgYGBgYmJiYGJgAAAwKAB6W+z8nAAAAAElFTkSuQmCC';
}




iconPhonePng() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAD///////////////////////////////////////////////////////////////8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///9l0z7QAAAAHXRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobGx2y+G8AAABHSURBVBjTY2AgDGBgYGBkYGRgZGBkYGJiYmBgZGJiYmBgZGRkYGRgYmJiYGBgYGBgYmJiYGJgAAAwKAB6W+z8nAAAAAElFTkSuQmCC';
}



}
