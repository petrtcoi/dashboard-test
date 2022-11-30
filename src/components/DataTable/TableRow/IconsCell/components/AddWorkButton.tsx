import { WorkId, WorkMeta } from '../../../../../typescript/work.type'
import { useAppDispatch } from '../../../../../redux/hooks'
import { isNestedLevelCorrect } from '../../../../../redux/slices/works/utils/isNestedLevelCorrect'


type AddWorkButtonProps = { meta: WorkMeta, nextLevel?: boolean, workId: WorkId, disabled?: boolean }

export const AddWorkButton: React.FC<AddWorkButtonProps> = (props) => {
  const dispatch = useAppDispatch()
  const level = props.nextLevel === true ? (props.meta.nestingLevel + 1) : (props.meta.nestingLevel)
  if (!isNestedLevelCorrect(level)) return null

  return (
    <button
      disabled={ props.disabled }
      className={ `icon icon-level-${level}` }
      onClick={ () => {
        // dispatch(preCreate({
        //   initWorkId: props.workId,
        //   createType: props.nextLevel ? 'child' : 'sibling'
        // }))
      } }
    />
  )
}



