import { Disclosure } from '@headlessui/react';
import AccountSettingsButton from './AccountSettingsButton';
import Link from 'next/link';
import { LoadingStateTypes } from '../redux/types';
import { useAuth } from '../useAuth';

const Header = () => {
    const auth = useAuth();

    if (auth.type !== LoadingStateTypes.LOADED || auth.user.phoneNumber == null) return null;

    return (
        <div className="flex flex-col">
            <div className="pt-[6.5rem]" />
            <Disclosure as="header" className="fixed z-20 w-full bg-white shadow">
                {() => (
                    <div className="mx-auto max-w-7xl divide-y divide-gray-200 px-8">
                        <div className="relative flex h-16 justify-between">
                            <div className="relative z-10 flex px-2 lg:px-0">
                                <div className="flex flex-row items-center">
                                    <div className="flex flex-row items-center">
                                        <div className="flex flex-shrink-0 items-center text-gray-500 opacity-70 hover:text-gray-700 hover:opacity-100">
                                            <Link className="flex items-center" href="/">
                                                {/*  <Image
                                                        src={
                                                            MiniExtentionsLogo ??
                                                            // placeholder for testing
                                                            '/testing'
                                                        }
                                                        alt="MiniExtentions Logo"
                                                        width="30"
                                                        height="30"
                                                    /> */}
                                                <span className="ml-4 hidden text-xl font-light md:inline">
                                                    miniTeam
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 ml-4 flex items-center">
                                <div className="flex flex-row items-center space-x-4">
                                    {/* <HelpCenterAndFeedbackButtons /> */}
                                    <AccountSettingsButton />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Disclosure>
        </div>
    );
};

export default Header;
