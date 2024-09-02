import { useEffect, useState } from 'react';
import Modal from './Modal';
import { useAppDispatch } from '../redux/store';
import LoadingButton from './LoadingButton';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import Input from './Input';
import { isEmail, isMobilePhone } from 'validator';
import { loginWithPhoneNumber, useIsLoginWithPhoneNumberLoading } from '../redux/auth/loginWithPhoneNumber';
import { loginWithEmail, useIsLoginWithEmailLoading } from '../redux/auth/loginWithEmail';
import { RecaptchaVerifier } from 'firebase/auth';
import { firebaseAuth } from '@/components/firebase/firebaseAuth';
import { showToast } from '@/components/redux/toast/toastSlice';
import { useVerifyPhoneNumberLoading, verifyPhoneNumber } from '../redux/auth/verifyPhoneNumber';
import { useRouter } from 'next/router';

interface SignUpModalProps {
    open: boolean;
    setOpen: (show: boolean) => void;
}
const SignUpModal = (props: SignUpModalProps) => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [disableSubmitEmail, setDisableSubmitEmail] = useState(true);
    const [disableSubmitPhone, setDisableSubmitPhone] = useState(true);
    const isLoadingEmail = useIsLoginWithEmailLoading();
    const isLoadingPhone = useIsLoginWithPhoneNumberLoading();
    const [OTPCode, setOTPCode] = useState('');
    const [show, setShow] = useState(false);
    const verifyPhoneNumberLoading = useVerifyPhoneNumberLoading();
    const [recaptcha, setRecaptcha] = useState<RecaptchaVerifier | null>(null);
    const [recaptchaResolved, setRecaptchaResolved] = useState(false);
    const [verificationId, setVerificationId] = useState('');
    const router = useRouter();

    // Realtime validation to enable submit button
    useEffect(() => {
        setDisableSubmitEmail(!(isEmail(email) && password.length >= 6));
        setDisableSubmitPhone(!(isMobilePhone(phoneNumber) && recaptchaResolved));
    }, [email, password, phoneNumber, recaptchaResolved]);

    // Generating the recaptcha on page render
    useEffect(() => {
        const captcha = new RecaptchaVerifier(firebaseAuth, 'recaptcha-container-sign-up', {
            size: 'normal',
            callback: () => {
                setRecaptchaResolved(true);
            },
            'expired-callback': () => {
                setRecaptchaResolved(false);
                dispatch(
                    showToast({
                        message: 'Recaptcha Expired, please verify it again',
                        type: 'info',
                    })
                );
            },
        });

        captcha.render();
        setRecaptcha(captcha);
    }, [dispatch]);

    // Validating the filled OTP by user
    const ValidateOtp = async () => {
        dispatch(
            verifyPhoneNumber({
                type: 'sign-up',
                OTPCode,
                auth: null,
                verificationId,
                callback: (result) => {
                    if (result.type === 'error') {
                        return;
                    }
                    // Needed to reload auth user
                    router.reload();
                },
            })
        );
    };

    // Signup with email and password and redirecting to home page
    const signUpWithEmail = async () => {
        // verify the user email before signup
        dispatch(
            loginWithEmail({
                type: 'sign-up',
                auth: null,
                email,
                password,
                callback: (result) => {
                    if (result.type === 'error') {
                       return;
                    }
                },
            })
        );
    };

    // Signup with phone number and redirecting to home page
    const signUpWithPhoneNumber = async () => {
        // Verify the user number before signup
        dispatch(
            loginWithPhoneNumber({
                type: 'sign-up',
                phoneNumber,
                recaptcha,
                callback: (result) => {
                    if (result.type === 'error') {
                        setRecaptchaResolved(false);
                        return;
                    }
                    // Get the verification id for the OTP validation
                    setVerificationId(result.verificationId);
                    setShow(true);
                },
            })
        );
    };

    // Render the component
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
                        disabled={disableSubmitEmail}
                        loading={isLoadingEmail}
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
                    <Input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                        name="phoneNumber"
                        type="text"
                    />
                    <div id="recaptcha-container-sign-up" />
                    <LoadingButton
                        onClick={signUpWithPhoneNumber}
                        disabled={disableSubmitPhone}
                        loading={isLoadingPhone}
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

                    <Modal show={show} setShow={setShow}>
                        <div className="max-w-xl w-full bg-white py-6 rounded-lg">
                            <h2 className="text-lg font-semibold text-center mb-10">
                                Enter Code to Verify
                            </h2>
                            <div className="px-4 flex items-center gap-4 pb-10">
                                <Input
                                    value={OTPCode}
                                    type="text"
                                    placeholder="Enter your OTP"
                                    onChange={(e) => setOTPCode(e.target.value)}
                                />

                                <LoadingButton
                                    onClick={ValidateOtp}
                                    loading={verifyPhoneNumberLoading}
                                    loadingText="Verifying..."
                                >
                                    Verify
                                </LoadingButton>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </Modal>
    );
};

export default SignUpModal;
