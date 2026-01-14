import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Welcome from './components/Welcome'
import { useState } from 'react'
import ProtectedLayout from './routes/ProtectedLayout'
import Dashboard from './components/admin/Dashboard'
import NoPageFound from './components/common/NoPageFound'
import ClientTable from './components/client/ClientTable'
import ConsultantTable from './components/consultant/ConsultantTable'
import ProjectTable from './components/project/ProjectTable'
import ClientProtectedLayout from './routes/ClientProtectedLayout'
import ConsultantProtectedLayout from './routes/ConsultantProtectedLayout'
import ExternalProtectedLayout from './routes/ExternalProtectedLayout'
import ClientDashboard from './components/client/ClientDashboard'
import ConsultantDashboard from './components/consultant/ConsultantDashboard'
import ExternalDashboard from './components/external/ExternalDashboard'

function App() {
	const [users, setUsers] = useState()
	const [header, setHeader] = useState("Dashboard")
	
	return (
		<>
			{/* <main> */}
				<Routes>
					{/* Public Routes */}
					{/* <Route path='/' element={<Login />} /> */}
					<Route path='/login' element={<Login />} />
					<Route path='/page-not-found' element={<NoPageFound /> } />

					{/* Admin Protected Routes */}
					<Route path='/admin' element={<ProtectedLayout header={header} setHeader={setHeader} />} >
						<Route path='dashboard' element={<Dashboard />} />
						<Route path='client' element={<ClientTable />} />
						<Route path='consultant' element={<ConsultantTable />} />
						<Route path='project' element={<ProjectTable />} />
						<Route path="*" element={<NoPageFound />} />
					</Route>


					{/* Client Protected Routes */}
					<Route path='/client' element={<ClientProtectedLayout header={header} setHeader={setHeader} />} >
						<Route path='dashboard' element={<ClientDashboard />} />
						<Route path="*" element={<NoPageFound />} />
					</Route>


					{/* Consultant Protected Routes */}
					<Route path='/consultant' element={<ConsultantProtectedLayout header={header} setHeader={setHeader} />} >
						<Route path='dashboard' element={<ConsultantDashboard />} />
						<Route path="*" element={<NoPageFound />} />
					</Route>


					{/* External Users Protected Routes */}
					<Route path='/external' element={<ExternalProtectedLayout header={header} setHeader={setHeader} />} >
						<Route path='dashboard' element={<ExternalDashboard />} />
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
