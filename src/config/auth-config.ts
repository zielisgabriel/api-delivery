import { ENV } from "../env";

export const authConfig = {
    jwt: {
        secret: ENV.JWT_SECRET,
        expiresIn: "1d",
    },
}