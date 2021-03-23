import { observer } from 'mobx-react';

import ChannelItem from './channelItem';
import ChannelStore from '../stores/channelStore';

const ChannelList = observer(() => (
  <div>
    {ChannelStore.channels.map((current, id) => (
      <ChannelItem key={id} channel={current} />
    ))}
  </div>
));
export default ChannelList;
