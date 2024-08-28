import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { hideToast } from '../redux/toast/toastSlice';

export default function ToastBox() {
    const dispatch = useAppDispatch();
    const { message, toast, type } = useAppSelector((state) => state?.toast);

    useEffect(() => {
        const timeId = setTimeout(() => {
            dispatch(hideToast());
        }, 2000);

        return () => clearTimeout(timeId);
    }, [toast, dispatch]);

    const extraStyling =
        type === 'success'
            ? 'bg-green-50 text-green-500 border-green-500'
            : type === 'info'
            ? 'bg-yellow-50 text-yellow-500 border-yellow-500'
            : 'bg-red-50 text-red-500 border-red-500';

    return (
        <div
            className={`fixed z-50 top-5 border right-2 max-w-md w-full py-2 transition-all duration-300 rounded-md px-4 ${
                toast
                    ? 'right-2 opacity-100 visible pointer-events-auto'
                    : '-right-10 invisible opacity-0 pointer-events-none'
            } ${extraStyling}`}
        >
            {message}
        </div>
    );
}
