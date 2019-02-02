import { UserModel, IUserModel } from '.'

export const updateUserSocketId = async (userId: string, socketId: string): Promise<IUserModel> => {
    const user: IUserModel = await UserModel.findById(userId)
    if (user) {
        user.socketId = socketId
        await user.save()
    }
    return user
}

export const updateUserSessionId = async (userId: string, sessionId: string): Promise<IUserModel> => {
    const user: IUserModel = await UserModel.findById(userId)
    if (user) {
        user.sessionId = sessionId
        await user.save()
    }
    return user
}

export const resetSocketState = async (userId: string): Promise<IUserModel> => {
    const user: IUserModel = await UserModel.findById(userId)
    if (user) {
        user.sessionId = ''
        user.socketId = ''
        await user.save()
    }
    return user
}

export const getUserBySocketId = async (socketId: string): Promise<IUserModel> => {
    return await UserModel.findOne({ socketId })
}