import { observer } from 'mobx-react';

import ChannelItem from './channelItem';
import ChannelStore from '../stores/channelStore';

// SVHH: This goes from html to JS to html - what about extracting the
// JS .map and having all html inside it?

const ChannelList = observer(() => (
  <div>
    {ChannelStore.channels.map((current, id) => (
      <ChannelItem key={id} channel={current} />
    ))}
  </div>
));
export default ChannelList;
