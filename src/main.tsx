import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
	Outlet,
	RouterProvider,
	createFileRoute,
	createRootRoute,
	createRoute,
	createRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import './styles.css'

import App from './App.tsx'
import RegistrationPage from './pages/Registration.page.tsx'
import DashboardSamplePage from './pages/Dashboard.page.tsx'

const rootRoute = createRootRoute({
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
})

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: App,
})

const registerRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/registration',
	component: RegistrationPage
})

const dashboardRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/dashboard',
	component: DashboardSamplePage
})
const routeTree = rootRoute.addChildren([indexRoute, registerRoute, dashboardRoute])

const router = createRouter({
	routeTree,
	context: {},
	defaultPreload: 'intent',
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	)
}

