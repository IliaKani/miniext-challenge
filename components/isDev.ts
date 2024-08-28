// NOTE(abdul): We intentionally check on both areWeTestingWithJest and isDevOnWebsite that NODE_ENV is not production.
// We do this to maximize the probability that we never have a bug here in case an ENG changes the code in the future.
export const areWeTestingWithJest =
    process.env.NODE_ENV !== 'production' && process.env.JEST_WORKER_ID != null;

export const isDev =
    process.env.NODE_ENV !== 'production' &&
    (process.env.NODE_ENV === 'development' || areWeTestingWithJest);
