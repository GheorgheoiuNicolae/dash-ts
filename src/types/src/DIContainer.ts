
export interface DIContainer {
  config: {
    apiHost: string;
    basePath: string;
    auth: {
      oauth2: {
        access_token: string;
        expires_in: number;
        scope: string;
        refresh_token: string;
      };
      jwt: string;
      powerUser: string;
      edit: string;
      customerId: number;
      sessionId: number;
      role: string;
    };
  };
}
