import { Admin } from '../mongo/models';

Admin.findOne({query: {}})
.then(async (doc) => {
  if (!doc) await Admin.save({data: {}});
})
