import React from 'react';
import Snackbar from '../components/Snackbar';

export const SnackbarContext = React.createContext({
    alert: undefined,
    register: alert => {},
    unregister: () => {},
});

export const useSnackbar = () => React.useContext(SnackbarContext);

export default function SnackbarProvider({ children }) {
    const [alert, setAlert] = React.useState();

    const contextValue = {
        alert,
        register: React.useCallback(alert => setAlert(alert), []),
        unregister: React.useCallback(() => setAlert(undefined), []),
    };

    return (
        <SnackbarContext.Provider value={contextValue}>
            {children}
            {alert !== undefined ? (
                <Snackbar severity={alert.severity} message={alert.message} />
            ) : null}
        </SnackbarContext.Provider>
    );
}
