import { UserModel, IUserModel } from '.'
import { List } from 'immutable';
import { Types } from 'mongoose';

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

export const findMany = async (userIds: List<string>): Promise<List<IUserModel>> => {
    const users = await UserModel.find({
        '_id': { $in: userIds.map(id => Types.ObjectId(id)).toArray()}
    })
    let ret = List()
    users.forEach(user => {
        ret = ret.push({ ...(user.toJSON()), id: user._id})
    })
    return ret;
}