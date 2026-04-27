import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find({ isActive: true }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productModel.findOne({ slug, isActive: true }).exec();
    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async seed(): Promise<{ message: string }> {
    const existing = await this.productModel.findOne({ slug: 'apex-01' }).exec();
    if (!existing) {
      await this.productModel.create({
        name: 'Apex-01 Professional Clipper',
        slug: 'apex-01',
        description: 'Professional-grade hair clipper designed for precision cutting. Features ultra-sharp blades, powerful motor, and ergonomic design for comfortable handling.',
        price: 89.99,
        comparePrice: 129.99,
        images: [
          'https://extracted-images.crosswire.me/files/1dc2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a6/1699682478498_0.png',
          'https://extracted-images.crosswire.me/files/1dc2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a6/1699682480968_1.png',
          'https://extracted-images.crosswire.me/files/1dc2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a6/1699682482778_2.png',
          'https://extracted-images.crosswire.me/files/1dc2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a6/1699682484598_3.png',
        ],
        features: [
          'Ultra-sharp stainless steel blades',
          'Powerful 15,000 RPM motor',
          'Ergonomic lightweight design',
          'Adjustable cutting lengths (0.5mm - 25mm)',
          'Cordless with 90-minute battery life',
          'USB fast charging',
          'Silent operation technology',
        ],
        isActive: true,
        sku: 'APX-01-CLP',
        category: 'Clippers',
      });
      return { message: '✅ Sample product seeded' };
    }
    return { message: 'ℹ️ Product already exists' };
  }
}