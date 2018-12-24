import { Admin } from '../schemas'
import BasicModel from './basic-model';
import bcrypt from 'bcryptjs'
import config from '../../../config';

class AdminModel extends BasicModel {

}

module.exports = new AdminModel(Admin);
