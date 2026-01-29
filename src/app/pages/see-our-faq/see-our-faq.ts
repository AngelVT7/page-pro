import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FAQS_DATA } from '../../core/data/faqs.data';
import { FaqItem } from '../../core/models/faqs.model';

@Component({
  standalone: true,
  selector: 'app-see-our-faq',
  imports: [CommonModule],
  templateUrl: './see-our-faq.html',
  styleUrl: './see-our-faq.scss',
})
export class SeeOurFAQ {
  // Definimos el signal con los items de FAQS_DATA, agregando 'isOpen' a cada uno
  // Asumimos que FaqItem tiene al menos { question: string; answer: string }
  // Extendemos el tipo para incluir isOpen
  faqItems = signal<(FaqItem & { isOpen: boolean })[]>(
    FAQS_DATA.map(item => ({ ...item, isOpen: false }))
  );

  toggleItem(index: number) {
    // Obtenemos el estado actual (inmutable gracias a signals)
    const items = this.faqItems();

    // Creamos una copia actualizada
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        // Toggle solo el item seleccionado
        return { ...item, isOpen: !item.isOpen };
      } else {
        // Cerramos los demás para comportamiento de accordion (solo uno abierto)
        return { ...item, isOpen: false };
      }
    });

    // Actualizamos el signal con la nueva array
    this.faqItems.set(updatedItems);
  }
}