import React, {useState, useContext} from 'react'
import Card from '../../../shared/components/UIElements/Card';
import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE  } from '../../../shared/util/validators';

import useForm from '../../../shared/hooks/form-hook';
import { AuthContext } from '../../../shared/context/auth-context';

import './Auth.css';

function Auth(props){
    
   const auth = useContext(AuthContext);
   
    const [isLoginMode, setIsLoginMode] = useState(true);

   const [formState, inputHandler, setFormData] = useForm({
                                                email:{
                                                    value:'',
                                                    isValid: false
                                                },
                                                password: {
                                                    value:'',
                                                    isValid: false
                                                },
                                            }, false);




    function authSubmitHandler(e){
        e.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }                                            

    function switchModeHandler(){
        if(!isLoginMode){
            setFormData(
                {
                ...formState.inputs,    
                name: undefined,
                }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: '',
                }
                }, false);
        }
        setIsLoginMode(prevState => !prevState);
    }    

    return(
        <Card className='authentication'>
            <h2>Login</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode && <Input element='input' 
                                        id='name' 
                                        type='text' 
                                        label='Login Name' 
                                        validators={[VALIDATOR_REQUIRE()]}
                                        errorText='Login name required' 
                                        onInput={inputHandler}    
                                        /> }
                <Input element='input'
                       id='email' 
                       type='email' 
                       label='Email' 
                       validators={[VALIDATOR_EMAIL()]} 
                       errorText='Incorrect Syntax'    
                       onInput={inputHandler}
                       />
                <Input element='input'
                       id='password' 
                       type='password' 
                       label='password' 
                       validators={[VALIDATOR_MINLENGTH(5)]} 
                       errorText='Incorrect Password'    
                       onInput={inputHandler}
                       />
                <Button type='submit' disabled={!formState.isValid}>
                    {isLoginMode ? 'Login' : ' Sign Up'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>Switch to {isLoginMode ? 'Sign Up' : 'Login'}</Button>
        </Card>
    );

}

export default Auth;