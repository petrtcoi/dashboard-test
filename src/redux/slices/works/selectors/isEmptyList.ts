import { WorkStatus } from "../../../../typescript/work.type"
import { useAppSelector } from "../../../hooks"

export function isEmptyList() {
  return useAppSelector(state => Object
    .values(state.works.byId)
    // .filter(work => work._meta_.status !== WorkStatus.Creating)
    .length === 0)
}