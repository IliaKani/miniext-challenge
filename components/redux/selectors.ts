import { useAppSelector } from './store';

export const useGithubAccessToken = () => {
    const accessToken = useAppSelector((state) => state.github.accessToken);
    return accessToken;
};

export const useGithubOrgs = () => {
    const githubOrgs = useAppSelector((state) => state.github.orgs);
    return githubOrgs;
};
