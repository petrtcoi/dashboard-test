import * as R from 'ramda'
import { current } from "@reduxjs/toolkit"
import { WorksState } from ".."
import { WritableDraft } from "immer/dist/internal"
import { WorkId } from "../../../../typescript/work.type"


/**
 * Это не полное удаление: мы просто убираем WORK из дерева, переводя
 * ссылки предыдущих и последующих WORK друг на друга
 * Дерево дочерних элементов при этом сохраняется, но,
 * так как они будут "почищены" при перезагрузке страницы, 
 * то такого решения должно быть достаточно.
 */
export const deleteFromState = (
  state: WritableDraft<WorksState>,
  workId: WorkId
) => {
  let currState = current(state)
  const meta = currState.metaById[workId]

  if (!meta) return currState

  if (meta.prevNode) {
    const lensPath = R.lensPath(['metaById', meta.prevNode, 'nextNode'])
    currState = R.set(lensPath, meta.nextNode, currState)

    if (meta.nextNode) {
      const lensPath = R.lensPath(['metaById', meta.prevNode, 'prevNode'])
      currState = currState = R.set(lensPath, meta.prevNode, currState)
    }
  }


  if (meta.parentNode) {
    const lensPath = R.lensPath(['metaById', meta.parentNode, 'firstChildNode'])
    currState = R.set(lensPath, meta.nextNode, currState)
    if (meta.nextNode) {
      const lensPath = R.lensPath(['metaById', meta.nextNode, 'parentNode'])
      currState = R.set(lensPath, meta.parentNode, currState)
    }
  }

  const lensWork = R.lensPath(['workById', workId])
  currState = R.set(lensWork, undefined, currState)
  const lensMeta = R.lensPath(['metaById', workId])
  currState = R.set(lensMeta, undefined, currState)

  return currState

}

