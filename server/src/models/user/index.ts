import { Document, Schema, Model, model } from 'mongoose'

export type IUser = {
    username: String,
    password: String,
    socketId: String,
    sessionId: String,
}
export interface IUserModel extends IUser, Document {

}
export const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true, },
    password: { type: String, required: true, unique: false, },
    socketId: { type: String, required: false, unique: false, },
    sessionId: { type: String, required: false, unique: false, },
    createdAt: Date,
    updatedAt: Date,
})

UserSchema.pre('save', function(next: any) {
    const currentDate = new Date()
    this.updatedAt = currentDate
    if (!this.createdAt) this.createdAt = currentDate
    next()
})

export const USER = 'User'
export const UserModel: Model<IUserModel> = model<IUserModel>(USER, UserSchema)
