import { makeAutoObservable } from 'mobx';

// Switch around camelCase vs. CamelCase

class channelStore {
  // This is a very small store, but often it's better to extract the definition
  // of initial data - maybe simply to a function right above the store (which keeps the
  // definition of the data structure visible in here)
  channels = [
    {
      channelId: 'UCVTyTA7-g9nopHeHbeuvpRA',
      title: 'Late Night with Seth Meyers',
      thumbnailUrl:
        'https://yt3.ggpht.com/ytc/AAUvwnimi8U7OHBMriWX-iDN4VYZXY0DXKxTAh_UFEolVg=s240-c-k-c0x00ffffff-no-rj',
      selected: false,
    },
    {
      channelId: 'UCwWhs_6x42TyRM4Wstoq8HA',
      title: 'The Daily Show with Trevor Noah ',
      thumbnailUrl:
        'https://yt3.ggpht.com/ytc/AAUvwnhLbaMgiLtS6EhhaZDp2PmORlE_0LDX_fyYiiNRXw=s240-c-k-c0x00ffffff-no-rj  ',
      selected: false,
    },
    {
      channelId: 'UCMtFAi84ehTSYSE9XoHefig',
      title: 'The Late Show with Stephen Colbert',
      thumbnailUrl:
        'https://yt3.ggpht.com/ytc/AAUvwnglk60M1RxjG9tEusa46M5iHPVxY1zMlwAiGfM2-w=s240-c-k-c0x00ffffff-no-rj',
      selected: false,
    },
  ];

  setChannels = channels => (this.channels = channels);

  handleSelectChannel = id =>
    this.setChannels(
      this.channels.map(current => (current.channelId === id ? { ...current, selected: !current.selected } : current))
    );

  constructor() {
    makeAutoObservable(this);
  }
}
const ChannelStore = new channelStore();
export default ChannelStore;
