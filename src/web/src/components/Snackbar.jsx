import { Alert, Snackbar as MuiSnackbar, Typography } from '@mui/material';
import React from 'react';
import { useSnackbar } from '../providers/SnackbarProvider';

export default function Snackbar({ severity, message }) {
    const [open, setOpen] = React.useState(true);
    const { unregister } = useSnackbar();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        unregister();
    };

    return (
        <MuiSnackbar
            key={new Date().getTime()}
            sx={{ minWidth: '20%' }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
        >
            <Alert onClose={handleClose} severity={severity} variant="filled">
                <Typography component="h1" variant="h6">
                    {message}
                </Typography>
            </Alert>
        </MuiSnackbar>
    );
}
