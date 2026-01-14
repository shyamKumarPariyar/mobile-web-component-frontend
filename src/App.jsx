import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import { useState } from 'react'
import ProtectedLayout from './routes/ProtectedLayout'
import Dashboard from './components/admin/Dashboard'
import NoPageFound from './components/common/NoPageFound'
import ClientTable from './components/client/ClientTable'
import ConsultantTable from './components/consultant/ConsultantTable'
import ClientProtectedLayout from './routes/ClientProtectedLayout'
import ConsultantProtectedLayout from './routes/ConsultantProtectedLayout'
import ExternalProtectedLayout from './routes/ExternalProtectedLayout'
import ProjecttTable from './components/project/ProjectTable'

function App() {
	const [header, setHeader] = useState("Dashboard")
	
	return (
		<>
			{/* <main> */}
				<Routes>
					{/* Public Routes */}
					<Route path='/login' element={<Login />} />
					<Route path='/page-not-found' element={<NoPageFound /> } />

					{/* Admin Protected Routes */}
					<Route path='/admin' element={<ProtectedLayout header={header} setHeader={setHeader} />} >
						<Route path='dashboard' element={<Dashboard />} />
						<Route path='client' element={<ClientTable />} />
						<Route path='consultant' element={<ConsultantTable />} />
						<Route path='project' element={<ProjecttTable />} />
						<Route path="*" element={<NoPageFound />} />
					</Route>


					{/* Client Protected Routes */}
					<Route path='/client' element={<ClientProtectedLayout header={header} setHeader={setHeader} />} >
						<Route path='dashboard' element={<ProjecttTable />} />
						<Route path="*" element={<NoPageFound />} />
					</Route>


					{/* Consultant Protected Routes */}
					<Route path='/consultant' element={<ConsultantProtectedLayout header={header} setHeader={setHeader} />} >
						<Route path='dashboard' element={<ProjecttTable />} />
						<Route path="*" element={<NoPageFound />} />
					</Route>


					{/* External Users Protected Routes */}
					<Route path='/external' element={<ExternalProtectedLayout header={header} setHeader={setHeader} />} >
						<Route path='dashboard' element={<ProjecttTable />} />
						<Route path="*" element={<NoPageFound />} />
					</Route>

					{/* Route all unauthenticated users and sites */}
					<Route path="*" element={<Navigate to='/login' replace />} />
				</Routes>
			{/* </main> */}
		</>
	)
}

export default App
