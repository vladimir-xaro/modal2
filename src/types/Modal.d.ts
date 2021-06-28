import CSSClassAnimations from "@xaro/css-class-animations";
import EventEmitter from "@xaro/event-emitter";
import Helper from "./Helper";
import { MutationType } from "./types";

export default class Modal {
  static instances:  Modal[];
  static queue:      Modal[];
  static isFirst:    boolean;

  static showById(id: string): void;
  static addsEscListener(): void;

  emitter:      EventEmitter;
  config:       ModalCfg;
  helper:       Helper;
  animContent?: CSSClassAnimations;

  constructor(config: ModalCtorCfg);

  changeState(hide: boolean, config?: ModalChangeCfg): void;
  hide(config?: ModalHideCfg): void;
  show(config?: ModalShowCfg): void;
  toggle(): void;
}

export type EventCbType = (modal: Modal) => void | ((modal: Modal) => void)[];

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
    init?:        EventCbType;
    beforeHide?:  EventCbType;
    afterHide?:   EventCbType;
    beforeShow?:  EventCbType;
    afterShow?:   EventCbType;
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

interface ModalChangeCfgBase {}

export interface ModalShowCfg extends ModalChangeCfgBase {}

export interface ModalHideCfg extends ModalChangeCfgBase {
  focusBluredEl?: boolean;
}

export interface ModalChangeCfg extends ModalShowCfg, ModalHideCfg {}