export type MutationType = 'animation' | 'transition';

export interface ModalCtor {
  instances:  Modal[];
  queue:      Modal[];
  isFirst:    boolean;

  showById(id: string): void;
  addsEscListener(): void;
  new(config: ModalCtorCfg);
}

export class Modal {
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