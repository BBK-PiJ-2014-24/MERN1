import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import PlaceList from '../../components/PlaceList/PlaceList';
import ErrorModal  from '../../../shared/components/UIElements/ErrorModal'
import LoadingSpinner  from '../../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../../shared/hooks/http-hook';

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
        title: 'Empire States Building',
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

// useParams() to get the params of the URL
function UserPlaces(props){

    const[loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const userId = useParams().userId;
    const url = `http://localhost:5000/api/places/user/${userId}`;

    useEffect(() => {
        const fetchPlaces = async () => {
            try{
                const data = await sendRequest(url);
                setLoadedPlaces(data.places);
            } catch(err){
                console.log(err);
            }
        } 
        fetchPlaces();
    }, [sendRequest, userId]);

    // const loadedPlaces = DUMMY_PLACES.filter(p => p.creator === userId);

    const depletePlaceHandler = (deletedPlaceId) => {
        setLoadedPlaces(prevPlaces => 
            prevPlaces.filter( p => p.id !== deletedPlaceId)
        );
    };


    return(
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading && (
            <div className='center'>
                <LoadingSpinner />
            </div> 
        )}
        {!isLoading && loadedPlaces &&
            <PlaceList items={loadedPlaces} onDeletePlace={depletePlaceHandler} />
        }    
        </React.Fragment>
    );
}


export default UserPlaces;