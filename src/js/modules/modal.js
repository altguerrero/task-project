import {createCustomElement} from "./ayudas";

// Crear e imprimir modal
export const modal = content => {
  const modalContentEl = createCustomElement('div', {
      id: "modal-content",
      class: "modal-content"
    }, [content]),
    modalEl = createCustomElement('div', {
      id: "modal-container",
      class: "modal-container"
    }, [modalContentEl]);

  // Imprimir modal
  document.body.appendChild(modalEl);

  // Remover modal
  const removeModal = () => document.body.removeChild(modalEl);

  // cerrar modal con click
  modalEl.addEventListener('click', e => {
    if (e.target === modalEl) removeModal();
  });

  // cerrar modal con escape
  const offCloseModalEsc = () => removeEventListener('keyup', closeModalEsc);
  const closeModalEsc = e => {
    if (e.key === "Escape") {
      removeModal();
      offCloseModalEsc();
    }
  };
  addEventListener('keyup', closeModalEsc);
};
