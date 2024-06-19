/* src/Pages/Main/FirstComponent.js */

import './css/FirstComponent.css'
import Poster from './Poster';
import MovieCardContainer from './MovieCardContainer';
import { Link } from 'react-router-dom';

const FirstComponent = () => {
    
    return (
    <div className="mainBlock">
        <div className="blue-block">
        <Poster/>
        </div>
        <MovieCardContainer/>
    </div>
    );
};

export default FirstComponent;