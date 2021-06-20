import React, {useReducer, useEffect} from 'react';

import {validate} from '../../util/validators';


import './Input.css';


function inputReducer(state, action){
    switch(action.type){
        case 'CHANGE':
            return {...state,
                    value: action.value,
                    isValid: validate(action.value, action.validators) 
                };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true,
            }
        default:
            return state;

    }
}

function Input(props){

    const {id, onInput} = props;
    const {value, isValid} = inputState;


    // Hooks
    const [inputState, dispatch] = useReducer(inputReducer, {value: props.value || '', isTouched: false, isValid: false} );
    
    useEffect(()=>{
        props.onInput(props.id, inputState.value, inputState.isValid)
    }, [props.id, props.onInput, inputState.value, inputState.isValid]);


    function changeHandler(e){
        dispatch({type: 'CHANGE', 
                  value: e.target.value, 
                  validators: props.validators
                 })
    }

    function touchHandler(e){
        dispatch({
          type: 'TOUCH',  
        });
    }


    const elem = props.element === 'input' ? 
        <input id={props.id} 
               type={props.type} 
               value={inputState.value} 
               placeholder={props.placeholder} 
               onChange={changeHandler}
               onBlur={touchHandler}    
               /> 
        : 
        <textarea id={props.id} 
                  rows={props.rows || 3} 
                  value={inputState.value} 
                  onChange={changeHandler} 
                  onBlur={touchHandler}    
                  />;




    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid' }`} >
            <label htmlFor={props.id}>{props.label}</label>
            {elem}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
}

export default Input;

