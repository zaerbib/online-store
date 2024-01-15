import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./product.schema";
import { ProductsController } from "./products.controller";
import { ProductService } from "./product.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema}]),
    ],
    controllers: [ProductsController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule {}