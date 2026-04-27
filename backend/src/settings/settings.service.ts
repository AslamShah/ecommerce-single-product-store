import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings } from './schemas/settings.schema';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(@InjectModel(Settings.name) private settingsModel: Model<Settings>) {}

  async getSettings(): Promise<Settings> {
    let settings = await this.settingsModel.findOne().exec();
    
    if (!settings) {
      settings = new this.settingsModel({
        storeName: 'Apex Precision',
        storeEmail: 'sales@apexprecision.com',
        currency: 'usd',
        shippingCost: 0,
        freeShippingThreshold: 50000,
      });
      await settings.save();
    }
    
    return settings;
  }

  async updateSettings(updateSettingsDto: UpdateSettingsDto): Promise<Settings> {
    const settings = await this.getSettings();
    
    Object.assign(settings, updateSettingsDto);
    await settings.save();
    
    return settings;
  }
}