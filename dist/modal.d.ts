import CSSClassAnimations from "@xaro/css-class-animations";
import EventEmitter from "@xaro/event-emitter";

declare global {
  interface HTMLElement {
    __modalIsInit?: boolean;
  }
}

export type MutationType = 'animation' | 'transition';

export default class Modal {
  static instances: Modal[];
  static queue:     Modal[];
  static isFirst:   boolean;

  static showById(id: string): void;
  static addsEscListener(): void;

  config: ModalCfg;

  constructor(config: ModalCtorCfg);

  changeState(hide: boolean): void;
  hide();
  show();
  toggle();
}

export interface ModalCtorCfg {
  el:             HTMLElement;
  id?:            string;
  showOnInit?:    boolean;
  mutation?:      MutationType | false;
  attrClose?:     boolean;
  wrapperClick?:  boolean;
  allowEsc?:      boolean;
  classes?:       any;
  attrs?:         any;
  on?: {
    init?:        any;
    beforeHide?:  any;
    afterHide?:   any;
    beforeShow?:  any;
    afterShow?:   any;
  }
}

export interface ModalCfg {
  el:             HTMLElement;
  wrapper:        HTMLElement;
  content:        HTMLElement;
  id?:            string;
  isVisible:      boolean;
  pending:        boolean;
  mutation:       MutationType | false;
  attrClose:      boolean;
  wrapperClick:   boolean;
  allowEsc:       boolean;
  classes:        any;
  attrs:          any;
}