import { XCircleIcon } from '@heroicons/react/24/solid';

const ErrorMessage = (props: { errorMessage: string }) => {
    return (
        <div className="p-4 rounded-md bg-red-50">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{props.errorMessage}</h3>
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;
