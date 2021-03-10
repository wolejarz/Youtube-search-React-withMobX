import React, { useContext } from "react";
import AppContext from "../context/appContext";

const ChannelItem = ({ channel, id }) => {
  const appContext = useContext(AppContext);
  const { handleSelectChannel } = appContext;

  return (
    <div className="Item">
      <div className="ItemProp">
        <img
          style={{ marginRight: "5px", height: "4rem" }}
          alt="thumbnail"
          src={channel.thumbnails.medium.url}
        />
        {channel.title}
      </div>
      <input
        className="checkbox"
        type="checkbox"
        id="check1"
        onChange={() => handleSelectChannel(id)}
        checked={channel.selected}
      />
      <label htmlFor="check1">Select</label>
    </div>
  );
};
export default ChannelItem;
