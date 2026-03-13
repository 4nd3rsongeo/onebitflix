AdminJS.UserComponents = {}
AdminJS.env.NODE_ENV = "development"
import SidebarFooter from '../src/adminjs/components/CustomSidebarFooter'
AdminJS.UserComponents.SidebarFooter = SidebarFooter
import Login from '../src/adminjs/components/CustomLogin'
AdminJS.UserComponents.Login = Login
import Dashboard from '../dist/adminjs/components/Dashboard'
AdminJS.UserComponents.Dashboard = Dashboard
import UploadEditComponent from '../node_modules/@adminjs/upload/build/features/upload-file/components/UploadEditComponent'
AdminJS.UserComponents.UploadEditComponent = UploadEditComponent
import UploadListComponent from '../node_modules/@adminjs/upload/build/features/upload-file/components/UploadListComponent'
AdminJS.UserComponents.UploadListComponent = UploadListComponent
import UploadShowComponent from '../node_modules/@adminjs/upload/build/features/upload-file/components/UploadShowComponent'
AdminJS.UserComponents.UploadShowComponent = UploadShowComponent