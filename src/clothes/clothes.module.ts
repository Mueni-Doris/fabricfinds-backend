import { Module } from "@nestjs/common";
import { ClothesController } from "./clothes.controller";
import { ClothesService } from "./clothes.service";
import { PrismaService } from "../prisma/prisma.service";

@Module
({
    controllers: [ClothesController],
    providers: [ClothesService, PrismaService],

    })

    export class ClothesModule {}
