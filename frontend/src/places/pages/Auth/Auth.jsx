import React, { useState, useContext } from 'react'
import Card from '../../../shared/components/UIElements/Card';
import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../shared/util/validators';

import useForm from '../../../shared/hooks/form-hook';
import { AuthContext } from '../../../shared/context/auth-context';

import './Auth.css';

function Auth(props) {

    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
    }, false);




    const authSubmitHandler = async (e) => {
        e.preventDefault();
        const urlSignUp = 'http://localhost:5000/api/users/signup';
        const urlLogin = 'http://localhost:5000/api/users/login';

        let loginConfig;
        let signUpConfig;
        if (isLoginMode) {
            loginConfig = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                })
            };
        } else {
            signUpConfig = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                })
            };
        }



        setIsLoading(true);
        console.log('login mode', isLoginMode);
        if (isLoginMode) {
            try {
                const response = await fetch(urlLogin, loginConfig);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }
                console.log(data);
                setIsLoading(false);
                auth.login();
            } catch (err) {
                console.log(err);
                setIsLoading(false);
                setError(err.message || 'Failed To Fetch');
            }
        } else {
            try {
                const response = await fetch(urlSignUp, signUpConfig);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }
                console.log(data);
                setIsLoading(false);
                auth.login();
            } catch (err) {
                console.log(err);
                setIsLoading(false);
                setError(err.message || 'Failed To Fetch');
            }
        }
    }

    function switchModeHandler() {
        if (!isLoginMode) {
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

    const errorHandler = () => {
        setError(null);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error}
                onClear={errorHandler}

            />

            <Card className='authentication'>
                {isLoading && <LoadingSpinner asOverlay />}
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
                    />}
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
        </React.Fragment>
    );

}

export default Auth;