import { AdminUser } from '../schemas'
import BasicModel from './basic-model';
import bcrypt from 'bcryptjs'
import config from '../../../config';

class AdminUserModel extends BasicModel {
  async verifyPassword({password, hashPassword}) {
    return await bcrypt.compare(password, hashPassword);
  }

  async getHashPassword({password}) {
    return await bcrypt.hash(password, config.seed_length);
  }
}

module.exports = new AdminUserModel(AdminUser);
