import { tesloAPI } from "../../config/api/tesloAPI"
import { User } from "../../domain/entities/user"
import type { AuthResponse } from "../../infraestructure/interfaces/auth.responses"

const returnUserToken = (data: AuthResponse) => {

    const user: User = {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        isActive: data.isActive,
        roles: data.roles,
    }

    return {
        user: user,
        token: data.token
    }
}

export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase();
    try {
        const { data } = await tesloAPI.post<AuthResponse>('/auth/login', {
            email, password
        })

        return returnUserToken(data);

    } catch (error) {
        // console.log(tesloAPI.getUri())
        // console.log(tesloAPI.defaults.baseURL)
        console.log(error)
        return null
    }

}