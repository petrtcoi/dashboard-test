import { WorksState } from "../redux/slices/works"
import { ActionStatus, VisibilityStatus } from "../typescript/work.type"



const testState: WorksState = {
  rootWorkId: 22634,
  workById: {
    '22634': {
      id: 22634,
      rowName: 'test 1',
      overheads: 30,
      salary: 78,
      materials: 54,
      estimatedProfit: 120
    },
    '22657': {
      id: 22657,
      rowName: 'test 32432',
      overheads: 10,
      salary: 26,
      materials: 18,
      estimatedProfit: 40
    },
    '22659': {
      id: 22659,
      rowName: 'test',
      overheads: 5,
      salary: 13,
      materials: 9,
      estimatedProfit: 20
    },
    '22663': {
      id: 22663,
      rowName: 'test',
      overheads: 10,
      salary: 26,
      materials: 18,
      estimatedProfit: 40
    },
    '22664': {
      id: 22664,
      rowName: 'test123',
      overheads: 5,
      salary: 13,
      materials: 9,
      estimatedProfit: 20
    },
    '22665': {
      id: 22665,
      rowName: 'test',
      overheads: 5,
      salary: 13,
      materials: 9,
      estimatedProfit: 20
    }
  },
  metaById: {
    '22634': {
      nestingLevel: 1,
      status: {
        visibility: VisibilityStatus.Expanded,
        action: ActionStatus.Editing,
        drawBetweenUpperSiblings: true,
      },
      nextNode: 22657,
      firstChildNode: 22663,
      superStatus: {
        visibility: VisibilityStatus.Expanded,
        action: ActionStatus.Creating,
        drawBetweenUpperSiblings: true,
      }
    },
    '22657': {
      nestingLevel: 1,
      status: {
        visibility: VisibilityStatus.Expanded,
        action: ActionStatus.Idle,
        drawBetweenUpperSiblings: false,
      },
      prevNode: 22634,
      firstChildNode: 22659,
      superStatus: {
        visibility: VisibilityStatus.Expanded,
        action: ActionStatus.Idle,
        drawBetweenUpperSiblings: false,
      }
    },
    '22659': {
      nestingLevel: 2,
      status: {
        visibility: VisibilityStatus.Expanded,
        action: ActionStatus.Idle,
        drawBetweenUpperSiblings: false,
      },
      parentNode: 22657,
      superStatus: {
        visibility: VisibilityStatus.Expanded,
        action: ActionStatus.Idle,
        drawBetweenUpperSiblings: false,
      }
    },
    '22663': {
      nestingLevel: 2,
      status: {
        visibility: VisibilityStatus.Expanded,
        action: ActionStatus.Idle,
        drawBetweenUpperSiblings: false,
      },
      parentNode: 22634,
      nextNode: 22664,
      firstChildNode: 22665,
      superStatus: {
        visibility: VisibilityStatus.Expanded,
        action: ActionStatus.Idle,
        drawBetweenUpperSiblings: false,
      }
    },
    '22664': {
      nestingLevel: 2,
      status: {
        visibility: VisibilityStatus.Expanded,
        action: ActionStatus.Idle,
        drawBetweenUpperSiblings: false,
      },
      prevNode: 22663,
      superStatus: {
        visibility: VisibilityStatus.Expanded,
        action: ActionStatus.Idle,
        drawBetweenUpperSiblings: false,
      }
    },
    '22665': {
      nestingLevel: 3,
      status: {
        visibility: VisibilityStatus.Expanded,
        action: ActionStatus.Idle,
        drawBetweenUpperSiblings: false,
      },
      parentNode: 22663,
      superStatus: {
        visibility: VisibilityStatus.Expanded,
        action: ActionStatus.Idle,
        drawBetweenUpperSiblings: false,
      }
    }
  },
  onWork: {},
  errorLogs: []
}


export default testState