import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

function App() {

	return (
		<Suspense fallback={<></>}>
			<Outlet />
		</Suspense>
	)
}

export default App
