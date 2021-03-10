/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { observer } from "mobx-react";
import ChannelItem from "./channelItem";
import ChannelStore from "../stores/channelStore";

const ChannelList = observer(() => {
  const newarr = ChannelStore.channels;
  console.log(ChannelStore.channels);
  return (
    <div>
      {ChannelStore.channels.map((current, id) => (
        <ChannelItem key={id} channel={current} id={id} />
      ))}
    </div>
  );
});
export default ChannelList;
