import "./scss/index.dev.scss";

import Modal from "./Modal";
import _ from "@xaro/micro-dom";

const modal = new Modal({
  el: _<HTMLElement>('.modal-1')[0],
  // showOnInit: true,
  mutation: 'transition',
  // on: {
  //   init() {
  //     console.log('init');
  //   },
  //   beforeShow(modal: I_Modal, mutation: MutationType | false) {
  //     console.log('beforeShow', modal, mutation);
  //   },
  //   afterShow(modal: I_Modal, mutation: MutationType | false) {
  //     console.log('afterShow', modal, mutation);
  //   },
  //   beforeHide(modal: I_Modal, mutation: MutationType | false) {
  //     console.log('beforeHide', modal, mutation);
  //   },
  //   afterHide(modal: I_Modal, mutation: MutationType | false) {
  //     console.log('afterHide', modal, mutation);
  //   }
  // }
});

const modalDuplicate = new Modal({
  el: _<HTMLElement>('.modal-1')[0],
})

const modal2 = new Modal({
  el: _<HTMLElement>('.modal-2')[0],
  mutation: 'transition',
});
const modal3 = new Modal({
  el: _<HTMLElement>('.modal-3')[0],
  mutation: 'transition',
});
const modal4 = new Modal({
  el: _<HTMLElement>('.modal-4')[0],
  mutation: 'transition',
});
const modal5 = new Modal({
  el: _<HTMLElement>('.modal-5')[0],
  mutation: 'transition',
});

(window as any).modal = modal;

_('.btn-modal-open').addEventListener('click', () => {
  modal.show();
});
_('.btn-modal-close').addEventListener('click', () => {
  modal.hide();
});
_('.btn-modal-toggle').addEventListener('click', () => {
  modal.toggle();
});

_('.btn-modal-2-open').addEventListener('click', () => {
  modal2.show();
});

for (const btn of _<HTMLButtonElement>('.btn-modal-show')) {
  const id = btn.getAttribute('data-modal-id');
  btn.addEventListener('click', () => Modal.showById(id));
}