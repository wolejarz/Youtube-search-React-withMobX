import { makeAutoObservable } from "mobx";

//
class ChannelStore {
  channels = [];

  //   incrementCounter = () => (this.timer += 1);

  //   reset = () => {
  //     this.timer = 0;
  //   };

  constructor() {
    makeAutoObservable(this);
  }
}
export default ChannelStore;
