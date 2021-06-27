import React, {useState, useContext} from 'react';

import { AuthContext} from '../../../shared/context/auth-context';
import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import Modal from '../../../shared/components/UIElements/Modal';
import YaMap from '../../../shared/components/UIElements/YaMap';

import './PlaceItem.css';

function PlaceItem(props){

    const auth = useContext(AuthContext);

    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    function openMapHandler(){
        setShowMap(true);
    }

    function closeMapHandler(){
        setShowMap(false);
    }


    function showDeleteWarningHandler(){
        setShowConfirmModal(true);
    }

    function cancelDeleteHandler(){
        setShowConfirmModal(false);
    }
    
    function confirmDeleteHandler(){
        setShowConfirmModal(false);
        console.log('DELETE PLACE')
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
            <Modal show={showConfirmModal}
                   onCancel={cancelDeleteHandler}
                   header='Warning'
                   footerClass='place-item__modal-actions' 
                   footer={
                       <React.Fragment>
                           <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                           <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                       </React.Fragment>
                   }
                   >
                <p>Do you want to delete?</p>
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
                        {auth.isLoggedIn && 
                            <Button to={`/places/${props.id}`}>Edit</Button>
                        }
                        {auth.isLoggedIn && 
                            <Button danger onClick={showDeleteWarningHandler}>Delete</Button>
                        }   
                    </div>
                </Card>
            </li>
        </React.Fragment>
            );
}

export default PlaceItem;