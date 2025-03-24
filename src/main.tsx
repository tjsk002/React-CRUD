import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import '@/index.css'
import QueryClientBoundary from '@/query-client-boundary.tsx'
import Router from '@/router.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientBoundary>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </QueryClientBoundary>
    </StrictMode>
)
