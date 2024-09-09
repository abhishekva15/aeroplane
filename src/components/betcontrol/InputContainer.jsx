import React, { useState } from 'react'
import ButtonClick from './ButtonClick'
import { betAmountValue } from '../../utility/staticData'
import plus from '../../frontend/assets/plus.svg'
import minusCircle from '../../frontend/assets/minus-circle.svg'

const InputContainer = ({ disableButton, amount, setAmount, cashoutData, index, info }) => {
    const [lastClickedValue, setLastClickedValue] = useState(null);
    const maxAmount = Math.min(info.balance, 20000.00);
    const handleAmountButtonClick = (value) => {
        const numericValue = parseFloat(value.replace(/,/g, ''));
        if (isNaN(numericValue)) return;
        const newAmount = Math.min(numericValue, maxAmount).toFixed(2);
        if (+amount === '') {
            setAmount(newAmount);
        } else {
            if (parseInt(value) !== parseInt(lastClickedValue)) {
                setAmount(newAmount);
            } else {
                setAmount(prevAmount => {
                    const newAmount = Math.min(+prevAmount + numericValue, maxAmount).toFixed(2);
                    return newAmount;
                });
            }
        }
        setLastClickedValue(value);
    };

    // Amount increase function
    const handleIncrease = () => {
        let numericValue = parseFloat(amount);
        if (isNaN(numericValue) || +amount === "") {
            numericValue = 20.00;
        } else {
            numericValue += 20;
            if (numericValue > maxAmount) {
                numericValue = maxAmount;
            }
        }
        setAmount(numericValue.toFixed(2));
    };

    // Amount decrease function
    const handleDecrease = () => {
        let numericValue = parseFloat(amount);
        if (isNaN(numericValue) || +amount === "") {
            numericValue = 20.00;
        } else if (numericValue > 20.00) {
            numericValue -= 20;
        }
        numericValue = Math.max(20.00, numericValue);
        setAmount(numericValue.toFixed(2));
    };

    // Input amount change function
    const handleAmountChange = (event) => {
        let inputValue = event.target.value;
        if (inputValue) {
            let numericValue = parseFloat(inputValue);
            if (numericValue > maxAmount) {
                numericValue = maxAmount;
            }
            setAmount(numericValue.toString());
        } else {
            setAmount("");
        }
    };

    const handleAmountChangeBlur = (event) => {
        let numericValue = parseFloat(event.target.value);
        if (isNaN(numericValue) || numericValue === "") {
            numericValue = 20.00;
        } else {
            // Ensure the value is within the specified range
            if (numericValue < 20) {
                numericValue = 20.00;
            } else if (numericValue > maxAmount) {
                numericValue = maxAmount;
            }
        }
        setAmount(numericValue.toFixed(2));
    };

    return (
        <div className="input-container">
            <div className="input-click-btn">
                <button disabled={disableButton}
                    style={{ cursor: disableButton ? "default" : "" }}
                    className="add-less-btn" onClick={() => handleDecrease()}>
                    <img src={minusCircle} alt="" style={{ cursor: disableButton ? "default" : "" }} />
                </button>
                <input type="number" name="" id=""
                    style={{ color: disableButton ? "#9ea0a3" : "white" }}
                    disabled={disableButton}
                    max={maxAmount}
                    className="input-value" value={amount}
                    onBlur={handleAmountChangeBlur}
                    onKeyDown={(e) => {
                        if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
                            e.preventDefault();
                        }
                    }}
                    onChange={(event) => handleAmountChange(event, index)} />
                <button disabled={disableButton}
                    style={{ cursor: disableButton ? "default" : "" }}
                    className="add-less-btn" onClick={() => handleIncrease(index)}>
                    <img src={plus} alt="" style={{ cursor: disableButton ? "default" : "" }} />
                </button>
            </div>
            <div className="btn-amount">
                {betAmountValue?.map((amountValue, i) => (
                    <ButtonClick
                        key={i}
                        disableButton={disableButton}
                        value={amountValue.value}
                        cashoutData={cashoutData}
                        lastClickedValue={lastClickedValue}
                        setLastClickedValue={setLastClickedValue}
                        onClick={handleAmountButtonClick}
                    />
                ))}
            </div>
        </div>
    );
}

export default InputContainer;
