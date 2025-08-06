import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ClothesService } from './clothes.service';

@Controller('clothes')
export class ClothesController {
  constructor(private clothesService: ClothesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: '../public/uploads', // Ensure this path is correct relative to your backend entry point
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadClothe(
    @UploadedFile() image: Express.Multer.File,
    @Body()
    body: {
      description: string;
      price: string;
      quantity: string;
      category: string;
    },
  ) {
    const { description, price, quantity, category } = body;

    if (!image) {
      return { success: false, message: 'No image uploaded.' };
    }

    const clothe = await this.clothesService.createClothes({
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category,
      image: `/uploads/${image.filename}`,
    });

    return { success: true, message: 'Item uploaded!', clothe };
  }
}
