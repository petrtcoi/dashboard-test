import { WorkId } from '../../../../../typescript/work.type'
import { useAppDispatch } from '../../../../../redux/hooks'
import { deleteWork } from '../../../../../redux/slices/works'


type RemoveWorkButtonProps = { workId: WorkId, disabled?: boolean }
export const RemoveWorkButton: React.FC<RemoveWorkButtonProps> = (props) => {
  const dispatch = useAppDispatch()

  return (
    <button
      disabled={ props.disabled }
      className={ `icon icon-remove` }
      onClick={ () => dispatch(deleteWork({ workId: props.workId })) }
    />
  )
}


