import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { syncAuthState } from './../../redux/actions/actions'

const UserSessionManager = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(syncAuthState())
    }, [])

    return null;
}

export default UserSessionManager;