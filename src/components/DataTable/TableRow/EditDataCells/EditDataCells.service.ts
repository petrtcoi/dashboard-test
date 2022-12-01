import React from 'react'
import { useForm } from "react-hook-form"
import { Work } from "../../../../typescript/work.type"



export const connectUseForm = (work: Work) => {
  const { register, getValues } = useForm<Work>({
    defaultValues: {
      rowName: work.rowName,
      salary: work.salary,
      materials: work.materials,
      overheads: work.overheads,
      estimatedProfit: work.estimatedProfit,
    }
  })

  return { register, getValues }
}


export const useListenKeyboard = (funcOk: Function, funkCancel: Function) => {

  React.useEffect(() => {
    const keyDownHandler = (event: { key: string; preventDefault: () => void }) => {

      if (event.key === 'Enter') {
        event.preventDefault()
        funcOk()
      }
      if (event.key === 'Escape') {
        event.preventDefault()
        funkCancel()
      }
      return
    }
    document.addEventListener('keydown', keyDownHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [])
}
