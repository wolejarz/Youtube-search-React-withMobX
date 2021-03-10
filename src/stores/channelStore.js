import { makeAutoObservable, observable } from "mobx";

//
class channelStore {
  channels = [
    {
      id: "UCVTyTA7-g9nopHeHbeuvpRA",
      description:
        'Beloved "Saturday Night Live" personality — and the longest serving anchor on the show\'s wildly popular "Weekend Update" — Seth Meyers',
      thumbnailUrl:
        "https://yt3.ggpht.com/ytc/AAUvwnimi8U7OHBMriWX-iDN4VYZXY0DXKxTAh_UFEolVg=s240-c-k-c0x00ffffff-no-rj",
      selected: false,
    },
    {
      id: "UCwWhs_6x42TyRM4Wstoq8HA",
      description:
        "The Daily Show is an Emmy and Peabody Award-winning program that looks at the day's top headlines through a sharp, reality-based lens.",
      thumbnailUrl:
        "https://yt3.ggpht.com/ytc/AAUvwnhLbaMgiLtS6EhhaZDp2PmORlE_0LDX_fyYiiNRXw=s240-c-k-c0x00ffffff-no-rj",
      selected: false,
    },
    {
      id: "UCMtFAi84ehTSYSE9XoHefig",
      description:
        'Welcome to the official YouTube channel for "The Late Show with Stephen Colbert"',
      thumbnailUrl:
        "https://yt3.ggpht.com/ytc/AAUvwnglk60M1RxjG9tEusa46M5iHPVxY1zMlwAiGfM2-w=s240-c-k-c0x00ffffff-no-rj",
      selected: false,
    },
  ];
  counter = 1010103;

  //   incrementCounter = () => (this.timer += 1);

  //   reset = () => {
  //     this.timer = 0;
  //   };

  constructor() {
    observable.array(this.channels);
  }
}
const ChannelStore = new channelStore();
export default ChannelStore;
