// AAD Auth: Enter tenant, clientId, endpoint URI and GUID to enable authentication.
// 1. Register web app
// 2. Redirect URI: e.g. http://localhost:5000/auth
// 3. Manifest -> "oauth2AllowImplicitFlow": true
// 4. Authentication -> Implicit grant -> ID tokens
export const environment = {
    production: false,
    authorsUrl: "http://localhost:8081/api/authors",
    adalConfig: <adal.Config> {
        tenant: '', // Azure AD tenant ID (GUID).
        clientId: '00000000-0000-0000-0000-000000000000', // Azure App ID (App Registration).
        endpoints: {
            //'<URL_TO_BE_GUARDED_BY_INTERCEPTION>': '<AAD_APP_ID>'
            'https://graph.microsoft.com': '00000003-0000-0000-c000-000000000000',
            //'http://localhost:8081/api/authors': '00000000-0000-0000-0000-000000000000',
        },
    },
};