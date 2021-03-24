import ChannelStore from '../stores/channelStore';

// SVHH: The onChange={ () => ... } creates a new function on the fly
// for every instance. Ok, so we don't optimize now, just keep in mind.
// And it's often necessary for functional components because you need
// an enclosure (channel.channelId)
const ChannelItem = ({ channel }) => (
  <div className="Item">
    <div className="ItemProp">
      <img style={{ marginRight: '5px', height: '4rem' }} alt="thumbnail" src={channel.thumbnailUrl} />
      {channel.title}
    </div>
    <input
      className="checkbox"
      type="checkbox"
      id="check1"
      onChange={ChannelStore.handleSelectChannel(channel.channelId)}
      checked={channel.selected}
    />
    <label htmlFor="check1">Select</label>
  </div>
);

export default ChannelItem;
