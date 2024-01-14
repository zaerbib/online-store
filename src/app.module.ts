import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:2701/online')],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
