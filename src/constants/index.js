import gql from 'graphql-tag';

export const GRAPHQL_SERVER_URL = 'http://localhost:5000/graphql';
export const GITHUB_BASE_URL = 'https://api.github.com/graphql';

export const GET_ISSUES_OF_REPOSITORY = `
    query ($organization: String!, $repository: String! $cursor: String) {
        organization(login: $organization) {
            name
            url
            repository(name: $repository) {
                id
                name
                url
                stargazers {
                    totalCount
                }
                viewerHasStarred
                issues(first: 5, after: $cursor, states: [OPEN]) {
                    edges {
                        node {
                            id
                            title
                            url
                            reactions (last: 3) {
                                edges {
                                    node {
                                        id
                                        content
                                    }
                                }
                            }
                        }
                    }
                    totalCount
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                }
            }
        }
    }
`
// export const SIGNUP_USER

export const LOGIN_USER = gql`
    query($email: String!, $password: String!) {
        authenticateUser(email: $email, password: $password) {
            _id
            token
            email
        }
    }
`
// export const AUTHENTICATE_USER

const REPOSITORY_FRAGMENT = gql `
    fragment repository on Repository {
        id
        name
        url
        descriptionHTML
        primaryLanguage {
            name
        }
        owner {
            login
            url
        }
        stargazers {
            totalCount
        }
        viewerHasStarred
        watchers {
            totalCount
        }
        viewerSubscription
    }
`

export const GET_CURRENT_USER = gql `
    {
        viewer {
            login
            name
        }
    }
`;

export const GET_REPOSITORIES_OF_CURRENT_USER = gql `
    {
        viewer {
            repositories(
                first: 5
                orderBy: { direction: DESC, field: STARGAZERS }
            ) {
                edges {
                    node {
                        ...repository
                    }
                }
            }
        }
    }
    ${REPOSITORY_FRAGMENT}
`

export const STAR_REPOSITORY = gql `
    mutation($id: ID!) {
        addStar(input: { starrableId: $id }) {
            starrable {
                id
                viewerHasStarred
            }
        }
    }
`