import React from 'react';
import {
    Navigate,
    Outlet,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
// import Clients from '../features/clients/Clients';
import Layout from '../components/Layout';
import HeartBeatList from '../features/heartbeat/HeartBeatList';
import HeartBeatCreateForm from '../features/heartbeat/HeartBeatCreateForm';
import HeartBeatDetail from '../features/heartbeat/HeartBeatDetail';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={
                <Layout>
                    <Outlet />
                </Layout>
            }
        >
            <Route path="/" element={<HeartBeatCreateForm open={true} />} />
            <Route path="/heartbeats" element={<HeartBeatList />} />
            <Route path="/heartbeats/:id" element={<HeartBeatDetail />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Route>,
    ),
);

export function RoutingProvider() {
    return <RouterProvider router={router} />;
}
