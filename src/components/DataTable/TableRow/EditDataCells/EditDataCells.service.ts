import { useForm } from "react-hook-form"
import { Work } from "../../../../typescript/work.type"


export const connectUseForm = (work: Work) => {
  const { register, getValues } = useForm({
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