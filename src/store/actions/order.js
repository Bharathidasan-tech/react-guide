import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) =>{

    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () =>{
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };

};

export const purchaseBurger = (orderDetails) =>{

    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json',orderDetails)
        .then(response =>{
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name,orderDetails));
            })
        .catch(error=>{
            dispatch(purchaseBurgerFail(error));
        });
    }
};

export const purchaseInit = () =>{
    return {
        type: actionTypes.PURCHASE_INIT

    };
};

