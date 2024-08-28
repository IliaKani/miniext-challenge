import { useAppDispatch } from '../redux/store';
import { logout } from '../redux/auth/logOut';

export default function Logout() {
    const dispatch = useAppDispatch();
    const loggedOut = async () => {
        try {
            dispatch(logout());
        } catch (error) {
            console.log(error, 'error while logout');
        }
    };
    return (
        <button
            onClick={loggedOut}
            className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
        >
            Logout
        </button>
    );
}
