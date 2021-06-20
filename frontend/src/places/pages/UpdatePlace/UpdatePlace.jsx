import React from 'react';
import {useParams} from 'react-router-dom';

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/util/validators';

import useForm from '../../../shared/hooks/form-hook';
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
    const placeId = useParams().placeId;

    const selectedPlace = DUMMY_PLACES.find( p => p.id === placeId);
   
    const [formState, inputHandler] = useForm( {
                    title: { 
                        value: selectedPlace.title,
                        isValid: true,
                    },
                    description: { 
                        value: selectedPlace.description,
                        isValid: true,    
                    },
                }, true);

    if(!selectedPlace){
        return (
            <div className='center'>
                <h2>Place Not Found</h2>
            </div>
        );

    }

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
           <Input id='title' 
                  element='input'
                  type='text'
                  label='Title'
                  validators={ [VALIDATOR_REQUIRE()] }
                  errorText='Incorrect Title'
                  onInput={inputHandler}
                  initialValue={formState.inputs.title.value}
                  initialValid={formState.inputs.title.value}
                />
           <Input id='description' 
                  element='textarea'
                  label='Description'
                  validators={ [VALIDATOR_MINLENGTH(5)] }
                  errorText='Incorrect Title'
                  onInput={inputHandler}
                  initialValue={formState.inputs.description.value}
                  initialValid={formState.inputs.description.isValid}
                />
            <Button type='submit' disabled={!formState.isValid}>UPDATE PLACE</Button>    
        </form>
    );
}

export default UpdatePlace;