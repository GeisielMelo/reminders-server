import bcrypt from 'bcryptjs';

export const createPasswordHash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 8, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const checkPassword = (user, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
