var Modal = function() {
    "use strict";
    class EventEmitter {
        /**
       * Event list
       */
        events={};
        /**
       * Create Emitter
       */
        constructor(e = {}) {
            for (let s in e) e[s] && this.subscribe(s, e[s]);
        }
        /**
       * Creates a key for the event and subscribes the passed callback to it.
       */        subscribe(e, s) {
            this.has(e) || (this.events[e] = []);
            let t = [];
            if (Array.isArray(s)) for (const r of s) t.push(...this.subscribe(e, r)); else this.events[e].push(s), 
            t.push((() => this.removeListener(e, s)));
            return t;
        }
        /**
       * Unsubscribes all callback functions from the event and removes the event
       * key.
       */        unsubscribe(...e) {
            for (const s of e) this.events[s] && delete this.events[s];
        }
        /**
       * Removes a specific event key callback function.
       */        removeListener(e, s) {
            // if (typeof this.events[key] === 'object') {
            if (Array.isArray(this.events[e])) {
                const t = this.events[e].indexOf(s);
                t > -1 && this.events[e].splice(t, 1);
            }
        }
        /**
       * Calls the callback function only once, and then removes it.
       */        once(e, s) {
            const t = this.subscribe(e, (() => {
                t[0](), Array.isArray(s) ? s.forEach((e => e())) : s();
            }));
        }
        /**
       * Checks for an event by key.
       * (Doesn't check for callback functions)
       */        has(e) {
            return !!this.events[e];
        }
        /**
       * Returns the number of callback functions for the event key or "false" if
       * there is no key
       */        listenerCount(e) {
            return !!this.events.hasOwnProperty(e) && this.events[e].length;
        }
        /**
       * Calls all callback functions on events using the event key.
       */        emit(e, ...s) {
            const t = this.events[e];
            if (t) for (let e of t) e(...s);
        }
        /**
       * Just like "emit" calls all callback functions. However, the callback must
       * return a boolean value, which determines whether or not the next callback
       * will execute.
       * As a result, it returns the result of the last executed callback function.
       */        validateEmit(e, ...s) {
            const t = this.events[e];
            if (!t) return !1;
            for (const e of t) if (!e(...s)) return !1;
            return !0;
        }
        /**
       * Just like "emit" calls all callbacks, but unlike "emit" it passes the
       * result of the previous callback to the next one as an argument.
       * As aresult, it will return the result of the last callback.
       */        seriesEmit(e, ...s) {
            const t = this.events[e];
            if (!t) return;
            let r;
            for (let e = 0; e < t.length; e++) r = 0 === e ? t[e](...s) : t[e](r);
            return r;
        }
    }
    function t(t, ...e) {
        const s = [];
        for (const r of e) if ("string" == typeof r) {
            const e = t.querySelectorAll(r);
            s.push(...e);
        } else r instanceof Element && s.push(r);
        return s;
    }
    function e$1(t, ...s) {
        for (const r of s) Array.isArray(r) ? e$1(t, ...r) : t.append(r);
    }
    function s(...t) {
        const e = t, r = t.shift();
        return r && setTimeout((() => {
            r(), e.length && s(...e);
        }), 0), this;
    }
    class r extends Array {
        constructor(...t) {
            super(...t);
        }
        /**
       * Returns a new instance containing the elements with the passed selectors and elements (or from the document if the current instance is empty)
       */        get(...e) {
            let s = new r;
            if (this.length) for (const r of this) s.push(...t(r, ...e)); else s.push(...t(document, ...e));
            return s;
        }
        /**
       * Returns a new instance with new created elements according to the passed parameters
       */        create(...t) {
            let s = new r;
            for (const r of t) if ("string" == typeof r) s.push(document.createElement(r)); else if (r instanceof Object) {
                const t = document.createElement(r.tagName || "div");
                r.content && (Array.isArray(r.content) ? e$1(t, ...r.content) : e$1(t, r.content)), 
                s.push(t);
            }
            return s;
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
            return this.forEach((s => e$1(s, ...t))), this
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
                return this.forEach((s => {
                    s.classList.contains(t) && e++;
                })), e === this.length;
            }
 // the presence of a class for at least one element of the set
                        for (const e of this) if (e.classList.contains(t)) return !0;
            return !1;
        }
        /**
       * Calls the "addEventListener" method for each set item
       */        addEventListener(t, e, s) {
            return this.forEach((r => r.addEventListener(t, e, s))), this
            /**
       * Calls the "removeEventListener" method for each set item
       */;
        }
        removeEventListener(t, e, s) {
            return this.forEach((r => r.removeEventListener(t, e, s))), this
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
            return this.forEach((e => Object.keys(t).forEach((s => e.style[s] = t[s])))), this
            /**
       * Sets the attribute property passed in the object by key
       */;
        }
        attr(t) {
            return this.forEach((e => Object.keys(t).forEach((s => e.setAttribute(s, t[s]))))), 
            this
            /**
       * Recursively calls each passed function in a new setTimeout(() => {}, 0)
       */;
        }
        nextTick(...t) {
            return s(...t), this;
        }
    }
    function n$1(...e) {
        return e instanceof r ? e : new r(...t(document, ...e));
    }
    const e = {
        animationstart: "__mutationStartListener",
        animationcancel: "__mutationCancelListener",
        animationend: "__mutationEndListener",
        animationiteration: "__mutationIterationListener",
        transitionstart: "__mutationStartListener",
        transitioncancel: "__mutationCancelListener",
        transitionend: "__mutationEndListener",
        transitionrun: "__mutationRunListener"
    }, n = Object.keys(e);
    class CSSClassAnimations {
        els;
        emitter;
        allow;
        pending=!1;
        constructor(s) {
            this.emitter = new EventEmitter(s.on), this.els = Array.isArray(s.el) ? n$1(...s.el) : n$1(s.el);
            const r = s.allow, a = s.disallow;
            r && r.length > 0 ? this.allow = (Array.isArray(r) ? r : [ r ]).filter((t => n.includes(t.toLowerCase()))) : a && a.length > 0 ? this.allow = (Array.isArray(a) ? a : [ a ]).filter((t => n.includes(t.toLowerCase()))) : this.allow = n, 
            // if (config.allow) {
            //   this.allow = (Array.isArray(config.allow) ? config.allow : [ config.allow ]).filter(value => events.includes(value));
            // } else if (config.disallow && config.disallow.length > 0) {
            //   this.allow = (Array.isArray(config.disallow) ? config.disallow : [ config.disallow ]).filter(value => events.includes(value));
            // } else {
            //   this.allow = events;
            // }
            Object.keys(e).forEach((t => this[e[t]] = this[e[t]].bind(this))), this.els.forEach((t => this.allow.forEach((i => t.addEventListener(i, this[e[i]])))));
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
            n.includes(t) && (this.allow.push(t), this.els.forEach((i => i.addEventListener(t, this[e[t]]))));
        }
        removeEvent(t) {
            n.includes(t) && this.allow.includes(t) && (this.allow.splice(this.allow.indexOf(t)), 
            this.els.forEach((i => i.removeEventListener(t, this[e[t]]))));
        }
        on(t, i) {
            this.emitter.subscribe(t, i);
        }
    }
    function isObject(item) {
        return "object" == typeof item && !Array.isArray(item) && null !== item;
    }
    function deepmerge(target, source, options = {}) {
        const mergeObject = void 0 === options.mergeObject || !!options.mergeObject;
        if (isObject(target) && isObject(source)) for (const key of Object.keys(source)) mergeObject && isObject(source[key]) ? (target[key] && isObject(target[key]) || (target[key] = source[key]), 
        deepmerge(target[key], source[key])) : options.mergeArray && Array.isArray(source[key]) ? (console.log(key), 
        Array.isArray(target[key]) ? target[key].push(...source[key]) : Object.assign(target, {
            [key]: source[key]
        })) : Object.assign(target, {
            [key]: source[key]
        });
        return target;
    }
    function tickHelper(cbs, cb, num = 0) {
        setTimeout((() => {
            cb(), cbs.length && nextTick(...cbs);
        }), num);
    }
    function nextTick(...cbs) {
        const current = cbs.shift();
        return "function" == typeof current ? tickHelper(cbs, current) : Array.isArray(current) && tickHelper(cbs, current[0], current[1]), 
        this;
    }
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
            if (this.config.pending) this.helper.cb = () => this.changeState(hide); else if (this.config.isVisible = !hide, 
            this.config.mutation) if (this.config.pending = !0, hide) {
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
    return Modal;
}();
//# sourceMappingURL=modal.js.map
