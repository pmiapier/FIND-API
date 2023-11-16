const prisma = require(`../models/prisma`);
const { registerSchema, loginSchema } = require(`../validators/auth-validator`);
const createError = require(`../utils/create-error`);
const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
require(`dotenv`).config();
const { JWT_SECRET_KEY, EXP_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) return next(createError(error, 400));

    const check = await prisma.user.findFirst({
      where: { email: value.email }
    });
    if (check) return next(createError(`duplicateEmail`, 401));

    const checkPhone = await prisma.user.findFirst({
      where: { phoneNumber: value.phoneNumber }
    });
    if (checkPhone) return next(createError(`duplicatePhone`));

    value.password = await bcrypt.hash(value.password, 12);
    const user = await prisma.user.create({
      data: value
    });
    const userId = user.id;
    console.log('🚀 ~ file: auth-controller.js:26 ~ register ~ userId:', userId);
    const createWallet = await prisma.wallet.create({
      data: {
        userId: userId,
        amount: 0
      }
    });
    console.log('🚀 ~ file: auth-controller.js:31 ~ register ~ createWallet:', createWallet);

    delete user.password;
    const payload = { userId: user.id };
    const TOKEN = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: EXP_KEY });
    res.status(200).json({ message: `done`, TOKEN, user });
    next()
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) return next(error);
    const user = await prisma.User.findFirst({
      where: { email: value.email }
    });
    if (!user) return next(createError(`user not found`, 401));
    const compare = await bcrypt.compare(value.password, user.password);
    if (!compare) return next(createError(`wrong password`, 401));

    delete user.password;
    const payload = { userId: user.id };
    const TOKEN = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: EXP_KEY });

    res.status(200).json({ message: `done`, TOKEN, user });
    // res.status(200).json({TOKEN,user})
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};

const resetPassword = async (req, res, next) => {
  const authUser = req.user;

  const { password, newPassword } = req.body;

  const user = await prisma.User.findFirst({
    where: {
      id: authUser.id
    }
  });

  if (!user) return next(createError(`user not found`, 401));
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) return next(createError(`wrong password`, 401));

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await prisma.User.update({
    where: {
      id: user.id
    },
    data: {
      password: hashedPassword
    }
  });

  res.json({ message: 'Password changed' });
};

module.exports = { register, login, me, resetPassword };
