import {
    Controller,
    Get,
    Post,
    Delete,
    Patch,
    Body,
    Param,
  } from '@nestjs/common';
  import { ReportsService } from './reports.service';
  import { Decimal } from '@prisma/client/runtime/library';
  
  @Controller('reports')
  export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}
  
    // ✅ GET /reports - fetch all clothes
    @Get()
    async getAllReports() {
      const reports = await this.reportsService.getAllReports();
  
      const safeReports = reports.map((item: any) => ({
        ...item,
        price: item.price instanceof Decimal ? item.price.toNumber() : item.price,
      }));
  
      return { success: true, Reports: safeReports };
    }
  
    @Patch('update/:id')
    async updateQuantity(
      @Param('id') id: string,
      @Body() body: { quantity: number },
    ) {
      const item = await this.reportsService.getItemById(Number(id));
      if (!item) {
        return { success: false, message: 'Item not found' };
      }
    
      const updatedItem = await this.reportsService.updateQuantity(
        Number(id),
        body.quantity,
      );
    
      return {
        success: true,
        item: {
          ...updatedItem,
          price: typeof updatedItem.price === 'object' && 'toNumber' in updatedItem.price
            ? updatedItem.price.toNumber()
            : updatedItem.price,
        },
      };
    }
    
  
    // ✅ DELETE /reports/remove/:id
    @Delete('remove/:id')
    async removeItem(@Param('id') id: string) {
      await this.reportsService.removeItem(Number(id));
      return { success: true, message: 'Item removed' };
    }
  }
  