import CSSClassAnimations, { DOMEventsKeys as CSSAnimationsEventsKey } from "@xaro/css-class-animations";
import EventEmitter from "@xaro/event-emitter";
import deepmerge, { isObject } from "@xaro/deepmerge";
import Helper from "./Helper";
import { animate, undefinedBool } from "./helpers";
import I_Helper from "./types/Helper";
import {
  Modal         as I_Modal,
  ModalCfg      as I_ModalCfg,
  ModalCtor     as I_ModalCtor,
  ModalCtorCfg  as I_ModalCtorCfg
} from "./types/Modal";

const defaultClasses = {
  show:     'modal--show',
  wrapper:  'modal__wrapper',
  content:  'modal__content',
  transition: {
    hide: {
      from:   'modal-t-hide-from',
      active: 'modal-t-hide-active',
      to:     'modal-t-hide-to',
    },
    show: {
      from:   'modal-t-show-from',
      active: 'modal-t-show-active',
      to:     'modal-t-show-to',
    },
  }
};
const defaultAttrs = {
  modalId:  'data-modal-id',
  close:    'data-modal-close',

};

const Modal: I_ModalCtor = class implements I_Modal {
  static instances: I_Modal[] = [];
  static queue:     I_Modal[] = [];
  static isFirst:   boolean = true;

  emitter:      EventEmitter;
  config:       I_ModalCfg;
  helper:       I_Helper;
  animContent?: CSSClassAnimations;

  static addsEscListener() {
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      let length;
      if (event.code === 'Escape' && (length = Modal.queue.length)) {
        Modal.queue[length - 1].hide()
      }
    });
  }

  static showById(id: string) {
    if (id === undefined) {
      return;
    }
    for (const modal of Modal.instances) {
      if (id === modal.config.id) {
        modal.show();
        return;
      }
    }
  }

  constructor(config: I_ModalCtorCfg) {
    if (Modal.isFirst) {
      Modal.addsEscListener();

      Modal.isFirst = false;
    }

    this.emitter = new EventEmitter(config.on);
    
    const _classes = isObject(config.classes) ?
      deepmerge(defaultAttrs, config.classes) :
      defaultClasses;
    const _attrs = isObject(config.attrs) ?
      deepmerge(defaultAttrs, config.attrs) :
      defaultAttrs;
    
      this.config = {
      el:             config.el,
      wrapper:        config.el.querySelector(`.${_classes.wrapper}`),
      content:        config.el.querySelector(`.${_classes.content}`),
      isVisible:      false,
      pending:        false,
      mutation:       config.mutation || false,
      attrClose:      undefinedBool(config.attrClose, true),
      wrapperClick:   undefinedBool(config.wrapperClick, true),
      allowEsc:       undefinedBool(config.allowEsc, true),
      classes:        _classes,
      attrs:          _attrs
    };
    let _id;
    this.config.id = (_id = config.el.getAttribute(_attrs.modalId)) ? _id : undefined;

    Modal.instances.push(this);

    this.helper = new Helper;
    if (this.config.mutation) {
      this.animContent = new CSSClassAnimations({
        el:     this.config.content,
        allow:  this.config.mutation + 'end' as CSSAnimationsEventsKey,
      })
    }

    if (this.config.attrClose) {
      this.config.el.querySelectorAll(`[${this.config.attrs.close}]`).forEach(el => {
        el.addEventListener('click', () => this.hide());
      });
    }

    if (this.config.wrapperClick) {
      this.config.wrapper.addEventListener('click', (event: Event) => {
        if (event.target === this.config.wrapper) {
          this.hide();
        }
      });
    }

    this.emitter.emit('init', this, this.config.isVisible);

    if (config.showOnInit) {
      this.show();
    }
  }

  changeState(hide: boolean) {
    if (this.config.pending) {
      this.helper.cb = () => this.changeState(hide);
      return;
    }

    this.config.isVisible = !hide;

    if (this.config.mutation) {
      this.config.pending = true;

      if (hide) {
        this.emitter.emit('beforeHide', this, this.config.mutation);

        let qI = Modal.queue.indexOf(this);
        Modal.queue.splice(qI, 1);

        animate(
          this.animContent,
          this.config.classes.transition.hide.from,
          this.config.classes.transition.hide.active,
          this.config.classes.transition.hide.to,
          () => {
            this.config.el.classList.remove(this.config.classes.show);
            this.config.pending = false;
            const cb = this.helper.cb;
            delete this.helper.cb;
            this.emitter.emit('afterHide', this, this.config.mutation);
            cb && cb(this);
          }
        );
      } else {
        this.emitter.emit('beforeShow', this, this.config.mutation);

        Modal.queue.push(this);

        this.config.el.classList.add(this.config.classes.show);
        animate(
          this.animContent,
          this.config.classes.transition.show.from,
          this.config.classes.transition.show.active,
          this.config.classes.transition.show.to,
          () => {
            this.config.pending = false;
            const cb = this.helper.cb;
            delete this.helper.cb;
            this.emitter.emit('afterShow', this, this.config.mutation);
            cb && cb(this);
          }
        );
      }
    } else {
      if (hide) {
        this.emitter.emit('beforeHide', this, this.config.mutation);

        let qI = Modal.queue.indexOf(this);
        Modal.queue.splice(qI, 1);

        this.config.el.classList.remove(this.config.classes.show);
        this.emitter.emit('afterHide', this, this.config.mutation);
      } else {
        this.emitter.emit('beforeShow', this, this.config.mutation);

        Modal.queue.push(this);

        this.config.el.classList.add(this.config.classes.show);
        this.emitter.emit('afterShow', this, this.config.mutation);
      }
    }
  }

  show(): void {
    if (this.config.isVisible) {
      return;
    }

    this.changeState(false);
  }
  hide() {
    if (! this.config.isVisible) {
      return;
    }

    this.changeState(true);
  }

  toggle() {
    if (this.config.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }
}

export default Modal;