import React from 'react';

const Notification = ({message,errorMsg}) => {

    const friendlyStyle =  {
        color: 'green',
        background: 'lightgray',
        padding: 15,
        borderStyle: 'solid',
        borderRadius: 5,
        fontSize: 20,
        marginBottom: 20
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        padding: 10,
        marginBottom: 10
    }


    if(message == null && errorMsg == null) {
        return null;
    }
    if(message != null) {
        return (
            <div style={friendlyStyle}>
                {message}
            </div>
        );
    }
    if(errorMsg != null) {
        return (
            <div style={errorStyle}>
                {errorMsg}
            </div>
        );
    }
}

export default Notification;