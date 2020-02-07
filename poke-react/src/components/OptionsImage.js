import React from 'react';
import { TiArrowRightThick, TiArrowLeftThick } from 'react-icons/ti';

const OptionsImage = ({ onClick, index, style }) => {
    return (
        <React.Fragment>
            <div 
                className="arrowLeft" 
                onClick={() => onClick(index - 1, -1)}
                style={style}
            ><TiArrowLeftThick /></div>
            <div
                className="arrowRight" 
                onClick={() => onClick(index + 1, 1)}
                style={style}
            ><TiArrowRightThick /></div>
        </React.Fragment>
    )
}

export default OptionsImage;