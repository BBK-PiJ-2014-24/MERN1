import React, {useState, useContext} from 'react';

import { AuthContext} from '../../../shared/context/auth-context';
import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import Modal from '../../../shared/components/UIElements/Modal';
import YaMap from '../../../shared/components/UIElements/YaMap';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../../shared/hooks/http-hook';

import './PlaceItem.css';

function PlaceItem(props){

    const auth = useContext(AuthContext);

    const {isLoading, error, sendRequest, clearError} = useHttpClient();

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
    
    async function confirmDeleteHandler(){
        setShowConfirmModal(false);
        const url = `http://localhost:5000/api/places/${props.id}`;
        const method='DELETE';
        try{
            await sendRequest(url, method);
            props.onDeletePlace(props.id);
        } catch(err) {
            console.log(err);
        }
        
        console.log('DELETE PLACE');
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
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
                {isLoading && <LoadingSpinner asOverlay/>}
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
                        {auth.userId === props.creatorId && 
                            <Button to={`/places/${props.id}`}>Edit</Button>
                        }
                        {auth.userId === props.creatorId && 
                            <Button danger onClick={showDeleteWarningHandler}>Delete</Button>
                        }   
                    </div>
                </Card>
            </li>
        </React.Fragment>
            );
}

export default PlaceItem;