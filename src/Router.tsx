import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";

const Chat = lazy(() => import('./Chat'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/home?',
                element: <h1>Denguediag</h1>
            },
            {
                path: 'chat-denguediag',
                element: <Chat />
            }
        ]
    },
    {
        path: "*",
        element: <div>404 not found</div>
    }
])


export default router;