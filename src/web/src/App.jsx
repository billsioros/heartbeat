import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RoutingProvider } from './providers/RoutingProvider';
import SnackbarProvider from './providers/SnackbarProvider';

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <SnackbarProvider>
                <RoutingProvider />
            </SnackbarProvider>
            {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
    );
}

export default App;
