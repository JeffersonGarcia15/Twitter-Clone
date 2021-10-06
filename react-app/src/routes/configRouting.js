import Home from '../Auth/Home'
import Error404 from '../Auth/Error404'
import User from '../Auth/User'

export default [
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