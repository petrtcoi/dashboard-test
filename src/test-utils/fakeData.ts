import { faker } from '@faker-js/faker'
import { mergeDeepLeft } from 'ramda'

import { VisibilityStatus, WorkMeta, WorkStatus, ActionStatus } from '../typescript/work.type'




export function fakeMeta(props: Partial<WorkMeta> = {}): WorkMeta {
  const data =  {
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

