import * as R from 'ramda'
import { current } from "@reduxjs/toolkit"
import { WorksState } from ".."
import { WritableDraft } from "immer/dist/internal"
import { WorkId } from "../../../../typescript/work.type"

const isNotNil = R.complement(R.isNil)

/**
 * Это не полное удаление: мы просто убираем WORK из дерева, переводя
 * ссылки предыдущих и последующих WORK друг на друга
 * Дерево дочерних элементов при этом сохраняется, но,
 * так как они будут "почищены" при перезагрузке страницы, 
 * то такого решения должно быть достаточно.
 */
export const _deleteFromState = (workId: WorkId, state: WorksState): WorksState => {
  let newState = R.clone(state)
  const meta = newState.metaById[workId]

  if (!meta) return newState



  return R.pipe(
    R.always(newState),
    R.when((R.always(isNotNil(meta.prevNode))),
      R.set(R.lensPath(['metaById', meta.prevNode as WorkId, 'nextNode']), meta.nextNode)
    ),
    R.when(R.always(isNotNil(meta.nextNode)),
      R.pipe(
        R.set(R.lensPath(['metaById', meta.nextNode as WorkId, 'prevNode']), meta.prevNode),
        R.set(R.lensPath(['metaById', meta.nextNode as WorkId, 'parentNode']), meta.parentNode)
      )
    ),
    R.when(R.always(isNotNil(meta.parentNode)),
      R.set(R.lensPath(['metaById', meta.parentNode as WorkId, 'firstChildNode']), meta.nextNode)
    ),
    R.when(R.allPass([R.always(R.isNil(meta.parentNode)), R.always(R.isNil(meta.prevNode))]),
      R.set(R.lensPath(['rootWorkId']), meta.nextNode)),
  )()
}

export const deleteFromState = _deleteFromState

