import React, {useState} from 'react';


import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import Modal from '../../../shared/components/UIElements/Modal';
import YaMap from '../../../shared/components/UIElements/YaMap';

import './PlaceItem.css';

function PlaceItem(props){

    const [showMap, setShowMap] = useState(false);

    function openMapHandler(){
        setShowMap(true);
    }

    function closeMapHandler(){
        setShowMap(false);
    }

    return (
        <React.Fragment>
            <Modal show={showMap} 
                   onCancel={props.closeMapHandler}
                   header={props.address} 
                   contentClass='place-item__modal-content'
                   footerClass='place-item__modal-actions'
                   footer={<Button onClick={closeMapHandler}>CLOSE</Button>}   
            >
               <div className='map-container'>
                    <YaMap coordinates={props.coordinates} />
               </div> 
            </Modal>
            <li className='place-item'>
                <Card className='place-item__content'>
                    <div className='place-item__image'>
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className='place-item__info'>
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className='place-item__actions'>
                        <Button inverse onClick={openMapHandler}>View on Map</Button>
                        <Button to={`/places/${props.id}`}>Edit</Button>
                        <Button danger >Delete</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
            );
}

export default PlaceItem;