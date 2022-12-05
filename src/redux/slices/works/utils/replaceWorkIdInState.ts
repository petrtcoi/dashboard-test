import * as R from 'ramda'
import { WorksState } from ".."
import { WorkId } from "../../../../typescript/work.type"

const isNotNil = R.complement(R.isNil)

export const replaceWorkIdInState = R.curry(_replaceWorkIdInState)

function _replaceWorkIdInState(newWorkId: WorkId, oldWorkId: WorkId, state: WorksState): WorksState {
  const oldMeta = state.metaById[oldWorkId]
  if (!oldMeta) return state

  return R.pipe(
    R.always(state),
    R.set(R.lensPath(['metaById', newWorkId]), oldMeta),
    R.when(R.always(isNotNil(oldMeta.firstChildNode)),
      R.set(R.lensPath(['metaById', oldMeta.firstChildNode as WorkId, 'parentNode']), newWorkId)
    ),
    R.when(R.always(isNotNil(oldMeta.parentNode)),
      R.set(R.lensPath(['metaById', oldMeta.parentNode as WorkId, 'firstChildNode']), newWorkId)
    ),
    R.when(R.always(isNotNil(oldMeta.nextNode)),
      R.set(R.lensPath(['metaById', oldMeta.nextNode as WorkId, 'prevNode']), newWorkId)
    ),
    R.when(R.always(isNotNil(oldMeta.prevNode)),
      R.set(R.lensPath(['metaById', oldMeta.prevNode as WorkId, 'nextNode']), newWorkId)
    )
  )()

}