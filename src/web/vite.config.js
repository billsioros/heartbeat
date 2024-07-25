import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }) => {
    let backendUrl = 'http://localhost:8000';

    return defineConfig({
        plugins: [react()],
        define: {
            __BACKEND_URL__: JSON.stringify(backendUrl),
        },
        server: {
            watch: {
                usePolling: true
            }
        }
    });
};
