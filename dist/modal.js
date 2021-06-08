var Modal = function() {
    "use strict";
    class t {
        /**
       * Event list
       */
        events={};
        /**
       * Create Emitter
       */
        constructor(t = {}) {
            for (let e in t) t[e] && this.subscribe(e, t[e]);
        }
        /**
       * Creates a key for the event and subscribes the passed callback to it.
       */        subscribe(t, e) {
            this.has(t) || (this.events[t] = []);
            let i = [];
            if (Array.isArray(e)) for (const s of e) i.push(...this.subscribe(t, s)); else this.events[t].push(e), 
            i.push((() => this.removeListener(t, e)));
            return i;
        }
        /**
       * Unsubscribes all callback functions from the event and removes the event
       * key.
       */        unsubscribe(...t) {
            for (const e of t) this.events[e] && delete this.events[e];
        }
        /**
       * Removes a specific event key callback function.
       */        removeListener(t, e) {
            // if (typeof this.events[key] === 'object') {
            if (Array.isArray(this.events[t])) {
                const i = this.events[t].indexOf(e);
                i > -1 && this.events[t].splice(i, 1);
            }
        }
        /**
       * Calls the callback function only once, and then removes it.
       */        once(t, e) {
            const i = this.subscribe(t, (() => {
                i[0](), Array.isArray(e) ? e.forEach((t => t())) : e();
            }));
        }
        /**
       * Checks for an event by key.
       * (Doesn't check for callback functions)
       */        has(t) {
            return !!this.events[t];
        }
        /**
       * Returns the number of callback functions for the event key or "false" if
       * there is no key
       */        listenerCount(t) {
            return !!this.events.hasOwnProperty(t) && this.events[t].length;
        }
        /**
       * Calls all callback functions on events using the event key.
       */        emit(t, ...e) {
            const i = this.events[t];
            if (i) for (let t of i) t(...e);
        }
        /**
       * Just like "emit" calls all callback functions. However, the callback must
       * return a boolean value, which determines whether or not the next callback
       * will execute.
       * As a result, it returns the result of the last executed callback function.
       */        validateEmit(t, ...e) {
            const i = this.events[t];
            if (!i) return !1;
            for (const t of i) if (!t(...e)) return !1;
            return !0;
        }
        /**
       * Just like "emit" calls all callbacks, but unlike "emit" it passes the
       * result of the previous callback to the next one as an argument.
       * As aresult, it will return the result of the last callback.
       */        seriesEmit(t, ...e) {
            const i = this.events[t];
            if (!i) return;
            let s;
            for (let t = 0; t < i.length; t++) s = 0 === t ? i[t](...e) : i[t](s);
            return s;
        }
    }
    function e(t, ...e) {
        const i = [];
        for (const s of e) if ("string" == typeof s) {
            const e = t.querySelectorAll(s);
            i.push(...e);
        } else s instanceof Element && i.push(s);
        return i;
    }
    function i(t, ...e) {
        for (const s of e) Array.isArray(s) ? i(t, ...s) : t.append(s);
    }
    function s(...t) {
        const e = t, i = t.shift();
        return i && setTimeout((() => {
            i(), e.length && s(...e);
        }), 0), this;
    }
    class n extends Array {
        constructor(...t) {
            super(...t);
        }
        /**
       * Returns a new instance containing the elements with the passed selectors and elements (or from the document if the current instance is empty)
       */        get(...t) {
            let i = new n;
            if (this.length) for (const s of this) i.push(...e(s, ...t)); else i.push(...e(document, ...t));
            return i;
        }
        /**
       * Returns a new instance with new created elements according to the passed parameters
       */        create(...t) {
            let e = new n;
            for (const s of t) if ("string" == typeof s) e.push(document.createElement(s)); else if (s instanceof Object) {
                const t = document.createElement(s.tagName || "div");
                s.content && (Array.isArray(s.content) ? i(t, ...s.content) : i(t, s.content)), 
                e.push(t);
            }
            return e;
        }
        /**
       * Clears the contents of each element in the set and returns the instance itself
       */        empty() {
            return this.forEach((t => t.innerHTML = "")), this
            /**
       * Sets the textContent property for each collection item and returns an instance
       */;
        }
        text(t) {
            return this.forEach((e => e.textContent = t || "")), this
            /**
       * Inserts a set of Node objects or DOMString objects after the last child of each array element
       */;
        }
        append(...t) {
            return this.forEach((e => i(e, ...t))), this
            /**
       * Adds a class or classes to all array elements
       */;
        }
        addClass(...t) {
            return this.forEach((e => e.classList.add(...t))), this
            /**
       * Removes a class or classes from all array elements
       */;
        }
        removeClass(...t) {
            return this.forEach((e => e.classList.remove(...t))), this
            /**
       * Adds or removes a class for each element of the array, depending on its presence
       */;
        }
        toggleClass(t) {
            return this.forEach((e => e.classList.toggle(t))), this
            /**
       * Determine if any of the agreed members are assigned to this class. Or, if you pass "true" as the second argument, then each element (default: reqtForAll = false)
       */;
        }
        hasClass(t, e = !1) {
            if (e) {
                // The presence of a class for each element of the set
                let e = 0;
                return this.forEach((i => {
                    i.classList.contains(t) && e++;
                })), e === this.length;
            }
 // the presence of a class for at least one element of the set
                        for (const e of this) if (e.classList.contains(t)) return !0;
            return !1;
        }
        /**
       * Calls the "addEventListener" method for each set item
       */        addEventListener(t, e, i) {
            return this.forEach((s => s.addEventListener(t, e, i))), this
            /**
       * Calls the "removeEventListener" method for each set item
       */;
        }
        removeEventListener(t, e, i) {
            return this.forEach((s => s.removeEventListener(t, e, i))), this
            /**
       * Calls dispatchEvent with an event of the specified type for each item in the set
       */;
        }
        fireEvent(t) {
            return this.forEach((e => e.dispatchEvent(new Event(t)))), this
            /**
       * Sets the style attribute property passed in the object by key
       */;
        }
        css(t) {
            return this.forEach((e => Object.keys(t).forEach((i => e.style[i] = t[i])))), this
            /**
       * Sets the attribute property passed in the object by key
       */;
        }
        attr(t) {
            return this.forEach((e => Object.keys(t).forEach((i => e.setAttribute(i, t[i]))))), 
            this
            /**
       * Recursively calls each passed function in a new setTimeout(() => {}, 0)
       */;
        }
        nextTick(...t) {
            return s(...t), this;
        }
    }
    function r(...t) {
        return t instanceof n ? t : new n(...e(document, ...t));
    }
    const o = {
        animationstart: "__mutationStartListener",
        animationcancel: "__mutationCancelListener",
        animationend: "__mutationEndListener",
        animationiteration: "__mutationIterationListener",
        transitionstart: "__mutationStartListener",
        transitioncancel: "__mutationCancelListener",
        transitionend: "__mutationEndListener",
        transitionrun: "__mutationRunListener"
    }, a = Object.keys(o);
    class h {
        els;
        emitter;
        allow;
        pending=!1;
        constructor(e) {
            this.emitter = new t(e.on), this.els = Array.isArray(e.el) ? r(...e.el) : r(e.el);
            const i = e.allow, s = e.disallow;
            i && i.length > 0 ? this.allow = (Array.isArray(i) ? i : [ i ]).filter((t => a.includes(t.toLowerCase()))) : s && s.length > 0 ? this.allow = (Array.isArray(s) ? s : [ s ]).filter((t => a.includes(t.toLowerCase()))) : this.allow = a, 
            // if (config.allow) {
            //   this.allow = (Array.isArray(config.allow) ? config.allow : [ config.allow ]).filter(value => events.includes(value));
            // } else if (config.disallow && config.disallow.length > 0) {
            //   this.allow = (Array.isArray(config.disallow) ? config.disallow : [ config.disallow ]).filter(value => events.includes(value));
            // } else {
            //   this.allow = events;
            // }
            Object.keys(o).forEach((t => this[o[t]] = this[o[t]].bind(this))), this.els.forEach((t => this.allow.forEach((e => t.addEventListener(e, this[o[e]])))));
        }
        __mutationStartListener(t) {
            this.pending = !0, this.emitter.emit("start", t);
        }
        __mutationCancelListener(t) {
            this.emitter.emit("cancel", t), this.pending = !1;
        }
        __mutationEndListener(t) {
            this.emitter.emit("end", t), this.pending = !1;
        }
        __mutationIterationListener(t) {
            this.emitter.emit("iteration", t);
        }
        __mutationRunListener(t) {
            this.pending = !0, this.emitter.emit("run", t);
        }
        addEvent(t) {
            a.includes(t) && (this.allow.push(t), this.els.forEach((e => e.addEventListener(t, this[o[t]]))));
        }
        removeEvent(t) {
            a.includes(t) && this.allow.includes(t) && (this.allow.splice(this.allow.indexOf(t)), 
            this.els.forEach((e => e.removeEventListener(t, this[o[t]]))));
        }
        on(t, e) {
            this.emitter.subscribe(t, e);
        }
    }
    function c(t) {
        return "object" == typeof t && !Array.isArray(t) && null !== t;
    }
    function l(t, e, i = {}) {
        const s = void 0 === i.mergeObject || !!i.mergeObject;
        if (c(t) && c(e)) for (const n of Object.keys(e)) s && c(e[n]) ? (t[n] && c(t[n]) || (t[n] = e[n]), 
        l(t[n], e[n])) : i.mergeArray && Array.isArray(e[n]) ? (console.log(n), Array.isArray(t[n]) ? t[n].push(...e[n]) : Object.assign(t, {
            [n]: e[n]
        })) : Object.assign(t, {
            [n]: e[n]
        });
        return t;
    }
    function f(t, e, i = 0) {
        setTimeout((() => {
            e(), t.length && u(...t);
        }), i);
    }
    function u(...t) {
        const e = t.shift();
        return "function" == typeof e ? f(t, e) : Array.isArray(e) && f(t, e[0], e[1]), 
        this;
    }
    const d = (t, e, i, s, n) => {
        t.els.addClass(e), u([ () => t.els.addClass(i), 10 ], [ () => t.els.removeClass(e), 10 ], [ () => {
            t.emitter.once("end", (() => {
                t.els.removeClass(s, i), n && n();
            })), t.els.addClass(s);
        }, 10 ]);
    }, m = (t, e) => void 0 === t ? e : t, g = {
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
    }, p = {
        modalId: "data-modal-id",
        close: "data-modal-close"
    }, w = class {
        static instances=[];
        static queue=[];
        static isFirst=!0;
        emitter;
        config;
        helper;
        animContent;
        static addsEscListener() {
            document.addEventListener("keyup", (t => {
                let e;
                "Escape" === t.code && (e = w.queue.length) && w.queue[e - 1].hide();
            }));
        }
        static showById(t) {
            if (void 0 !== t) for (const e of w.instances) if (t === e.config.id) return void e.show();
        }
        constructor(e) {
            w.isFirst && (w.addsEscListener(), w.isFirst = !1), this.emitter = new t(e.on);
            const i = c(e.classes) ? l(p, e.classes) : g, s = c(e.attrs) ? l(p, e.attrs) : p;
            let n;
            this.config = {
                el: e.el,
                wrapper: e.el.querySelector(`.${i.wrapper}`),
                content: e.el.querySelector(`.${i.content}`),
                isVisible: !1,
                pending: !1,
                mutation: e.mutation || !1,
                attrClose: m(e.attrClose, !0),
                wrapperClick: m(e.wrapperClick, !0),
                allowEsc: m(e.allowEsc, !0),
                classes: i,
                attrs: s
            }, this.config.id = (n = e.el.getAttribute(s.modalId)) ? n : void 0, w.instances.push(this), 
            this.helper = new class {
                cb;
            }, this.config.mutation && (this.animContent = new h({
                el: this.config.content,
                allow: this.config.mutation + "end"
            })), this.config.attrClose && this.config.el.querySelectorAll(`[${this.config.attrs.close}]`).forEach((t => {
                t.addEventListener("click", (() => this.hide()));
            })), this.config.wrapperClick && this.config.wrapper.addEventListener("click", (t => {
                t.target === this.config.wrapper && this.hide();
            })), this.emitter.emit("init", this, this.config.isVisible), e.showOnInit && this.show();
        }
        changeState(t) {
            if (this.config.pending) this.helper.cb = () => this.changeState(t); else if (this.config.isVisible = !t, 
            this.config.mutation) if (this.config.pending = !0, t) {
                this.emitter.emit("beforeHide", this, this.config.mutation);
                let t = w.queue.indexOf(this);
                w.queue.splice(t, 1), d(this.animContent, this.config.classes.transition.hide.from, this.config.classes.transition.hide.active, this.config.classes.transition.hide.to, (() => {
                    this.config.el.classList.remove(this.config.classes.show), this.config.pending = !1;
                    const t = this.helper.cb;
                    delete this.helper.cb, this.emitter.emit("afterHide", this, this.config.mutation), 
                    t && t(this);
                }));
            } else this.emitter.emit("beforeShow", this, this.config.mutation), w.queue.push(this), 
            this.config.el.classList.add(this.config.classes.show), d(this.animContent, this.config.classes.transition.show.from, this.config.classes.transition.show.active, this.config.classes.transition.show.to, (() => {
                this.config.pending = !1;
                const t = this.helper.cb;
                delete this.helper.cb, this.emitter.emit("afterShow", this, this.config.mutation), 
                t && t(this);
            })); else if (t) {
                this.emitter.emit("beforeHide", this, this.config.mutation);
                let t = w.queue.indexOf(this);
                w.queue.splice(t, 1), this.config.el.classList.remove(this.config.classes.show), 
                this.emitter.emit("afterHide", this, this.config.mutation);
            } else this.emitter.emit("beforeShow", this, this.config.mutation), w.queue.push(this), 
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
    return w;
}();
//# sourceMappingURL=modal.js.map
