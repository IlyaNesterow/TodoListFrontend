import userIdComparer from '../utils/userIdComparer'
import write from '../api/messaging/write-message'


export default async (conv, messageInput, add, edit, updateConv) => {
  if(messageInput.current.value.trim().length !== 0){
    const txt = messageInput.current.value
    messageInput.current.value = ''
    const to = conv.participants.find(p => !userIdComparer(p._id))._id
    const unverifiedMsg = { 
      text: txt,
      writtenAt: new Date().toISOString(),
      loading: true,
      to: to
    }
    
    setImmediate(add(unverifiedMsg))
    const data = await write(txt, to, conv._id)
    updateConv({ 
      ...conv, 
      latestMessage: data.message, 
      unseenMessages: conv.unseenMessages + 1, 
      updatedAt: data.message.writtenAt 
    })
    edit({ oldMessage: unverifiedMsg, verifiedMessage: data.message })
  }
}