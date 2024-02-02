import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getCartRequest } from "../../redux/actions/actions";

function CartSessionManager() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (user != null) {
            dispatch(getCartRequest())
            dispatch(getCart())
        } else {
            dispatch(clearCart())
        }
    }, [user])

    return null;
}

export default CartSessionManager;