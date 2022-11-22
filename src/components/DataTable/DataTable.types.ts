import { WorkGetDto } from '../../typescript/work.type'


export type WorkWithMeta = WorkGetDto & { _meta_: WorkMeta }

export type WorkMeta = {
  level: WorkLevel
  hasChild: boolean
  isLastChild?: boolean
}
export type WorkLevel = 1 | 2 | 3
export type SomeWorkLevel = WorkLevel | -1

