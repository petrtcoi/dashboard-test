import * as R from 'ramda'
import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'

import { fakeMeta, fakeMetaStatus, stateMetaWithNearestNodes } from './../../../../../test-utils/fakeData'

import { ActionStatus, WorkMeta } from '../../../../../typescript/work.type'
import { extractDrawSiblingsLines, extractParentAction, getSelfSuperStatus } from '../updateSuperStatusDownfall'
import { WorksState } from '../..'



describe('updateSuperStatusDownfall', () => {


  describe('getSelfSuperStatus', () => {
    const [workId, metaById] = stateMetaWithNearestNodes()
    const state = { metaById } as WorksState

    it('return undefined if workMeta isNil (workId = minus correct workId)', () => {
      const wrongWorkId = -workId
      expect(getSelfSuperStatus(state, wrongWorkId)).toBeUndefined()
    })
    it('get superStatus from parentNode Status', () => {
      const [workId, _metaById] = stateMetaWithNearestNodes()
      const parentNode = _metaById[workId].parentNode?.toString() || 'trash'
      const metaById = R.pipe(
        R.always(_metaById),
        R.set(R.lensPath([parentNode, 'status', 'action']), ActionStatus.Creating),
        R.set(R.lensPath([parentNode, 'status', 'drawBetweenUpperSiblings']), true)
      )()
      const state = { metaById } as WorksState
      const newStatus = getSelfSuperStatus(state, workId)
      expect(newStatus?.action).toBe(ActionStatus.Creating)
    })
    it('get superStatus from prevNode SuperStatus if no parentNode ', () => {
      const [workId, _metaById] = stateMetaWithNearestNodes()
      const prevNode = _metaById[workId].prevNode?.toString() || '_trash'
      const metaById = R.pipe(
        R.always(_metaById),
        R.set(R.lensPath([workId, 'parentNode']), undefined),
        R.set(R.lensPath([prevNode, 'superStatus', 'action']), ActionStatus.Creating),
        R.set(R.lensPath([prevNode, 'superStatus', 'drawBetweenUpperSiblings']), true)
      )()
      const state = { metaById } as WorksState
      const newStatus = getSelfSuperStatus(state, workId)
      expect(newStatus?.action).toBe(ActionStatus.Creating)
      expect(newStatus?.drawBetweenUpperSiblings).toBe(true)
    })
  })


  describe('extractParentAction', () => {
    const meta = fakeMeta()
    const statusIdle = fakeMetaStatus({ action: ActionStatus.Idle })
    const statusCreating = fakeMetaStatus({ action: ActionStatus.Creating })
    const statusEditing = fakeMetaStatus({ action: ActionStatus.Editing })
    const metaStatusIdle = R.mergeLeft({ status: statusIdle }, meta)

    it('return ActionStatus.Creating if the same in meta.status', () => {
      const data = R.mergeLeft({ status: statusCreating }, meta)
      expect(extractParentAction(data)).toBe(ActionStatus.Creating)
    })
    it('return ActionStatus.Editing if the same in meta.status', () => {
      const data = R.mergeLeft({ status: statusEditing }, meta)
      expect(extractParentAction(data)).toBe(ActionStatus.Editing)
    })
    it('return ActionStatus.Creating if status.Idle, but superStatus - creating', () => {
      const data = R.mergeLeft({ superStatus: statusCreating }, metaStatusIdle)
      expect(extractParentAction(data as WorkMeta)).toBe(ActionStatus.Creating)
    })
    it('return Idle if status and superStatus with action = Idle', () => {
      const superStatusIdle = fakeMetaStatus({ action: ActionStatus.Idle })
      const data = R.mergeLeft({ superStatus: superStatusIdle }, metaStatusIdle)
      expect(extractParentAction(data)).toBe(ActionStatus.Idle)
    })

  })


  describe('extractDrawSiblingsLines', () => {
    const metaWithNextNode = fakeMeta({ nextNode: faker.datatype.number() })
    const { nextNode, ...metaWithoutNextNode } = fakeMeta()


    it('return FALSE if meta without nextNode and with SupseStatus drawingsSibligLines = false', () => {
      const superStatus = fakeMetaStatus({ drawBetweenUpperSiblings: false })
      const data = R.mergeLeft({ superStatus }, metaWithoutNextNode)
      expect(extractDrawSiblingsLines(data)).toBe(false)
    })
    it('return TRUE if meta without nextNode, but ParentNode with nextNode and nestedLevel > 1', () => {
      const data = { ...metaWithoutNextNode, nextNode: 123, nestingLevel: 2 }
      expect(extractDrawSiblingsLines(data)).toBe(true)
    })
    it('return FALSE if meta without nextNode, but ParentNode with nextNode and nestedLevel == 1', () => {
      const data = { ...metaWithoutNextNode, nextNode: 123, nestingLevel: 1 }
      expect(extractDrawSiblingsLines(data)).toBe(false)
    })
    it('return FALSE if meta without nextNode, but ParentNode without nextNode', () => {
      const data = { ...metaWithoutNextNode, nextNode: undefined, nestingLevel: 3 }
      expect(extractDrawSiblingsLines(data)).toBe(false)
    })

  })
})