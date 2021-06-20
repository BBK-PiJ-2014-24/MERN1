import React, {useCallback, useReducer} from 'react'

import Input from '../../../shared/components/FormElements/InputX';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../shared/util/validators';
import './NewPlace.css';

function formReducer(state, action){
    switch(action.type){
        case 'INPUT_CHANGE':
            let isFormValid = true;
            for(const obj in state.inputs){
                if (obj === action.inputId){
                    isFormValid = isFormValid && action.isValid;
                } else {
                    isFormValid = isFormValid && state.inputs[obj].isValid;
                }
            }
            return {...state,
                    input:{
                        ...state.inputs,
                    }   
                 };
        default:
            return state;
    }

}


function NewPlace(props){
 
    useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            }
        },
        isValid: false,
    });

    // useCallback to avoid infinite feedback loop
    const titleInputHandler = useCallback((id, value, isValid){

    }, []);

    const descriptionHandler = useCallback((id, value, isValid){

    }, []);

    return (
        <form className='place-form'>
           <Input id='title'
                  type='text' 
                  label='Title' 
                  validators={[VALIDATOR_REQUIRE()]} 
                  element='input'
                  errorText='Invalid Input' />
                  onInput={titleInputHandler}
           <Input id='description'
                  element='textarea' 
                  label='Description' 
                  validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} 
                  element='input'
                  errorText='Invalid Input' />
                  onInput={descriptionHandler}
        </form>
    );
}

export default NewPlace;