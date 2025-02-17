import { sharedb, websocketUrl } from '@/config'
import { useContext, createContext, useEffect, useState } from 'react'
import { Doc } from 'sharedb'

import ReconnectingWebSocket from 'reconnecting-websocket'
import client from 'sharedb/lib/client'
import { Socket } from 'sharedb/lib/sharedb'
import { Spell } from '@latitudegames/thoth-core/types'
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen'

const Connection = client.Connection

interface SharedbContext {
  connection: client.Connection | null
  socket: Socket | null
  getSpellDoc: (spell: Spell) => Doc | null
}

const Context = createContext<SharedbContext>({
  connection: null,
  socket: null,
  getSpellDoc: () => null,
})

export const useSharedb = () => useContext(Context)

export const docMap = new Map()

// Might want to namespace these
const SharedbProvider = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [connection, setConnection] = useState<client.Connection | null>(null)

  useEffect(() => {
    const _socket = new ReconnectingWebSocket(websocketUrl)
    const _connection = new Connection(_socket as Socket)
    setConnection(_connection)
    setSocket(_socket as Socket)
  }, [])

  const getSpellDoc = (spell: Spell) => {
    if (!connection) return
    const key = spell.name
    if (docMap.has(key)) return docMap.get(key)

    const doc = connection.get('spell', key)
    docMap.set(key, doc)

    doc.subscribe(error => {
      if (error) return console.error(error)

      // If doc.type is undefined, the document has not been created, so let's create it
      if (!doc.type) {
        doc.create(spell, error => {
          if (error) console.error(error)
        })
      }
    })

    return doc
  }

  const publicInterface: SharedbContext = {
    socket,
    connection,
    getSpellDoc,
  }

  if (!connection) return <LoadingScreen />

  return <Context.Provider value={publicInterface}>{children}</Context.Provider>
}

const ConditionalProvider = props => {
  if (!sharedb) return props.children

  return <SharedbProvider {...props} />
}

export default ConditionalProvider
