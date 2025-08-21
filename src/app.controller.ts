import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('debug-db')
  async debugDatabase() {
    try {
      // Test if we can connect and query
      const users = await this.prisma.user.findMany();
      
      // Check if sessions table exists by using $queryRaw instead
      let sessionCount = 0;
      try {
        const sessions: any[] = await this.prisma.$queryRaw`SELECT * FROM sessions LIMIT 5`;
        sessionCount = sessions.length;
      } catch (sessionError) {
        // Sessions table might not exist yet
        console.log('Sessions table not available:', sessionError);
      }
      
      return {
        userCount: users.length,
        sessionCount: sessionCount,
        connected: true,
        databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set'
      };
    } catch (error) {
      // Safe error handling
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        error: errorMessage,
        connected: false,
        databaseUrl: process.env.DATABASE_URL || 'Not set'
      };
    }
  }

  @Get('debug-env')
  debugEnv() {
    return {
      nodeEnv: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
      sessionSecret: process.env.SESSION_SECRET ? 'Set' : 'Not set',
      apiUrl: process.env.NEXT_PUBLIC_API_URL ? 'Set' : 'Not set'
    };
  }
}