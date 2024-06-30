import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { lazy } from "react";
// import Home from './Home';
// import Chat from './Chat';

const Home = lazy(() => import('./Home'));
const Chat = lazy(() => import('./Chat'));

const router: any = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/chat-denguediag',
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