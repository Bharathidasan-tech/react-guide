import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderAction from '../../store/actions/index';

class BurgerBuilder extends Component{

    state = {        
        purchasing: false
      
    }
    componentDidMount (){
        this.props.onInitIngredients();
    }
    updatePurchaseState(ingredients){     
        const sum = Object.keys(ingredients)
            .map(igkey =>{
                return ingredients[igkey]
            }).reduce((sum,el) =>{
                return sum+el
            },0);
            return sum >0;
    }

    

    purchaseHandler = ()=> {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = ()=>{ 
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }
        let orderSummary= null;
     
        let burger = this.props.error ?<p>Ingredients can't be loaded!</p>: <Spinner />
        if(this.props.ings){
         burger=(  
            <Aux>
            <Burger ingredients={this.props.ings} />
            <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved} 
            disabled={disabledInfo} price={this.props.price}
            ordered={this.purchaseHandler}
            purchasable ={this.updatePurchaseState(this.props.ings)}/>
            </Aux> 
            );

        orderSummary= <OrderSummary 
        price={this.props.price}
        ingredients={this.props.ings}
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        />
        }
       
        return (
            <Aux>
                <Modal show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
             {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderAction.addIngredient(ingName)),
         onIngredientRemoved: (ingName) => dispatch(burgerBuilderAction.removeIngredient(ingName)),
         onInitIngredients: () => dispatch(burgerBuilderAction.initIngredients())
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));