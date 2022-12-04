import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import { fakeMeta, fakeMetaStatus, stateMetaWithNearestNodes } from './../../../../../test-utils/fakeData'

import { ActionStatus, VisibilityStatus, WorkMeta } from '../../../../../typescript/work.type'
import { extractDrawSiblingsLines, extractParentAction, getSelfSuperStatus } from '../updateSuperStatusDownfall'
import { mergeLeft } from 'ramda'
import { WorksState } from '../..'

import testState from '../../../../../test-utils/test_example'


describe('updateSuperStatusDownfall', () => {


  describe('getSelfSuperStatus', () => {
    const [workId, metaById] = stateMetaWithNearestNodes()
    const state = { metaById } as WorksState

    it('return undefined if workMeta isNil (workId = minus correct workId)', () => {
      const wrongWorkId = -workId
      expect(getSelfSuperStatus(state, wrongWorkId)).toBeUndefined()
    })
    it('get superStatus from prevNode, if it exist and if no parentNode', () => {
      const res = getSelfSuperStatus(testState, 22657)
      expect(res?.action).toBe(ActionStatus.Creating)
      expect(res?.drawBetweenUpperSiblings).toBe(true)
    })
    it('get superStatus from parentNode, if it exist and if no parentNode', () => {
      const res = getSelfSuperStatus(testState, 22663)
      expect(res?.action).toBe(ActionStatus.Editing)
      expect(res?.drawBetweenUpperSiblings).toBe(true)
    })
  })


  describe('extractParentAction', () => {
    const meta = fakeMeta()
    const statusIdle = fakeMetaStatus({ action: ActionStatus.Idle })
    const statusCreating = fakeMetaStatus({ action: ActionStatus.Creating })
    const statusEditing = fakeMetaStatus({ action: ActionStatus.Editing })
    const metaStatusIdle = mergeLeft({ status: statusIdle }, meta)

    it('return ActionStatus.Creating if the same in meta.status', () => {
      const data = mergeLeft({ status: statusCreating }, meta)
      expect(extractParentAction(data)).toBe(ActionStatus.Creating)
    })
    it('return ActionStatus.Editing if the same in meta.status', () => {
      const data = mergeLeft({ status: statusEditing }, meta)
      expect(extractParentAction(data)).toBe(ActionStatus.Editing)
    })
    it('return ActionStatus.Creating if status.Idle, but superStatus - creating', () => {
      const data = mergeLeft({ superStatus: statusCreating }, metaStatusIdle)
      expect(extractParentAction(data as WorkMeta)).toBe(ActionStatus.Creating)
    })
    it('return Idle if status and superStatus with action = Idle', () => {
      const superStatusIdle = fakeMetaStatus({ action: ActionStatus.Idle })
      const data = mergeLeft({ superStatus: superStatusIdle }, metaStatusIdle)
      expect(extractParentAction(data)).toBe(ActionStatus.Idle)
    })

  })


  describe('extractDrawSiblingsLines', () => {
    const metaWithNextNode = fakeMeta({ nextNode: faker.datatype.number() })
    const { nextNode, ...metaWithoutNextNode } = fakeMeta()

    it('return TRUE if meta with nextNode', () => {
      expect(extractDrawSiblingsLines(metaWithNextNode)).toBe(true)
    })
    it('return FALSE if meta without nextNode and with SupseStatus drawingsSibligLines = false', () => {
      const superStatus = fakeMetaStatus({ drawBetweenUpperSiblings: false })
      const data = mergeLeft({ superStatus }, metaWithoutNextNode)
      expect(extractDrawSiblingsLines(data)).toBe(false)
    })
    it('return TRUE if meta without nextNode but with SupseStatus drawingsSibligLines = true', () => {
      const superStatus = fakeMetaStatus({ drawBetweenUpperSiblings: true })
      const data = mergeLeft({ superStatus }, metaWithoutNextNode)
      expect(extractDrawSiblingsLines(data)).toBe(true)
    })

  })
})