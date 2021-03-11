import {  makeAutoObservable } from "mobx";

//
class channelStore {
  channels = [
    {
      title:
        'Late Night with Seth Meyers',
      thumbnailUrl:
        "https://yt3.ggpht.com/ytc/AAUvwnimi8U7OHBMriWX-iDN4VYZXY0DXKxTAh_UFEolVg=s240-c-k-c0x00ffffff-no-rj",
      selected: false,
    },
    {
      title:
        "The Daily Show with Trevor Noah ",
      thumbnailUrl:
        "https://yt3.ggpht.com/ytc/AAUvwnhLbaMgiLtS6EhhaZDp2PmORlE_0LDX_fyYiiNRXw=s240-c-k-c0x00ffffff-no-rj  ",
      selected: false,
    },
    {
      title:
        "The Late Show with Stephen Colbert",
      thumbnailUrl:
        "https://yt3.ggpht.com/ytc/AAUvwnglk60M1RxjG9tEusa46M5iHPVxY1zMlwAiGfM2-w=s240-c-k-c0x00ffffff-no-rj",
      selected: false,
    },
  ];
  
  handleSelectChannel = id => {
    console.log(this.channels)
    this.channels=this.channels.map((current,index)=> index === id ? {...current,selected: !current.selected}: current)
    console.log(this.channels)
  }

  constructor() {
    makeAutoObservable(this);
      }
}
const ChannelStore = new channelStore();
export default ChannelStore;
