import * as crypto from 'crypto';

export interface JwtPayload {
  username: string;
  roles: string[];
  exp: number;
  iat: number;
  sub?: string;
}

export class JwtUtil {
  private static readonly secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  private static readonly refreshSecret = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production';

  /**
   * Base64 URL encode
   */
  private static base64UrlEncode(str: string): string {
    return Buffer.from(str)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  /**
   * Base64 URL decode
   */
  private static base64UrlDecode(str: string): string {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
      str += '=';
    }
    return Buffer.from(str, 'base64').toString('utf-8');
  }

  /**
   * Create HMAC SHA256 signature
   */
  private static sign(data: string, secret: string): string {
    return crypto
      .createHmac('sha256', secret)
      .update(data)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  /**
   * Create JWT access token
   */
  static createAccessToken(username: string, userId: string, roles: string[] = ['admin']): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const now = Math.floor(Date.now() / 1000);
    const payload: JwtPayload = {
      username,
      sub: userId,
      roles,
      iat: now,
      exp: now + (24 * 60 * 60), // 24 hours
    };

    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
    const signature = this.sign(`${encodedHeader}.${encodedPayload}`, this.secret);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  /**
   * Create JWT refresh token
   */
  static createRefreshToken(username: string, userId: string): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      username,
      sub: userId,
      type: 'refresh',
      iat: now,
      exp: now + (7 * 24 * 60 * 60), // 7 days
    };

    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
    const signature = this.sign(`${encodedHeader}.${encodedPayload}`, this.refreshSecret);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  /**
   * Verify and decode JWT access token
   */
  static verifyAccessToken(token: string): JwtPayload {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const [encodedHeader, encodedPayload, signature] = parts;
    const expectedSignature = this.sign(`${encodedHeader}.${encodedPayload}`, this.secret);

    if (signature !== expectedSignature) {
      throw new Error('Invalid token signature');
    }

    const payload = JSON.parse(this.base64UrlDecode(encodedPayload)) as JwtPayload;
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp < now) {
      throw new Error('Token expired');
    }

    return payload;
  }

  /**
   * Verify and decode JWT refresh token
   */
  static verifyRefreshToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const [encodedHeader, encodedPayload, signature] = parts;
    const expectedSignature = this.sign(`${encodedHeader}.${encodedPayload}`, this.refreshSecret);

    if (signature !== expectedSignature) {
      throw new Error('Invalid token signature');
    }

    const payload = JSON.parse(this.base64UrlDecode(encodedPayload));

    return payload;
  }

  /**
   * Decode token without verification (for debugging)
   */
  static decode(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    return {
      header: JSON.parse(this.base64UrlDecode(parts[0])),
      payload: JSON.parse(this.base64UrlDecode(parts[1])),
    };
  }
}
