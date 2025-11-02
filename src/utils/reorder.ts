import {Task}  from '../types'


export const reorder = (list: Task[], startIndex: number, endIndex: number) => {
const result = Array.from(list).sort((a,b)=>a.order-b.order)
const [removed] = result.splice(startIndex, 1)
result.splice(endIndex, 0, removed)
return result.map((item, idx) => ({ ...item, order: idx }))
}