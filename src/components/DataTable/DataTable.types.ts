import { WorkGetDto } from '../../typescript/work.type'



export type WorkWithMeta = WorkGetDto & WorkMeta


export type WorkMeta = {
  level: WorkLevel
  haveChild: boolean
}

export type WorkLevel = 1 | 2 | 3
export type SomeWorkLevel = WorkLevel | -1

export function getNextLevel(level: SomeWorkLevel): SomeWorkLevel {
  return (
    (level == 1) ? 2 :
      (level === 2) ? 3 : -1
  )
}

export function isCorrectLevel(level: SomeWorkLevel): level is WorkLevel {
  return (level === 1 || level === 2 || level === 3)
}