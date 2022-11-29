import {WorkId } from '../../../../../typescript/work.type'
import { useAppDispatch } from '../../../../../redux/hooks'
import { removeWork } from "../../../../../redux/slices/works/functions/remove"


type RemoveWorkButtonProps = { workId: WorkId, disabled?: boolean }
export const RemoveWorkButton: React.FC<RemoveWorkButtonProps> = (props) => {
  const dispatch = useAppDispatch()

  return (
    <button
      disabled={ props.disabled }
      className={ `icon icon-remove` }
      onClick={ () => dispatch(removeWork(props.workId)) }
    />
  )
}

