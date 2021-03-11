import { observer } from 'mobx-react'

import ChannelItem from './channelItem'
import ChannelStore from '../stores/channelStore'

const ChannelList = observer(() => {
  return (
    <div>
      {ChannelStore.channels.map((current, id) => (
        <ChannelItem key={id} channel={current} id={id} />
      ))}
    </div>
  )
})
export default ChannelList
