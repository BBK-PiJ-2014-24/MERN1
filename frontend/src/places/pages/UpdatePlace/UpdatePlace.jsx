import React, {useEffect, useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import Card from '../../../shared/components/UIElements/Card';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/util/validators';

import { useHttpClient } from '../../../shared/hooks/http-hook';
import useForm from '../../../shared/hooks/form-hook';
import { AuthContext } from '../../../shared/context/auth-context';

import '../NewPlace/PlaceForm.css';


const  DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'SkyScraper',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.748492,
            lng:-73.985699,
        },
        creator: 'u1',
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'SkyScraper',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.748492,
            lng:-73.985699,
        },
        creator: 'u2',
    },
];


function UpdatePlace(props){

    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const placeId = useParams().placeId;
    
    const [loadedPlace, setLoadedPlace] = useState();

    const history = useHistory();
    
    const [formState, inputHandler, setFormData] = useForm( {
        title: { 
            value: '',
            isValid: false,
        },
        description: { 
            value: '',
            isValid: false,    
        },
    }, false);
    

    const url = `http://localhost:5000/api/places/${placeId}`;
    useEffect(()=>{
        const fetchPlace = async () => {
            try{
                const data = await sendRequest(url);
                setLoadedPlace(data.place);
                setFormData({
                    title: { 
                        value: data.place.title,
                        isValid: true,
                    },
                    description: { 
                        value: data.place.description,
                        isValid: true,    
                    },
                }, true);
            } catch(err){
                console.log(err);
            }
        };
        fetchPlace();
    },[sendRequest, placeId,setFormData]);

    // const selectedPlace = DUMMY_PLACES.find( p => p.id === placeId);
   
    // useEffect( () => {
    //     if(selectedPlace){
    //         setFormData({
    //             title: { 
    //                 value: selectedPlace.title,
    //                 isValid: true,
    //             },
    //             description: { 
    //                 value: selectedPlace.description,
    //                 isValid: true,    
    //             },
    //         }, true);
    //     }
    //     console.log('loading before?', isLoading );
    //     setIsLoading(false);
    //     setTimeout(()=> console.log('loading after?', isLoading ), 1000);
    // }, [setFormData, selectedPlace, setFormData]);

    if(isLoading){
        // console.log('check loading')
        return (
            <div className='center'>
                <LoadingSpinner />
            </div>
        )
    }
    
    if(!loadedPlace && !error){
        return (
            <div className='center'>
                <Card>
                    <h2>Place Not Found</h2>
                </Card>
            </div>
        );

    }

    const placeUpdateSubmitHandler = async event => {
        event.preventDefault();
        const url = `http://localhost:5000/api/places/${placeId}`;
        const method = 'PATCH';
        const body = JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value
        });
        const header = {'Content-Type': 'application/json'};

        try {
            const data = await sendRequest(url, method, body, header);
            history.push('/' + auth.userId + '/places');
        } catch(err){
            console.log(err);
        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} clearError={clearError} />
            {!isLoading && loadedPlace && (
            <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
            <Input id='title' 
                    element='input'
                    type='text'
                    label='Title'
                    validators={ [VALIDATOR_REQUIRE()] }
                    errorText='Incorrect Title'
                    onInput={inputHandler}
                    initialValue={loadedPlace.title}
                    initialValid={true}
                    />
            <Input id='description' 
                    element='textarea'
                    label='Description'
                    validators={ [VALIDATOR_MINLENGTH(5)] }
                    errorText='Incorrect Title'
                    onInput={inputHandler}
                    initialValue={loadedPlace.description}
                    initialValid={true}
                    />
                <Button type='submit' disabled={!formState.isValid}>UPDATE PLACE</Button>    
            </form>
            )}
        </React.Fragment>
    );
}

export default UpdatePlace;