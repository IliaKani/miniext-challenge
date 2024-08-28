export type v1APIHandler<Input, Output> = (input: Input) => Promise<Output>;
