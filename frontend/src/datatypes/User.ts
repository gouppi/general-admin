// Frontend type for User, differs from backend implementation. We hide some fields from frontend layer.

interface UserType {
    _id: string,   
    username: string,
    email: string,
    createdAt: Date,
    updatedAt: Date
}

interface UserTypePost {
    username: string,
    password: string,
    email: string
};

export type {UserType, UserTypePost};