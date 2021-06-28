import CSSClassAnimations from "@xaro/css-class-animations";

import EventEmitter from "@xaro/event-emitter";

import deepmerge, { isObject } from "@xaro/deepmerge";

import { nextTick } from "@xaro/micro-dom";

const animate = (animInst, from, active, to, afterEnd) => {
    animInst.els.addClass(from), nextTick([ () => animInst.els.addClass(active), 10 ], [ () => animInst.els.removeClass(from), 10 ], [ () => {
        animInst.emitter.once("end", (() => {
            animInst.els.removeClass(to, active), afterEnd && afterEnd();
        })), animInst.els.addClass(to);
    }, 10 ]);
}, undefinedBool = (val, def) => void 0 === val ? def : val, defaultClasses = {
    show: "modal--show",
    wrapper: "modal__wrapper",
    content: "modal__content",
    transition: {
        hide: {
            from: "modal-t-hide-from",
            active: "modal-t-hide-active",
            to: "modal-t-hide-to"
        },
        show: {
            from: "modal-t-show-from",
            active: "modal-t-show-active",
            to: "modal-t-show-to"
        }
    }
}, defaultAttrs = {
    modalId: "data-modal-id",
    close: "data-modal-close"
};

class Modal {
    static instances=[];
    static queue=[];
    static isFirst=!0;
    static addsEscListener() {
        document.addEventListener("keyup", (event => {
            let length;
            "Escape" === event.code && (length = Modal.queue.length) && Modal.queue[length - 1].hide();
        }));
    }
    static showById(id) {
        if (void 0 !== id) for (const modal of Modal.instances) if (id === modal.config.id) return void modal.show();
    }
    emitter;
    config;
    helper;
    animContent;
    bluredEl;
    constructor(config) {
        // First init
        Modal.isFirst && (Modal.addsEscListener(), Modal.isFirst = !1);
        const el = config.el;
        // Checks if an instance with this element exists
                if (el.__modalIsInit) {
            for (const modal of Modal.instances) if (el === modal.config.el) return modal;
        } else el.__modalIsInit = !0;
        this.emitter = new EventEmitter(config.on);
        const _classes = isObject(config.classes) ? deepmerge(defaultAttrs, config.classes) : defaultClasses, _attrs = isObject(config.attrs) ? deepmerge(defaultAttrs, config.attrs) : defaultAttrs;
        let _id;
        this.config = {
            el: el,
            wrapper: el.querySelector(`.${_classes.wrapper}`),
            content: el.querySelector(`.${_classes.content}`),
            isVisible: !1,
            pending: !1,
            mutation: config.mutation || !1,
            attrClose: undefinedBool(config.attrClose, !0),
            wrapperClick: undefinedBool(config.wrapperClick, !0),
            allowEsc: undefinedBool(config.allowEsc, !0),
            classes: _classes,
            attrs: _attrs
        }, this.config.id = (_id = el.getAttribute(_attrs.modalId)) ? _id : void 0, Modal.instances.push(this), 
        this.helper = new class {
            cb;
        }, this.config.mutation && (this.animContent = new CSSClassAnimations({
            el: this.config.content,
            allow: this.config.mutation + "end"
        })), this.config.attrClose && this.config.el.querySelectorAll(`[${this.config.attrs.close}]`).forEach((el => {
            el.addEventListener("click", (() => this.hide()));
        })), this.config.wrapperClick && this.config.wrapper.addEventListener("click", (event => {
            event.target === this.config.wrapper && this.hide();
        })), this.emitter.emit("init", this, this.config.isVisible), config.showOnInit && this.show();
    }
    changeState(hide, config) {
        if (this.config.pending) this.helper.cb = () => this.changeState(hide); else {
            if (this.config.isVisible = !hide, this.config.mutation) if (this.config.pending = !0, 
            hide) {
                this.emitter.emit("beforeHide", this, this.config.mutation);
                let qI = Modal.queue.indexOf(this);
                Modal.queue.splice(qI, 1), animate(this.animContent, this.config.classes.transition.hide.from, this.config.classes.transition.hide.active, this.config.classes.transition.hide.to, (() => {
                    this.config.el.classList.remove(this.config.classes.show), this.config.pending = !1;
                    const cb = this.helper.cb;
                    delete this.helper.cb, this.emitter.emit("afterHide", this, this.config.mutation), 
                    cb && cb(this);
                }));
            } else this.emitter.emit("beforeShow", this, this.config.mutation), Modal.queue.push(this), 
            this.config.el.classList.add(this.config.classes.show), animate(this.animContent, this.config.classes.transition.show.from, this.config.classes.transition.show.active, this.config.classes.transition.show.to, (() => {
                this.config.pending = !1;
                const cb = this.helper.cb;
                delete this.helper.cb, this.emitter.emit("afterShow", this, this.config.mutation), 
                cb && cb(this);
            })); else if (hide) {
                this.emitter.emit("beforeHide", this, this.config.mutation);
                let qI = Modal.queue.indexOf(this);
                Modal.queue.splice(qI, 1), this.config.el.classList.remove(this.config.classes.show), 
                this.emitter.emit("afterHide", this, this.config.mutation);
            } else this.emitter.emit("beforeShow", this, this.config.mutation), Modal.queue.push(this), 
            this.config.el.classList.add(this.config.classes.show), this.emitter.emit("afterShow", this, this.config.mutation);
            hide ? Modal.queue.length || document.body.classList.remove("modal-shown") : document.body.classList.add("modal-shown");
        }
    }
    show(config) {
        this.config.isVisible || (this.bluredEl = document.activeElement, this.changeState(!1, config));
    }
    hide(config) {
        this.config.isVisible && (this.changeState(!0, config), config && config.focusBluredEl && (this.bluredEl.focus(), 
        this.bluredEl = void 0));
    }
    toggle() {
        this.config.isVisible ? this.hide() : this.show();
    }
}

export default Modal;
//# sourceMappingURL=modal.es.js.map
