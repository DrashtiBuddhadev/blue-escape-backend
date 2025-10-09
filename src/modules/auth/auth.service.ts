import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { JwtUtil } from './utils/jwt.util';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    // Create default admin user if it doesn't exist
    await this.createDefaultAdminUser();
  }

  private async createDefaultAdminUser() {
    const adminExists = await this.userRepository.findOne({
      where: { username: 'admin' },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('luxurytravelmadeeasy', 10);
      const admin = this.userRepository.create({
        username: 'admin',
        password: hashedPassword,
        active: true,
      });
      await this.userRepository.save(admin);
      console.log('✅ Default admin user created successfully');
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username, active: true },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const roles = ['admin'];

    // Create access token using custom JWT utility
    const accessToken = JwtUtil.createAccessToken(user.username, user.id, roles);
    return {
      access_token: accessToken,
      username: user.username,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      // Verify refresh token signature and extract payload
      const payload = JwtUtil.verifyRefreshToken(refreshToken);

      // Verify user still exists and is active
      const user = await this.userRepository.findOne({
        where: { username: payload.username, active: true },
      });

      if (!user) {
        throw new UnauthorizedException('User not found or inactive');
      }

      const roles = ['admin'];

      // Create new access token with updated expiry
      const accessToken = JwtUtil.createAccessToken(user.username, user.id, roles);

      return {
        access_token: accessToken,
        username: user.username
      };
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Invalid refresh token');
    }
  }

  async validateToken(token: string) {
    try {
      return JwtUtil.verifyAccessToken(token);
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Invalid token');
    }
  }
}
