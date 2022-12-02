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
export const _deleteFromState = (
  workId: WorkId,
  state: WorksState,
) => {
  let newState = R.clone(state)
  const meta = newState.metaById[workId]


if (!meta) return newState

if (meta.prevNode) {

  const lensPath = R.lensPath(['metaById', meta.prevNode, 'nextNode'])
  newState = R.set(lensPath, meta.nextNode, newState)

  if (meta.nextNode) {
    const lensPath = R.lensPath(['metaById', meta.nextNode, 'prevNode'])
    newState = newState = R.set(lensPath, meta.prevNode, newState)
  }
}


if (meta.parentNode) {
  const lensPath = R.lensPath(['metaById', meta.parentNode, 'firstChildNode'])
  newState = R.set(lensPath, meta.nextNode, newState)
  if (meta.nextNode) {
    const lensPath = R.lensPath(['metaById', meta.nextNode, 'parentNode'])
    newState = R.set(lensPath, meta.parentNode, newState)
  }
}

const lensWork = R.lensPath(['workById', workId])
newState = R.set(lensWork, undefined, newState)
const lensMeta = R.lensPath(['metaById', workId])
newState = R.set(lensMeta, undefined, newState)


return newState

}

export const deleteFromState = R.curry(_deleteFromState)

