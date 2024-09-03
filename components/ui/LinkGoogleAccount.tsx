import Image from 'next/image';
import GoogleGLogo from '@/public/statics/images/google-g-logo.svg';
import { GoogleAuthProvider, linkWithPopup } from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebaseAuth';
import { useAuth } from '../useAuth';
import { LoadingStateTypes } from '../redux/types';
import { useRouter } from 'next/router';

// Initialize GoogleAuthProvider
const googleAuthProvider = new GoogleAuthProvider();

/**
 * This component triggers a Google modal and links with a Google account.
 * @returns JSX.Element
 */
const LinkGoogleAccount = () => {
    // Get auth state and router instance
    const auth = useAuth();
    const router = useRouter();

    /**
     * This function handles the linking with Google.
     * It first checks if the auth state is loaded and if there is a current user.
     * If these conditions are met, it attempts to link with Google.
     * If an error occurs, it logs the error.
     * Finally, it reloads the router.
     */
    const handleGoogleAccountLinking = async () => {
        // Check if auth is loaded and if there is a current user
        if (auth.type !== LoadingStateTypes.LOADED || firebaseAuth.currentUser === null) return;

        try {
            // Attempt to link with Google
            await linkWithPopup(firebaseAuth.currentUser, googleAuthProvider);
        } catch (error) {
            // Log error
            console.error('Error linking with Google: ', error);
        }

        // Reload router
        router.reload();
    };

    // Render button
    return (
        <button
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
            onClick={handleGoogleAccountLinking}
        >
            <Image src={GoogleGLogo} alt="Google logo" layout="intrinsic" height={20} width={20} />
            <div className="ml-2">Google</div>
        </button>
    );
};

export default LinkGoogleAccount;
