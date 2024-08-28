import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TestSuiteJSONFileInGithub =
    | {
          type: 'not-loaded';
      }
    | {
          type: 'exists';
          jsonContents: string;
          sha: string;
          isCommittingToGithub: boolean;
      }
    | {
          type: 'does-not-exist';
          isCommittingToGithub: boolean;
      }
    | {
          type: 'failed';
          errorMessage: string;
      };

export interface GithubRepo {
    id: number;
    url: string;
    updated_at: string | null;
    owner: {
        avatar_url: string | null;
    };
    name: string;
}

export interface GithubOrg {
    /**
     * This is the org name
     */
    login: string;
    id: number;
    url: string;
    avatar_url: string;
    repoIds: number[] | null;
}

export interface GithubState {
    accessToken: string | null;
    orgs: GithubOrg[] | null;
}

const initialState: GithubState = {
    accessToken: null,
    orgs: null,
};

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<{ accessToken: string | null }>) => {
            state.accessToken = action.payload.accessToken;
        },

        setOrgs: (state, action: PayloadAction<{ orgs: Omit<GithubOrg, 'repos'>[] | null }>) => {
            state.orgs =
                action.payload.orgs?.map((org) => {
                    const existingRepoIds =
                        state.orgs?.find((x) => x.id === org.id)?.repoIds ?? null;
                    return {
                        ...org,
                        repos: existingRepoIds,
                    };
                }) ?? null;
        },
    },
});

export const githubActions = githubSlice.actions;

export const githubReducer = githubSlice.reducer;
