import t from "@xaro/css-class-animations";

import i from "@xaro/event-emitter";

import s, { isObject as e } from "@xaro/deepmerge";

import { nextTick as o } from "@xaro/micro-dom";

const n = (t, i, s, e, n) => {
    t.els.addClass(i), o([ () => t.els.addClass(s), 10 ], [ () => t.els.removeClass(i), 10 ], [ () => {
        t.emitter.once("end", (() => {
            t.els.removeClass(e, s), n && n();
        })), t.els.addClass(e);
    }, 10 ]);
}, h = (t, i) => void 0 === t ? i : t, a = {
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
}, c = {
    modalId: "data-modal-id",
    close: "data-modal-close"
}, r = class {
    static instances=[];
    static queue=[];
    static isFirst=!0;
    emitter;
    config;
    helper;
    animContent;
    static addsEscListener() {
        document.addEventListener("keyup", (t => {
            let i;
            "Escape" === t.code && (i = r.queue.length) && r.queue[i - 1].hide();
        }));
    }
    static showById(t) {
        if (void 0 !== t) for (const i of r.instances) if (t === i.config.id) return void i.show();
    }
    constructor(o) {
        r.isFirst && (r.addsEscListener(), r.isFirst = !1), this.emitter = new i(o.on);
        const n = e(o.classes) ? s(c, o.classes) : a, l = e(o.attrs) ? s(c, o.attrs) : c;
        let d;
        this.config = {
            el: o.el,
            wrapper: o.el.querySelector(`.${n.wrapper}`),
            content: o.el.querySelector(`.${n.content}`),
            isVisible: !1,
            pending: !1,
            mutation: o.mutation || !1,
            attrClose: h(o.attrClose, !0),
            wrapperClick: h(o.wrapperClick, !0),
            allowEsc: h(o.allowEsc, !0),
            classes: n,
            attrs: l
        }, this.config.id = (d = o.el.getAttribute(l.modalId)) ? d : void 0, r.instances.push(this), 
        this.helper = new class {
            cb;
        }, this.config.mutation && (this.animContent = new t({
            el: this.config.content,
            allow: this.config.mutation + "end"
        })), this.config.attrClose && this.config.el.querySelectorAll(`[${this.config.attrs.close}]`).forEach((t => {
            t.addEventListener("click", (() => this.hide()));
        })), this.config.wrapperClick && this.config.wrapper.addEventListener("click", (t => {
            t.target === this.config.wrapper && this.hide();
        })), this.emitter.emit("init", this, this.config.isVisible), o.showOnInit && this.show();
    }
    changeState(t) {
        if (this.config.pending) this.helper.cb = () => this.changeState(t); else if (this.config.isVisible = !t, 
        this.config.mutation) if (this.config.pending = !0, t) {
            this.emitter.emit("beforeHide", this, this.config.mutation);
            let t = r.queue.indexOf(this);
            r.queue.splice(t, 1), n(this.animContent, this.config.classes.transition.hide.from, this.config.classes.transition.hide.active, this.config.classes.transition.hide.to, (() => {
                this.config.el.classList.remove(this.config.classes.show), this.config.pending = !1;
                const t = this.helper.cb;
                delete this.helper.cb, this.emitter.emit("afterHide", this, this.config.mutation), 
                t && t(this);
            }));
        } else this.emitter.emit("beforeShow", this, this.config.mutation), r.queue.push(this), 
        this.config.el.classList.add(this.config.classes.show), n(this.animContent, this.config.classes.transition.show.from, this.config.classes.transition.show.active, this.config.classes.transition.show.to, (() => {
            this.config.pending = !1;
            const t = this.helper.cb;
            delete this.helper.cb, this.emitter.emit("afterShow", this, this.config.mutation), 
            t && t(this);
        })); else if (t) {
            this.emitter.emit("beforeHide", this, this.config.mutation);
            let t = r.queue.indexOf(this);
            r.queue.splice(t, 1), this.config.el.classList.remove(this.config.classes.show), 
            this.emitter.emit("afterHide", this, this.config.mutation);
        } else this.emitter.emit("beforeShow", this, this.config.mutation), r.queue.push(this), 
        this.config.el.classList.add(this.config.classes.show), this.emitter.emit("afterShow", this, this.config.mutation);
    }
    show() {
        this.config.isVisible || this.changeState(!1);
    }
    hide() {
        this.config.isVisible && this.changeState(!0);
    }
    toggle() {
        this.config.isVisible ? this.hide() : this.show();
    }
};

// export {
//   Modal,
//   ModalCfg,
//   ModalCtor,
//   ModalCtorCfg
// } from "./types/Modal";
// export {
//   MutationType
// } from "./types/types";
export default r;
//# sourceMappingURL=modal.es.js.map
