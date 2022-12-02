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
    [parentNodeId]: fakeMeta(),
    [prevNoDeId]: fakeMeta(),
    [nextNodeId]: fakeMeta(),
    [firstChildNodeId]: fakeMeta(),
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


export function fakeMetaStatus(props: Partial<WorkStatus> = {}): WorkStatus {
  const data = {
    visibility: faker.helpers.arrayElement(Object.values(VisibilityStatus)),
    action: faker.helpers.arrayElement(Object.values(ActionStatus)),
    drawBetweenUpperSiblings: faker.datatype.boolean(),
    initChange: faker.datatype.boolean()
  }
  return mergeDeepLeft(props, data)
}

