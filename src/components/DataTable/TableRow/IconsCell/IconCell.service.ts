import { ActionStatus, WorkMeta } from '../../../../typescript/work.type'

export const isDisabled = (meta: WorkMeta) => (
  (meta.superStatus.action !== ActionStatus.Idle) ||
  (meta.status.action !== ActionStatus.Idle)
)