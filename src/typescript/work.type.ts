type Work = {
  "parentId": number,
  "rowName": string,

  "equipmentCosts": number,
  "estimatedProfit": number,
  "machineOperatorSalary": number,
  "mainCosts": number,
  "materials": number,
  "mimExploitation": number,
  "overheads": number,
  "salary": number,
  "supportCosts": number,
}

export type WorkCreateDto = Work
export type WorkGetDto = Work & {
  total: number
  child: WorkGetDto[]
}