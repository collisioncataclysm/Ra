import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import {
  createSlice,
  // createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'

export interface GameState {
  id: string
  state: Record<string, unknown>
  spellId: string
}

const gameStateAdapater = createEntityAdapter<GameState>()
const gameStateSelectors = gameStateAdapater.getSelectors()
const initialState = gameStateAdapater.getInitialState()

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    updateGameState: (state, action) => {
      const gameState = selectGameStateBySpellId(state, action.payload.spellId)

      if (!gameState) {
        gameStateAdapater.addOne(state, { id: uuidv4(), ...action.payload })
      } else {
        gameStateAdapater.updateOne(state, {
          id: gameState.id,
          changes: { state: action.payload.state },
        })
      }
    },
    createGameState: (state, action) => {
      const newGameState = {
        ...action.payload,
        history: [],
      }

      gameStateAdapater.addOne(state, newGameState)
    },
  },
})

export const selectGameStateBySpellId = createDraftSafeSelector(
  [gameStateSelectors.selectAll, (_, spellId) => spellId],
  (gameStates: GameState[], spellId) => {
    return gameStates.find(state => state.spellId === spellId)
  }
)

export const { selectById } = gameStateSelectors
export const { updateGameState, createGameState } = gameStateSlice.actions
export default gameStateSlice.reducer
