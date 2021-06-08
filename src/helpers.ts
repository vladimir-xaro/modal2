import { nextTick } from "@xaro/micro-dom";
import CSSClassAnimations from "@xaro/css-class-animations";

export const animate = (
  animInst:   CSSClassAnimations,
  from:       string,
  active:     string,
  to:         string,
  afterEnd?:  Function,
): void => {
  animInst.els.addClass(from);

  nextTick(
    [
      () => animInst.els.addClass(active),
      10
    ], [
      () => animInst.els.removeClass(from),
      10
    ], [
      () => {
        animInst.emitter.once('end', () => {
          animInst.els.removeClass(to, active)
          afterEnd && afterEnd();
        });
        animInst.els.addClass(to);
      },
      10
    ]
  );
}

export const undefinedBool = (val: any, def: boolean) => typeof val === 'undefined' ? def : val;