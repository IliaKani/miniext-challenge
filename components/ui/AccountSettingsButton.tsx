import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../useAuth';
import { Menu, Transition } from '@headlessui/react';
import { LoadingStateTypes } from '../redux/types';
import { Fragment } from 'react';
import clsx from 'clsx';
import { useAppDispatch } from '../redux/store';
import { logout } from '../redux/auth/logOut';
import Link from 'next/link';

export const accountSettingsLabel = 'account settings';
export const settingsPageName = 'Settings';
export const signOutOptionText = 'Sign Out';
/**
 * Button that is shown in the top right corner of the app bar that allows
 * the user to sign out or go to their account settings.
 */
const AccountSettingsButton = () => {
    const auth = useAuth();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    if (auth.type !== LoadingStateTypes.LOADED) return null;

    return (
        <Menu as="div" className="relative inline-block min-w-0 text-left">
            <div>
                <Menu.Button className="max-w-full flex items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none">
                    <button
                        type="button"
                        className="flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-theme-500 focus:outline-none"
                        aria-label={accountSettingsLabel}
                    >
                        <UserCircleIcon className="h-6 w-6" />
                    </button>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute z-50 mt-1 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none right-2">
                    <div className="border-b px-4 py-3 text-sm">
                        <p>{auth.user.displayName}</p>
                        <p className="font-medium">{auth.user.email}</p>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => {
                                const component = (
                                    <Link
                                        href="/settings"
                                        className={clsx(
                                            'block flex w-full items-center gap-2 whitespace-nowrap py-2 pl-4 pr-7 text-left text-sm',
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        )}
                                    >
                                        {settingsPageName}
                                    </Link>
                                );

                                return component;
                            }}
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => {
                                const component = (
                                    <button
                                        onClick={handleLogout}
                                        className={clsx(
                                            'block flex w-full items-center gap-2 whitespace-nowrap py-2 pl-4 pr-7 text-left text-sm',
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700 text-red-600'
                                        )}
                                    >
                                        {signOutOptionText}
                                    </button>
                                );

                                return component;
                            }}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default AccountSettingsButton;
