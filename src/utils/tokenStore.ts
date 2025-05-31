import { TokenCache, TokenStore } from '@commercetools/ts-client';

export class MyTokenCache implements TokenCache {
  private myCache: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };
  private saveToken() {
    localStorage.setItem('tokenCache', JSON.stringify(this.myCache));
  }
  public get(): TokenStore {
    const stored = localStorage.getItem('tokenCache');
    if (!stored) return this.myCache;
    return JSON.parse(stored);
  }
  public set(newCache: TokenStore): void {
    Object.assign(this.myCache, newCache);
    this.saveToken();
  }
}

export const tokenStore = new MyTokenCache();
