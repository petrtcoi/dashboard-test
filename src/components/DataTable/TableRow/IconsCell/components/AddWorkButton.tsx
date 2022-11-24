import { isWorkLevelCorrect, WorkId, WorkMeta, getNextLevel } from '../../../../../typescript/work.type'
import { useAppDispatch } from '../../../../../redux/hooks'
import { preCreate } from "../../../../../redux/slices/works"
import { removeWork } from "../../../../../redux/slices/works/methods/remove"


type AddWorkButtonProps = { meta: WorkMeta, nextLevel?: boolean, workId: WorkId, disabled?: boolean }

export const AddWorkButton: React.FC<AddWorkButtonProps> = (props) => {
  const dispatch = useAppDispatch()
  const level = props.nextLevel === true ? getNextLevel(props.meta.level) : props.meta.level
  if (!isWorkLevelCorrect(level)) return null

  return (
    <button
      disabled={ props.disabled }
      className={ `icon icon-level-${level}` }
      onClick={ () => {
        dispatch(preCreate({
          initWorkId: props.workId,
          createType: props.nextLevel ? 'child' : 'sibling'
        }))
      } }
    />
  )
}



