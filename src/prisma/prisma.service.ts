import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

 // ✅ since you customized the output

 @Injectable()
 export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
   async onModuleInit() {
     await this.$connect(); // 🟢 connects to the DB when your app starts
   }
 
   async onModuleDestroy() {
     await this.$disconnect(); // 🔴 disconnects when your app shuts down
   }
 }
 