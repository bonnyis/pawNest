import { createBrowserRouter } from 'react-router-dom';
import {ROUTES} from '@/shared/routes/routes'

import MainLayout from '@/widgets/layouts/main/MainLayout'
import MainPage from '@/pages/main/Main'
import NotFound from "@/pages/common/NotFound"
export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <MainLayout />,
        children: [
            { index: true,
             element: <MainPage />
            },
             {
        path: '/*',
        element: <NotFound />,
    
    }
        ]
    },
   
])