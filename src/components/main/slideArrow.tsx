import { stringify } from 'querystring';
import React from 'react';
import Next from '../../assets/image/main/slider_next.svg';
import Prev from '../../assets/image/main/slider_prev.svg';

interface NextArrowProps {
    position: string;
    className?: any;
    style?: any;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Arrow = ({ position, className, style, onClick }: NextArrowProps) => {
    return (
        <div className={className} style={{ ...style, zIndex: '999', width: '200px' ,display: 'block' }} onClick={onClick}> 
            <p className={position === 'Next' ? 'hide' : ''}>PREVIOUS</p>
            <img src={position === 'Next' ? Next : Prev} alt="Slide arrow" />
            <p className={position === 'Prev' ? 'hide' : ''}>NEXT</p>
        </div>
    );
};
export default Arrow;