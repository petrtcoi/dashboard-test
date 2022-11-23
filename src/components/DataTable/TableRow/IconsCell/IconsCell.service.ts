import React from "react"
import { useAppSelector } from "../../../../redux/hooks"
import { Work, WorkId, WorkLevel, WorkParentId } from "../../../../typescript/work.type"


type NodeType = '' | 'child-last' | 'child'
export function getNodeType(
  nextNode: Work['_meta_']['nextNode'],
  level: WorkLevel): NodeType {
  return level === 1 ? '' : nextNode === null ? 'child-last' : 'child'
}

