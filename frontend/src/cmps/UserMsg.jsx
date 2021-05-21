import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';


export function UserMsg({ msg }) {
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={true}
                autoHideDuration={6000}
                message={msg}
            />
        </div>
    );
}