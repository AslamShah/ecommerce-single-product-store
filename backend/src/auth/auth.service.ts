import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private getAdminEmail(): string {
    return process.env.ADMIN_EMAIL || 'admin@example.com';
  }

  private getAdminPassword(): string {
    return process.env.ADMIN_PASSWORD || 'admin123';
  }

  private getAdminName(): string {
    return 'Admin';
  }

  async login(email: string, password: string) {
    const adminEmail = this.getAdminEmail();
    
    if (email !== adminEmail) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const adminPassword = this.getAdminPassword();
    if (password !== adminPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: adminEmail, sub: 'admin', role: 'admin' };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: adminEmail,
        name: this.getAdminName(),
        role: 'admin',
      },
    };
  }

  async validateUser(payload: any) {
    return {
      email: payload.email,
      sub: payload.sub,
      role: payload.role,
    };
  }

  getAdminInfo() {
    return {
      email: this.getAdminEmail(),
      name: this.getAdminName(),
      role: 'admin',
    };
  }
}