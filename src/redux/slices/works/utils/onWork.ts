
import * as R from 'ramda'
import { WorksState } from '../index'

const addOnWork = (prop: string) => <T>(obj: T): T => R.assoc(prop, true, obj) as T
const clearOnWork = (prop: string) => <T>(obj: T): T  => R.omit([prop], obj) as T
const getOnWorFuncs = (prop: string) => [addOnWork(prop), clearOnWork(prop)]


export const [addFetchAllWorks, clearFetchAllWorks] = getOnWorFuncs('fetchAllWorks')
