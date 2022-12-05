import { faker } from '@faker-js/faker'
import { mergeDeepLeft } from 'ramda'

import { VisibilityStatus, WorkMeta, WorkStatus, ActionStatus, WorkId } from '../typescript/work.type'
import { WorksState } from '../redux/slices/works/index'

export type NearNodes = Pick<WorkMeta, 'firstChildNode' | 'nextNode' | 'parentNode' | 'prevNode'>



export function stateMetaWithNearestNodes(props: Partial<NearNodes> = {}): [WorkId, WorksState['metaById']] {
  const selfNodeId = faker.datatype.number()
  const parentNodeId = faker.datatype.number()
  const prevNoDeId = faker.datatype.number()
  const nextNodeId = faker.datatype.number()
  const firstChildNodeId = faker.datatype.number()
  const metaById = {
    [parentNodeId]: fakeMeta({firstChildNode: selfNodeId}),
    [prevNoDeId]: fakeMeta({nextNode: selfNodeId}),
    [nextNodeId]: fakeMeta({prevNode: selfNodeId}),
    [firstChildNodeId]: fakeMeta({parentNode: selfNodeId}),
    [selfNodeId]: fakeMeta({ parentNode: parentNodeId, prevNode: prevNoDeId, nextNode: nextNodeId, firstChildNode: firstChildNodeId })
  }
  return [selfNodeId, metaById]
}



export function fakeMeta(props: Partial<WorkMeta> = {}): WorkMeta {
  const data = {
    nextNode: faker.datatype.number(),
    prevNode: faker.datatype.number(),
    parentNode: faker.datatype.number(),
    firstChildNode: faker.datatype.number(),
    nestingLevel: faker.helpers.arrayElement([1, 2, 3]),
    status: fakeMetaStatus(),
    superStatus: fakeMetaStatus(),
  }
  return mergeDeepLeft(props, data)
}

/**
 * Создает в базовом варианте: status Idle, drawBetweenUpperSiblings: false
 */
export function fakeMetaStatus(props: Partial<WorkStatus> = {}): WorkStatus {
  const data = {
    visibility: VisibilityStatus.Expanded,
    action: ActionStatus.Idle,
    drawBetweenUpperSiblings: false,
  }
  return mergeDeepLeft(props, data)
}

