import React from "react";
import { render } from "react-dom";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";

// --- ExampleStore.js -------------------------------------

// This content normally goes in separate file (you should do this)
// that exports the const exampleStore as a default. The exampleStoreis imported
// wherever needed. This is a very simple project, so do *not* pass the
// entire store as a prop - there will only be ONE instance of this.
//
// The interval=1000 declaration is just a very visible way to name a
// "magical constant" used in the constructor. One might choose to have
// such constants in a separate file, but then you'd have to to go to that
// file to see what the actual value is. I tend not to do that (exceptions
// apply).
//
// The makeAutoObservable() call in the constructor makes
// incrementInterval an observable, but who cares, it's an irrelevant
// side effect and IT MAKES THE CONSTRUCTOR MORE READABLE, more boilerplate
// and we won't ever forget to make something an observable.
//
class ExampleStore {
  incrementInterval = 1000;

  timer = 0;

  incrementCounter = () => (this.timer += 1);

  reset = () => {
    this.timer = 0;
  };

  constructor() {
    makeAutoObservable(this);
    setInterval(this.incrementCounter, this.incrementInterval);
  }
}

const exampleStore = new ExampleStore();
// export default exampleStore;
// --- End ExampleStore.js ----------------------------------------------

// Components would normally go in separate files, except for
// very small "helper subcomponents" which are used to increase
// the readability of a more complex component.
//
const Timer = observer(() => (
  <button onClick={exampleStore.reset}>
    Seconds passed: {exampleStore.timer}
  </button>
));

render(
  <div>
    <Timer />
  </div>,
  document.getElementById("root")
);
