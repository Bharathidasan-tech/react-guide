import React, {Component} from 'react';
import {connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Classes from './Auth.css';
import * as actions from '../../store/actions/index';


class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: "Your Mail Address"
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            }, 
            password: {
                elementType: 'input',
                elementConfig:{
                    type: 'password',
                    placeholder: "Your Password"
                },
                value: '',
                validation: {
                    required: true,
                    minLength:8
                },
                valid: false,
                touched: false
            }, 
        },
        isSignup: true
    }  
    
    checkValidation (value, rules) {
        let isValid = true;
        if( !rules ){
            return true;
        }
        if( rules.required ){
            isValid = value.trim() !== '' && isValid;
        }

        if( rules.minLength ){
            isValid = value.length >= rules.minLength && isValid;
        }

        if( rules.isEmail ){
            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            isValid = pattern.test( value ) && isValid;
        }

        return isValid;

    }

    inputChangedHandler = (event,controlName) =>{

        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidation(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }

        }

        this.setState({
            controls: updatedControls
        });

    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignup);
    }

    switchAuthHandler = () =>{
        this.setState(prevState =>{
            return {
                isSignup: !prevState.isSignup
            };
        })
    }


    render () {
        const formElementArr=[];
        for (let key in this.state.controls){
            formElementArr.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        
        let form = formElementArr.map(formElemnt => (
            <Input 
            key={formElemnt.id}
            elementType={formElemnt.config.elementType}
            elementConfig={formElemnt.config.elementConfig}
            value={formElemnt.config.value} 
            invalid={!formElemnt.config.valid}
            shouldValidate={formElemnt.config.validation}
            changed={(event)=>this.inputChangedHandler(event,formElemnt.id)}
            />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={Classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">
                        Submit
                    </Button>
                    <Button 
                    clicked={this.switchAuthHandler}
                    btnType="Danger">
                        Switch to {this.state.isSignup?'Log In':'SignUp'}
                    </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password,isSignup) => dispatch(actions.auth(email, password,isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);