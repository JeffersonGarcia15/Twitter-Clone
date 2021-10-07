import Home from '../Auth/Home'
import Error404 from '../Auth/Error404'
import User from '../Auth/User'
import Users from '../Auth/Users'

export default [
    {
        path: "/users",
        exact: true,
        page: Users
    },
    {
        path: "/:id",
        exact: true,
        page: User
    },
    {
        path: "/",
        exact: true,
        page: Home
    },
    {
        path: '*',
        page: Error404
    }
]