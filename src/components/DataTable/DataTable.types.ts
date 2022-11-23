import { WorkCreateDto, WorkGetDto } from '../../typescript/work.type'

export enum WorkId {
  Ghost = -9000
}

export type WorkWithMeta = WorkGetDto & { _meta_: WorkMeta } & { parentId: number | null }

export type WorkMeta = {
  level: WorkLevel
  hasChild: boolean
  isLastChild?: boolean
}
export type WorkLevel = 1 | 2 | 3
export type SomeWorkLevel = WorkLevel | -1





