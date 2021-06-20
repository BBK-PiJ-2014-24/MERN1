import React from 'react';
import { YMaps, Map, Placemark } from "react-yandex-maps";

import './YaMap.css';

function YaMap(props){
    console.log(props);
    const coordinates = [props.coordinates.lat, props.coordinates.lng];
    return (
        <div className={`map ${props.className}`} style={props.style}>
            <YMaps>
                <Map height='100%'
                     width='100%' 
                     defaultState={{
                         center: coordinates,
                         zoom: 15
                     }}
                >
                    <Placemark geometry={coordinates} />
                </Map>
            </YMaps>
        </div>
    );

}

export default YaMap;