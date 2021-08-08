import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {useHttpClient} from '../../shared/hooks/http-hook';

function Users(props){

    // const USERS = [
    //   { id: 'u1',
    //     name: 'Max Schwarz',
    //     image: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    //     places: 3,
    //   }
    // ];

    const url = process.env.REACT_APP_BACKEND_URL + '/users';

    const [loadedUsers, setLoadedUsers] = useState();
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();



    // An empty [] dependcy array means that it only runs once
    // useEffect cannot return a promise directly. Instead, call a fn that calls a promise.
    useEffect(() => {
       const fetchUsers = async() => { 
         try {
          const data = await sendRequest(url);
          setLoadedUsers(data.users);
        } catch(err) {
          console.log(err.message);
        }
       };
       fetchUsers(); 
    }, [sendRequest]);


    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
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