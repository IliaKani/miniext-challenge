import { useCallback, useEffect, useState } from 'react';
import Modal from './Modal';
import { useAppDispatch } from '../redux/store';
import LoadingButton from './LoadingButton';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import Input from './Input';
import { isEmail } from 'validator';
import { loginWithEmail, useIsLoginWithEmailLoading } from '../redux/auth/loginWithEmail';

interface SignUpModalProps {
    open: boolean;
    setOpen: (show: boolean) => void;
}
const SignUpModal = (props: SignUpModalProps) => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(true);
    const isLoading = useIsLoginWithEmailLoading();

    useEffect(() => {
        if (isEmail(email) && password.length >= 6) {
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
    }, [email, password]);

    // Signup with email and password and redirecting to home page
    const signUpWithEmail = useCallback(async () => {
        // verify the user email before signup
        dispatch(
            loginWithEmail({
                type: 'sign-up',
                email,
                password,
            })
        );

        /* if (credentials.user.emailVerified === false) {
                await sendEmailVerification(credentials.user);

                dispatch(
                    showToast({
                        message: 'Verification Email has been sent to your Email',
                        type: 'success',
                    })
                );
            } */

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [email, password, dispatch]);

    return (
        <Modal show={props.open} setShow={props.setOpen}>
            <div className="max-w-md w-full bg-white py-6 rounded-lg">
                <h2 className="text-lg font-semibold text-center mb-10">Sign Up</h2>
                <div className="px-4 flex p-4 pb-10 gap-4 flex-col">
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        name="email"
                        type="text"
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        name="password"
                        type="password"
                    />
                    <LoadingButton
                        onClick={signUpWithEmail}
                        disabled={disableSubmit}
                        loading={isLoading}
                    >
                        Sign Up
                    </LoadingButton>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or sign up with</span>
                        </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-3">
                        <LoginWithGoogleButton />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SignUpModal;
