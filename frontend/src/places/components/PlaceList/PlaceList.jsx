import React from 'react';

import Card from '../../../shared/components/UIElements/Card';
import PlaceItem from '../PlaceItem/PlaceItem';
import Button from '../../../shared/components/FormElements/Button';

import './PlaceList.css';




function PlaceList(props){

    if(props.items.length === 0){
        return (
            <div className='place-list center'>
                <Card>
                    <h2>No Places Found</h2>
                    <Button to='/places/new'>Share Place</Button>
                </Card>
            </div>
        );   
    }
    return(
        <ul className='place-list'>
            {props.items.map( p => <PlaceItem key={p.id} 
                                              id={p.id}
                                              title={p.title}
                                              description={p.description}
                                              image={p.imageUrl}
                                              address={p.address}
                                              creatorId={p.creator}
                                              coordinates={p.location}  
                                              />
            )}
        </ul>
    );
}

export default PlaceList;