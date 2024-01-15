import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './models/product.module';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/online'), 
    ProductModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
