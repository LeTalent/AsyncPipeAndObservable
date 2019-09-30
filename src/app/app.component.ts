import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div class="card card-block">
      <h4 class="card-title">AsyncPipe</h4>

      <p class="card-text" ngNonBindable>{{ promise | async }}</p>
      <p class="card-text">{{ promise | async }}</p>

      <p class="card-text" ngNonBindable>{{ observable$ | async }}</p>
      <p class="card-text">{{ observable$ | async }}</p>

      <p class="card-text" ngNonBindable>{{ observableData }}</p>
      <p class="card-text">{{ observableData }}</p>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnDestroy {
  promise: Promise<{}>;
  observable$: Observable<number>;
  subscription: Subscription = null;
  observableData: number;

  constructor() {
    this.promise = this.getPromise();
    this.observable$ = this.getObservable();
    this.subscribeObservable();
  }
  getObservable() {
    return interval(1000).pipe(
      take(11),
      map(v => v * v)
    );
  }
  // AsyncPipe subscribes to the observable automatically
  subscribeObservable() {
    this.subscription = this.getObservable().subscribe(
      v => (this.observableData = v)
    );
  }

  getPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('Promise complete!'), 1000);
    });
  }

  // AsyncPipe unsubscribes from the observable automatically
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
