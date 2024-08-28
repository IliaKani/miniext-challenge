/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import { GoogleAuthProvider } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ToastBox from '@/components/ui/ToastBox';
import { useAppDispatch } from '@/components/redux/store';
import { useAuth } from '@/components/useAuth';
import Spinner from '@/components/Spinner';
import LoginWithGoogleButton from '@/components/ui/LoginWithGoogleButton';
import Input from '@/components/ui/Input';
import LoadingButton from '@/components/ui/LoadingButton';
import SignUpModal from '@/components/ui/SignUpModal';
import { loginWithEmail, useIsLoginWithEmailLoading } from '@/components/redux/auth/loginWithEmail';
import { LoadingStateTypes } from '@/components/redux/types';

export const googleLoginProvider = new GoogleAuthProvider();

const LoginPage: NextPage = () => {
    const dispatch = useAppDispatch();
    const auth = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(true);
    const isLoading = useIsLoginWithEmailLoading();

    const [showRegistration, setshowRegistration] = useState(false);
    const router = useRouter();

    // Realtime validation to enable submit button
    useEffect(() => {
        if (email && password.length >= 6) {
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
    }, [email, password]);

    // Signing in with email and password and redirecting to home page
    const signInWithEmail = useCallback(async () => {
        await dispatch(
            loginWithEmail({
                type: 'login',
                email,
                password,
            })
        );
    }, [email, password, dispatch]);

    if (auth.type === LoadingStateTypes.LOADING) {
        return <Spinner />;
    } else if (auth.type === LoadingStateTypes.LOADED) {
        router.push('/');
        return <Spinner />;
    }

    return (
        <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        className="w-auto h-12 mx-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="max-w-xl w-full rounded overflow-hidden shadow-lg py-2 px-4">
                    <div className="flex gap-4 mb-5 flex-col">
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
                            onClick={signInWithEmail}
                            disabled={disableSubmit}
                            loading={isLoading}
                        >
                            Sign In
                        </LoadingButton>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Or login with</span>
                            </div>
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-3">
                            <LoginWithGoogleButton />
                        </div>
                        <div className="mt-6">
                            <div className="flex justify-center">
                                <div className="relative flex justify-center text-sm">
                                    <div className="font-small text-black-400">
                                        Don&apos;t have an account?
                                    </div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <div
                                        onClick={() => setshowRegistration(true)}
                                        className="ml-2 cursor-pointer font-medium text-violet-600 hover:text-violet-400"
                                    >
                                        Sign Up
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SignUpModal open={showRegistration} setOpen={setshowRegistration} />
                </div>
            </div>
            <ToastBox />
        </div>
    );
};

export default LoginPage;
