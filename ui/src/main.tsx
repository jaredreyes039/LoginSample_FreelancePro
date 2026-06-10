import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
	Outlet,
	RouterProvider,
	createRootRoute,
	createRoute,
	createRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import './styles/globals.css'
import App from './App.tsx'
import DashboardSamplePage from './pages/Dashboard.page.tsx'
import RoadAheadPage from './pages/RoadAhead.page.tsx'

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

const dashboardRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/dashboard',
	component: DashboardSamplePage,
})

const roadAheadRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/roadAhead',
	component: RoadAheadPage,
})

const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute, roadAheadRoute])

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

