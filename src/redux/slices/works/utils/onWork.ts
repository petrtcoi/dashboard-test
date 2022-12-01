
import * as R from 'ramda'
import { WorksState } from '../index'

export const addOnWork = (prop: string) => <T>(obj: T): T => R.assoc(prop, true, obj) as T
export const clearOnWork = (prop: string) => <T>(obj: T): T  => R.omit([prop], obj) as T
const getOnWorFuncs = (prop: string) => [addOnWork(prop), clearOnWork(prop)]


export const [addFetchAllWorks, clearFetchAllWorks] = getOnWorFuncs('fetchAllWorks')

export const addDeleteWork = addOnWork('delete')
export const clearDeleteWork = clearOnWork('delete')

export const addUpdateWork = addOnWork('update')
export const clearUpdateWork = clearOnWork('update')

export const addCreateWork = addOnWork('create')
export const clearCreateWork = clearOnWork('create')

