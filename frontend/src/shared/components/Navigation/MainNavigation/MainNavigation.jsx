import React, {  Fragment, useState } from 'react';
import {Link} from 'react-router-dom';

import MainHeader from '../MainHeader/MainHeader';
import NavLinks from '../../Navigation/NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../../UIElements/Backdrop';

import './MainNavigation.css';

function MainNavigation(props){

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    function openDrawer() {
        setDrawerIsOpen(true);
    }
    
    function closeDrawer() {
        setDrawerIsOpen(false);
    }


    return (
        <Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawer}/>}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
                <nav className='main-navigation__drawer-nav'>
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className='main-navigation__menu-btn'
                        onClick={openDrawer} >
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className='main-navigation__title'>
                    <Link to='/'>
                        App Name
                    </Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks />
                </nav>
            </MainHeader>
        </Fragment>
    );   
}

export default MainNavigation;