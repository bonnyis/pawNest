import { createBrowserRouter } from 'react-router-dom';

import WelcomePage from '@/pages/main/WelcomePage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <WelcomePage />
    }
])