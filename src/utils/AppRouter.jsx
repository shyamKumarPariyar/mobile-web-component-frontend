import { Route, Routes, useLocation as Location, Navigate} from "react-router-dom";
import Login from "../components/login/Login";
import CompanyDashboard from "../components/super-admin/company/CompanyDashboard";
import ProtectedLayout from "../routes/ProtectedLayout";
import ListAsset from "../components/super-admin/asset/ListAsset";
// import ListAsset as AdminListAsset from "../components/admin/asset/ListAsset";
import AddAsset from "../components/super-admin/asset/AddAsset";
import UpdateAsset from "../components/super-admin/asset/UpdateAsset";
import ListCategory from "../components/super-admin/category/ListCategory";
import AdminListCategory from "../components/admin/category/AdminListCategory";
import SubRoute from "../routes/SubRoute";
import MainModelPlayer from "../components/sketchfab/MainModelPlayer";
import ListCompany from "../components/super-admin/company/ListCompany";
import ManageCompany from "../components/super-admin/company/ManageCompany";
import AddCompany from "../components/super-admin/company/AddCompany";
import ListTeam from "../components/super-admin/team/ListTeam";
import GridAsset from "../components/super-admin/asset/GridAsset";
import ManageOrder from "../components/super-admin/category/ManageOrder";
import AdminManageOrder from "../components/admin/category/AdminManageOrder";
import { useEffect, useState } from "react";
import Dashboard from "../components/admin/Dashboard";
import { getAllOrganizations } from "../service/organization.service";
import AdminSubRoute from "../routes/AdminSubRoute";
import AdminProtectedLayout from "../routes/AdminProtectedLayout";
import SignIn from "../components/admin/SignIn";
import NoPageFound from "../components/common/NoPageFound";
import { DomainFromPath } from "../service/DomainFromPath";
import Setting from "../components/admin/settings/Setting";
import AdminListAsset from "../components/admin/assets/AdminListAsset";
import AdminGridAsset from "../components/admin/assets/AdminGridAsset";
import AdminListTeam from "../components/admin/team/AdminListTeam";
import ListVideo from "../components/super-admin/video/ListVideo";
import GridVideo from "../components/super-admin/video/GridVideo";
import AddEditVideo from "../components/super-admin/video/AddEditVideo";
import AdminUpdateAsset from "../components/admin/assets/AdminUpdateAsset";
import MainVideoPlayer from "../components/videos/MainVideoPlayer";
import AdminListVideo from "../components/admin/video/AdminListVideo";
import AdminAddEditVideo from "../components/admin/video/AdminAddEditVideo";
import Library from "../components/library/Library";
import SharedDemoLink from "../components/shared/SharedDemiLink";
import UserProtectedLayout from "../routes/UserProtectedLayout";
import ListGame from "../components/super-admin/game/ListGame";
import ListAdminGame from "../components/admin/game/ListAdminGame";
import SharedVideoDemoLink from "../components/shared/SharedVideoDemoLink";
import ListThreeSixty from "../components/super-admin/threesixty/ListThreeSixty";
import ListAdminThreeSixtyContent from "../components/admin/threesixty/ListAdminThreeSixtyContent";
import SiteProtectedLayout from "../routes/SiteProtectedLayout";
import DigitalTwinLayout from "../components/site/digital-twin/DigitalTwinLayout";

const AppRouter = () => {
	const [header, setHeader] = useState("Dashboard")
	const [ setDomain ] = useState()

	const [company, setCompany] = useState()
	const location = Location()

	const getCompanyList = async () => {
		await getAllOrganizations()
		.then(response => {
			const {data} = response.data
			setCompany(data)
		})
		.catch(err => console.error("Error:", err))
	}

	const getCurrentOrganization = async () => {
		const temDomain = company?.filter((data) => data.subdomain === DomainFromPath(location.pathname))
		if(temDomain && temDomain.length > 0){
			setDomain(temDomain[0])
		}
	}

	useEffect(() => {
		getCompanyList()
	}, [])

	useEffect(() => {
		if(company){
			getCurrentOrganization()
		}
	},[company])

  return (
    <Routes>
		<Route path="/" element={<Login  />} />
		<Route path="/login" element={<Login  />} />
		<Route path="/demo/:assetId/:link" element={<SharedDemoLink />} />
		<Route path="/demo-v/:videoId/:link" element={<SharedVideoDemoLink />} />
		<Route path="/organization" element={<AdminProtectedLayout header={header} setHeader={setHeader} />} >
			<Route path=":company" element={<AdminSubRoute />} >
				{/* <Route path="dashboard" element={<Dashboard />} /> */}
				<Route path="assets" element={<AdminSubRoute />} >
					<Route path="index" element={<AdminListAsset />} />
					<Route path="grid" element={<AdminGridAsset />} />
					<Route path={`edit/:id`} element={<AdminUpdateAsset />} />
					<Route path={`model-player/:assetId`} element={<MainModelPlayer />} />
				</Route>
				<Route path={`digital-twin/:postId`} element={<DigitalTwinLayout />} />

				<Route path="video" element={<AdminSubRoute />}>
					<Route path="index" element={<AdminListVideo />} />
					<Route path="add" element={<AdminAddEditVideo />} />
					<Route path="manage/:id" element={<AdminAddEditVideo />} />
					<Route path={`video-player/:videoId`} element={<MainVideoPlayer />} />
				</Route>
							
				<Route path="category" element={<AdminSubRoute />} >
					<Route path="index/:categoryType" element={<AdminListCategory />} />
					<Route path="manage-order/:categoryType" element={<AdminManageOrder />} />
				</Route>

				<Route path="teams" element={<AdminSubRoute />}>
					<Route path="index" element={<AdminListTeam />} />
					<Route path="manage/:id" element={<ManageCompany />} />
				</Route>
				<Route path="game" element={<AdminSubRoute />}>
					<Route path="index" element={<ListAdminGame />} />
				</Route>

				<Route path="three-sixty-content" element={<AdminSubRoute />}>
					<Route path="index" element={<ListAdminThreeSixtyContent />} />
				</Route>
				
				<Route path="library" element={<Library setHeader={setHeader} />} />

				<Route path="setting" element={<Setting />} />
			</Route>
		</Route>
		<Route path="/user" element={<UserProtectedLayout header={header} setHeader={setHeader}  />} >
			<Route path="/user/" element={<Navigate to='/' replace />} />
				
			<Route path=":company" element={<AdminSubRoute />} >
				<Route path="/user/:company" element={<Navigate to='library' replace />} />
				<Route path="assets" element={<AdminSubRoute />} >
					<Route path={`model-player/:assetId`} element={<MainModelPlayer />} />
				</Route>
				<Route path="video" element={<AdminSubRoute />}>
					<Route path={`video-player/:videoId`} element={<MainVideoPlayer />} />
				</Route>
				<Route path={`digital-twin/:postId`} element={<DigitalTwinLayout />} />
				<Route path="library" element={<Library />} />
			</Route>
		</Route>
		<Route path="/site" element={<SiteProtectedLayout header={header} setHeader={setHeader}  />} >
			<Route path="/site/" element={<Navigate to='/site/digital-twin/default' replace />} />
			<Route path="/site/digital-twin/" element={<Navigate to='/site/digital-twin/default' replace />} />
			<Route path="digital-twin/:postId" element={<DigitalTwinLayout />} />
		</Route>
		<Route path="/super-admin" element={<ProtectedLayout header={header} setHeader={setHeader} />} >
			<Route path="dashboard" element={<CompanyDashboard />} />
			<Route path="company" element={<SubRoute />}>
				<Route path="add" element={<AddCompany />} />
				<Route path="index" element={<ListCompany />} />
				<Route path="manage/:id" element={<ManageCompany setHeader={setHeader} />} />
			</Route>

			<Route path="teams" element={<SubRoute />}>
				<Route path="index" element={<ListTeam />} />
			</Route>

			<Route path="games" element={<SubRoute />}>
				<Route path="index" element={<ListGame />} />
			</Route>

			<Route path="three-sixty-content" element={<SubRoute />}>
				<Route path="index" element={<ListThreeSixty />} />
			</Route>

			<Route path="assets" element={<SubRoute />} >
				<Route path="index" element={<ListAsset setHeader={setHeader} />} />
				<Route path="grid" element={<GridAsset setHeader={setHeader} />} />
				<Route path="add" element={<AddAsset />} />
				<Route path={`edit/:id`} element={<UpdateAsset />} />
				<Route path={`model-player/:assetId`} element={<MainModelPlayer />} />
			</Route>

			<Route path="video" element={<SubRoute />}>
				<Route path="index" element={<ListVideo setHeader={setHeader} />} />
				<Route path="grid" element={<GridVideo setHeader={setHeader} />} />
				<Route path="add" element={<AddEditVideo />} />
				<Route path="manage/:id" element={<AddEditVideo />} />
				<Route path={`video-player/:videoId`} element={<MainVideoPlayer />} />
			</Route>
			
			<Route path="category" element={<SubRoute />} >
				<Route path="index/:categoryType" element={<ListCategory />} />
				<Route path="manage-order/:categoryType" element={<ManageOrder />} />
			</Route>

			<Route path="library" element={<Library />} />
		</Route>
		<Route path="/*" element={<NoPageFound />}></Route>
    </Routes>
  );
};

export default AppRouter;
