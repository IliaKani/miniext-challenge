import axios from 'axios';
import { v1APIRoute } from './v1/types/routes';

export type ExecuteApiRequestResult<Output> =
    | {
          type: 'success';
          data: Output;
          errorMessage?: string; // The latest call failed, but we have previous data that we can use.
      }
    | { type: 'error'; message: string };

interface CommonArgs {
    route: v1APIRoute;
}

interface POSTArgs<Input> extends CommonArgs {
    method?: 'POST';
    body: Input;
}

type Args<Input> = POSTArgs<Input>;

export const executeApiRequest = async <Input extends object, Output>(
    args: Args<Input>
): Promise<ExecuteApiRequestResult<Output>> => {
    try {
        const input: Input = args.body;

        const url = `${
            process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : ''
        }/api/v1?route=${encodeURIComponent(args.route)}`;

        const methodPart = {
            method: args.method ?? 'POST',
            data: input,
        };

        const response = await axios({
            ...methodPart,
            url,
            headers: {
                'Content-Type': 'text/plain',
                'user-agent': window.navigator.userAgent,
            },
        });

        if (response != null && response.status === 200) {
            const data = response.data;

            if (data.error === true) {
                throw new Error(data.message);
            } else {
                return {
                    type: 'success',
                    data,
                };
            }
        } else {
            throw new Error('Request failed. Please try again.');
        }
    } catch (e: any) {
        return {
            type: 'error',
            message: e.message,
        };
    }
};
