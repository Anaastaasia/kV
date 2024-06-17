import ButtonFavorites from './ButtonFavorites';
import './css/FirstComponent.css'
import Poster from './Poster';
import MovieCardContainer from './MovieCardContainer';

const FirstComponent = () => {
    return (
    <div className="mainBlock">
        <div className="blue-block">
        <Poster/>
        </div>
        <ButtonFavorites/>

        <MovieCardContainer/>
        
    </div>
    );
};

export default FirstComponent;