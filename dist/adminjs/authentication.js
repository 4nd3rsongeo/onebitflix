import bcrypt from 'bcrypt';
import { userService } from "../services/userService.js";
import { ADMINJS_COOKIE_PASSWORD } from "../config/environment.js";
export const authenticationOptions = {
    authenticate: async (email, password) => {
        const user = await userService.findByEmail(email);
        if (user && password && user.password && (await bcrypt.compare(password, user.password))) {
            if (user.role === 'admin') {
                return user;
            }
        }
        return false;
    },
    cookiePassword: ADMINJS_COOKIE_PASSWORD
};
