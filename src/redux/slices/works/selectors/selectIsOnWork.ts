import { RootState } from '../../../store'

export const selectIsOnWork = (state: RootState) => {
  return Object.values(state.works.onWork).filter(Boolean).length > 0
}