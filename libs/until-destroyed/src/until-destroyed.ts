import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

export const untilDestroyed = (component: any) => <T>(obs: Observable<T>) => {
  const prototype = Object.getPrototypeOf(component);

  if (typeof prototype.__destroy$__ === 'undefined') {
    const originalNgOnDestroy = prototype.ngOnDestroy;
    const destroy$ = new Subject<void>();
    prototype.__destroy$__ = destroy$;
    const i = Math.random();

    prototype.ngOnDestroy = function() {
      console.log('random:', i);
      destroy$.next();
      destroy$.complete();
      if (originalNgOnDestroy && typeof originalNgOnDestroy === 'function') {
        originalNgOnDestroy.apply(this, arguments);
      }

      prototype.__destroy$__ = undefined;
      prototype.ngOnDestroy = originalNgOnDestroy;
    };
  }

  return obs.pipe(takeUntil(prototype.__destroy$__));
};
