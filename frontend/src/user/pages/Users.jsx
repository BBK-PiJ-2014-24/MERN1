import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

function Users(props){

    // const USERS = [
    //   { id: 'u1',
    //     name: 'Max Schwarz',
    //     image: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    //     places: 3,
    //   }
    // ];

    const url = 'http://localhost:5000/api/users';

    const [isLoading, setIsLoading] = useState(false);
    const [loadedUsers, setLoadedUsers] = useState();
    const [error, setError] = useState();



    // An empty [] dependcy array means that it only runs once
    // useEffect cannot return a promise directly. Instead, call a fn that calls a promise.
    useEffect(() => {
       const sendRequest = async() => { 
         setIsLoading(true);
         try {
          const response = await fetch(url);
          const data = await response.json();
          if(!response.ok){
            throw new Error(data.message);
          }
          setLoadedUsers(data.users);
        } catch(err) {
          setError(err.message);
        }
        setIsLoading(false);
       };
       sendRequest(); 
    }, []);

    const errorHandler = () => {
      setError(null);
    }



    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={errorHandler} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>)
        }
        {!isLoading && loadedUsers &&
          <UsersList items={loadedUsers} />
        }
        </React.Fragment>
    );
}

export default Users;