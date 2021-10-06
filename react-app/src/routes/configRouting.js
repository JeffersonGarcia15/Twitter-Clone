import Home from '../Auth/Home'
import Error404 from '../Auth/Error404'

export default [
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