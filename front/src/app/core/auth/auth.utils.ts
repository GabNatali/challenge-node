import {jwtDecode} from "jwt-decode";

export class AuthUtils {
  static isTokenExpired(token:string) {
    try {
      const payload = jwtDecode(token);
      if (!payload.exp) return true;
      return Date.now() >= payload.exp * 1000;
    } catch (e) {
      return true;
    }
  }
}

