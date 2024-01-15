import { Body, Controller, Get, Param, Post, Redirect, Render, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Product } from "src/models/product.schema";
import { ProductService } from "src/models/product.service";


@Controller('/admin/products')
export class AdminProductsController {
    constructor(private readonly productsService: ProductService) { }

    @Get('/')
    @Render('admin/products/index')
    async index() {
        const viewData = [];
        viewData['title'] = 'Admin Page - Admin - Online Store';
        viewData['products'] = await this.productsService.findAll();

        return {
            viewData: viewData
        }
    }

    @Post('/store')
    @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
    @Redirect('/admin/products')
    async store(@Body() body, @UploadedFile() file: Express.Multer.File) {
        const newProduct = new Product();
        newProduct.setId(await this.productsService.findHighId() + 1);
        newProduct.setName(body.name);
        newProduct.setDescription(body.description);
        newProduct.setPrice(body.price);
        newProduct.setImage(file.filename);

        await this.productsService.createOrUpdate(newProduct);
    }

    @Get('/:id')
    @Render('admin/products/edit')
    async edit(@Param('id') id: string) {
        const viewData = [];
        viewData['title'] = 'Admin Page - Edit Product - Online Store';
        viewData['product'] = await this.productsService.findOne(id);

        return {
            viewData: viewData
        };
    }

    @Post('/:id/update')
    @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
    @Redirect('/admin/products')
    async update(
        @Body() body,
        @UploadedFile() file: Express.Multer.File,
        @Param('id') id: string
    ) {
        const productToUpdate = await this.productsService.findOne(id); 
        productToUpdate.name = body.name;
        productToUpdate.description = body.description;
        productToUpdate.price = body.price;
        if (file) {
            productToUpdate.image = file.filename;
        }
        await this.productsService.createOrUpdate(productToUpdate);
    }

    @Post('/:id')
    @Redirect('/admin/products')
    remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }
}