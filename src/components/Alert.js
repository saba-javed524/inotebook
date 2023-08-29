import React from 'react'

const Alert = (props) => {
    const capitalize = (word) => {
        if (word === "danger") {
            word = "error"
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + ':';
    }

    return (
        <div style={{ height: '50px' }}>
            {props.alert && <div className={`alert alert-${props.alert.alertType} alert-dismissible fade show fixed-top`} role="alert">
                <strong>{capitalize(props.alert.alertType)} </strong>{props.alert.alertMessage}
            </div>}
        </div>
    )
}

export default Alert