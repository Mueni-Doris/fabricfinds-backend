import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(userData: {
    email: string;
    password: string;
    full_name: string;
    phone_number: number;
    username: string;
    location: string;
    role: string; 

  }) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: userData.email.trim() },
      });

      if (existingUser) 
        return { success: false, 
          message: 'Registration failed,Email already taken 😬' };

        
      const hashedPassword = await bcrypt.hash(userData.password.trim(), 10);
      console.log('🔐 Hashed password:', hashedPassword);

      await this.prisma.user.create({
        data: {
          email: userData.email.trim(),
          password: hashedPassword,
          full_name: userData.full_name.trim(),
          phone_number: userData.phone_number,
          username: userData.username.trim(),
          location: userData.location.trim(),
          role: userData.role.trim(),
          
        },
      });

      return { success: true, message: 'User registered successfully 🎉' };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message: `❌ Registration failed: ${errorMessage}`,
      };
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: email.trim() },
      });

      if (!user) {
        return { success: false, message: '📭 Email not found' };
      }

      console.log('👉 Email:', email);
      console.log('🔐 Stored Hash:', user.password);
      console.log('🧪 Raw input password:', password);

      const fixedHash = user.password.replace(/^\$2y\$/, '$2a$');
      const isMatch = await bcrypt.compare(password.trim(), fixedHash);

      console.log('✅ Password Match:', isMatch);

      if (!isMatch) {
        return { success: false, message: '🔐 Password does not match' };
      }

      return {
        success: true,
        message: '✅ Login successful 🎊',
        user: {
          email: user.email,
          username: user.username,
          full_name: user.full_name,
          role: user.role,
          location: user.location,
          phone_number: user.phone_number,

        },
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message: ` Internal Server Error: ${errorMessage}`,
      };
    }
  }
}
