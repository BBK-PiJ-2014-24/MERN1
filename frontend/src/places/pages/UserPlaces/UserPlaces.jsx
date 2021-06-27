import React from 'react';
import {useParams} from 'react-router-dom';
import PlaceList from '../../components/PlaceList/PlaceList';


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

    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(p => p.creator === userId);

    return(
        <PlaceList items={loadedPlaces}/>
    );
}


export default UserPlaces;