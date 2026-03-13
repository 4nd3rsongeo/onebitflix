import { ComponentLoader } from 'adminjs';
import path from 'path';
const componentLoader = new ComponentLoader();
const ComponentsDir = path.resolve(process.cwd(), 'src', 'adminjs', 'components');
export const Components = {
    SidebarFooter: componentLoader.override('SidebarFooter', path.join(ComponentsDir, 'CustomSidebarFooter.tsx')),
    Login: componentLoader.override('Login', path.join(ComponentsDir, 'CustomLogin.tsx')),
};
export default componentLoader;
