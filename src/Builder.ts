import _ from "@xaro/micro-dom";

import Modal from "./Modal";

const createEl = (cfg) => {
  const el = document.createElement(cfg.tag || 'div');
  el.classList.add(cfg.classes);
  if (cfg.append) {
    el.append(cfg.append);
  }
  if (cfg.content){
    el.textContent = cfg.content;
  }

  return el;
}

export default class Builder {
  constructor(cfg) {
    for (let i = 0; i < cfg.amount; i++) {
      const btn = createEl({
        tag: 'button',
        content: 'Open modal #' + (Modal.instances.length + 1)
      });
      const content = createEl({
        classes: `modal__wrapper`,
        append: btn
      });
      const wrapper = createEl({
        classes: `modal__wrapper`,
        append: content
      });
      const el = createEl({
        classes: `modal-0${i}`,
        append: wrapper,
      });
      document.body.append(el)

      new Modal({
        el,
      })
    }
  }
}