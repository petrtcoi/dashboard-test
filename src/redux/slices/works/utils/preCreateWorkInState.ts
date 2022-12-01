import { current } from '@reduxjs/toolkit'
import * as R from 'ramda'
import { WorksState } from ".."
import { WritableDraft } from "immer/dist/internal"

import { ActionStatus, Work, WorkId, WorkMeta } from "../../../../typescript/work.type"


type PropsInsertToState = {
  state: WorksState
  prevNode?: WorkId
  parentNode?: WorkId
}

/**
 * Вставляем Work в workById и metaById возвращаем исправленный state
 * Добавляем только в State!
 */
export const preCreateWorkInState = (props: PropsInsertToState): WorksState => {

  const prevNode = props.prevNode || props.parentNode || null
  if (prevNode === null) return props.state

  const prevMeta = props.state.metaById[prevNode]
  const work =  generateNewWork()


  /** Записываем данные, исходя из того: это добавиление prevNode или как childNode */
  const newMeta: WorkMeta = R.clone({
    ...prevMeta,
    firstChildNode: undefined,
    prevNode: props.prevNode ? prevNode : undefined,
    parentNode: props.parentNode ? prevNode : undefined,
    nextNode: props.parentNode ? prevMeta.firstChildNode : prevMeta.nextNode,
    nestingLevel: props.prevNode ? prevMeta.nestingLevel : prevMeta.nestingLevel + 1,
    status: {
      ...prevMeta.status,
      action: ActionStatus.Creating
    }
  })


  const newWorkLens = R.lensPath(['workById', work.id])
  const newMetaLens = R.lensPath(['metaById', work.id])
  const prevNodeLens = R.lensPath(['metaById', prevNode, props.prevNode ? 'nextNode' : 'firstChildNode'])

  /** Для простоты кода, если node не прописаны, то просто пишем в _trash  */
  const nextNodePrevLens = props.prevNode
    ? R.lensPath(['metaById', prevMeta.nextNode || '_trash', 'prevNode'])
    : R.lensPath(['metaById', prevMeta.firstChildNode || '_trash', 'prevNode'])
  const nextNodeParentLens = R.lensPath(['metaById', prevMeta.firstChildNode || '_trash', 'parentNode'])


  /** Вносим обновления в state */
  return R.pipe(
    R.set(newMetaLens, newMeta),
    R.set(newWorkLens, work),
    R.set(prevNodeLens, work.id),
    R.set(nextNodePrevLens, work.id),
    R.set(nextNodeParentLens, work.id),
    R.tap((x) => console.log('Добавили nextNodeParentPropLens', x)),
  )(props.state) as unknown as WorksState
}




/**
 * Возвращает пустую работу
 * В качестве ID здесь использван Date.now() с отрицательным значением
 */
const generateNewWork = (): Work => {
  return {
    id: -1 * Date.now(),
    rowName: "Новая",
    overheads: 0,
    salary: 0,
    materials: 0,
    estimatedProfit: 0
  }
}