import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './models/products.controller';
import { ProductService } from './models/product.service';
import { Product, ProductSchema } from './models/product.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/online'),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema}]),
    AdminModule
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductService],
  exports: [ProductService]
})
export class AppModule { }
