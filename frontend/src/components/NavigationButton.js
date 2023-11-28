import React from 'react';
import {Button} from 'semantic-ui-react'

const NavigationButton = ({ text, onClick, disabled }) => {
    return (
        <Button onClick={onClick} disabled={disabled} style={{ marginLeft:10, marginRight:10 }}>
            {text}
        </Button>
    );
};

export default NavigationButton;