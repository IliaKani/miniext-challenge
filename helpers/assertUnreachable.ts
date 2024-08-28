export const assertUnreachable: (x: never) => never = (x) => {
    throw new Error(`Unexpected: ${x}`);
};
