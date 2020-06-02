import { Http } from "@services";
import { url } from "./ApiEndpoints";

class AuthService {
  readonly storageKey: string = "jwt";
  readonly params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  public async loginWithGoogle(idToken: string): Promise<any> {
    try {
      const userHttp = new Http(this.params);
      const response = await userHttp.post(url.login, { idToken });
      if (response.status === 200) {
        localStorage.setItem(this.storageKey, response.data.accessToken);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  public isLoggedIn(): boolean {
    const jwt = localStorage.getItem(this.storageKey);
    return Boolean(jwt);
  }

  public signOut(): void {
    localStorage.setItem(this.storageKey, '');
  }

}

export default new AuthService();
export { AuthService as PureAuthService };
