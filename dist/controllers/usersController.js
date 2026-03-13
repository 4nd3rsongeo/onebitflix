import { userService } from "../services/userService.js";
export const usersController = {
    //GET /users/current/watching
    watching: async (req, res) => {
        const { id } = req.user;
        try {
            const watching = await userService.getKeepWatchingList(id);
            return res.json(watching);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    //GET /users/current
    show: async (req, res) => {
        const currentUser = req.user;
        try {
            return res.json(currentUser);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    //PUT /users/current
    update: async (req, res) => {
        const { id } = req.user;
        const { firstName, lastName, phone, email, birth } = req.body;
        try {
            const updatedUser = await userService.update(id, {
                firstName,
                lastName,
                phone,
                email,
                birth
            });
            return res.json(updatedUser);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    //PUT /users/current/password
    updatedPassword: async (req, res) => {
        const user = req.user;
        const { currentPassword, newPassword } = req.body;
        user.checkPassword(currentPassword, async (err, isSame) => {
            try {
                if (err)
                    return res.status(400).json({ message: err.message });
                if (!isSame)
                    return res.status(400).json({ message: "Senha incorreta" });
                await userService.updatePassword(+user.id, newPassword);
                return res.status(204).send();
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).json({ message: err.message });
                }
            }
        });
    }
};
