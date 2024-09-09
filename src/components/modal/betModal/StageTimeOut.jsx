import React, { useEffect } from 'react'
const StageTimeOut = ({ stageModal, setStageModal }) => {
    useEffect(() => {
        let timer;
        if (stageModal) {
            timer = setTimeout(() => {
                setStageModal(false)
            }, 3000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [stageModal, setStageModal]);
    return (
        <div className="win-modal-not" style={{ background: "transparent" }}>
            <div className="error-message">
                <p>Stage time out</p>
                <button onClick={() => setStageModal(false)} type="button" aria-label="Close" className="icon-close"><span aria-hidden="true">×</span></button>
            </div>
        </div>
    )
}

export default StageTimeOut