import User, { IUser } from "../model/userModel"

export const getAllUsers = async (page: number, limit: number) => {
    const users = await User.aggregate([
        {
            $facet: {
                metadata: [{ $count: "total" }],
                data: [
                    { $skip: (page - 1) * limit },
                    { $limit: limit },   
                ]    
            }
        }
    ])

    return {
        totalUsers: users[0].metadata[0] ? users[0].metadata[0].total : 0,
        totatlPages: users[0].metadata[0] ? Math.ceil(users[0].metadata[0].total / limit) : 0,
        page,
        limit,
        users: users[0].data
    }
}

export const getUsersBySearch = async (search: string) => {
    const regex = new RegExp(
        search.normalize('NFD').replace(/[\u0300-\u036f]/g, ''), 'i'
    ) 

    const users = await User.find({
        $or: [
            { name: { $regex: regex } },
            { lastName: { $regex: regex } }
        ]
    })

    return users
}

export const saveUser = async (newUser: IUser) => {
    const user = new User(newUser)
    await user.save()
    return user
    
}