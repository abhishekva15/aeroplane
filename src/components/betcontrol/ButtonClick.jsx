// ButtonClick.js (ButtonClick component)
import React from 'react';

const ButtonClick = ({ value, setLastClickedValue, onClick, cashoutData, disableButton }) => {
    const handleClick = () => {
        // Update the last clicked chip button value
        setLastClickedValue(value);
        onClick(value);
    };

    return (
        <>
            {
                 <button className="amount-btn"
                    disabled={disableButton}
                    onClick={handleClick}>
                    {value}
                </button>
            }


        </>
    );
};

export default ButtonClick;
