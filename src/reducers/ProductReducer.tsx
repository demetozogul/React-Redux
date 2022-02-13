import { ProductData } from "../datas/ProductData";
import { IProduct } from "../models/IProduct";
import { ProductType } from '../types/ProductType';

export interface IProAction {
    type: ProductType,
    payload: IProduct
}

export function ProductReducer ( state: IProduct[] = ProductData, action: IProAction ) {

    switch (action.type) {
        case ProductType.PRODUCT_LIST:
            return state

            case ProductType.PRODUCT_ADD:
            return [ ...state, action.payload ]

            case ProductType.PRODUCT_DELETE:
            const index = state.findIndex( item => item.id === action.payload.id )
            state.splice(index, 1)
            return [...state]

            case ProductType.PRODUCT_UPDATE:
            const uIndex = state.findIndex( item => item.id === action.payload.id )
            state[uIndex] = action.payload
            return [...state]
    
        default:
            return state
    }

}