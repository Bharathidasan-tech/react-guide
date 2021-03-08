import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
       orderForm: {    
            name: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: "Your Name"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },       
            street: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: "Street"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            city: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: "Your City"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            state: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: "Your State"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: "Country"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },          
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: "Your Email"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },      
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                   options: [
                    {value:'fast', displayValue:'Fast Delivery'},
                    {value:'noraml', displayValue:'Normal Delivery'}
                   ]
                },
                value: 'fast',
                validation:{},
                valid: true
            }
       },
       
    }

    orderHandler =(event) =>{
        event.preventDefault();        
       
         const formData={};
         for(let key in this.state.orderForm){
            formData[key]=this.state.orderForm[key].value;            
         }
        const orderDetails ={
            ingredients: this.props.ings,
            price:this.props.price, 
            orderData: formData          
        }

        this.props.onOrderBurger(orderDetails);
    

    }

    checkValidation (value, rules) {
        let isValid=false;
        if(rules.required){
            isValid=value.trim() !=='';
        }
        return isValid;
    }

    inputChangedHandler = (event,inputIdentifier) =>{
       const updatedOrderForm={
           ...this.state.orderForm
       };
       const updatedFormElement={
           ...updatedOrderForm[inputIdentifier]
       };
       updatedFormElement.value=event.target.value;
       updatedFormElement.valid=this.checkValidation(updatedFormElement.value, updatedFormElement.validation)
       updatedOrderForm[inputIdentifier]=updatedFormElement;
       this.setState({orderForm:updatedOrderForm});
    }

    render (){
        const formElementArr=[];
        for (let key in this.state.orderForm){
            formElementArr.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form=(
            <form onSubmit={this.orderHandler}>
                  {
                    formElementArr.map(formElemnt =>(
                    <Input 
                    key={formElemnt.id}
                    elementType={formElemnt.config.elementType}
                    elementConfig={formElemnt.config.elementConfig}
                    value={formElemnt.config.value} 
                    invalid={!formElemnt.config.valid}
                    shouldValidate={formElemnt.config.validation}
                    changed={(event)=>this.inputChangedHandler(event,formElemnt.id)}
                    />
                ))}
                <Button btnType="Success">ORDER</Button>
            </form>
        );
        if(this.props.loading){
            form=<Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }


}

const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderDetails) => dispatch(actions.purchaseBurger(orderDetails))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));