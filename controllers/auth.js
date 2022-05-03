const Auth = require("../models/auth");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/email");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const { v4: uuidv4 } = require("uuid");
exports.register = async (req, res) => {
  try {
    const checkUser = await db.Auth.findOne({
      where: { email: req.body.email },
    });
    console.log(checkUser.dataValues.password);
    if (checkUser) {
      if (checkUser.emailVerification) {
        console.log(checkUser);
        return res.status(409).json({
          errors: [{ message: "User already registred" }],
        });
      } else {
        console.log(checkUser.password);
        if (checkUser.password !== null) {
          return res.status(409).json({
            errors: [{ message: "User already registred" }],
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hasedPass = await bcrypt.hash(req.body.password, salt);
          req.body.password = hasedPass;
          const newId = uuidv4();
          const updateUser = await db.Auth.update(
            {
              password: hasedPass,
              token: newId,
            },
            {
              where: {
                email: req.body.email,
              },
            }
          );

          console.log(updateUser);
          const link = `${process.env.URL}api/auth/verifyemail/${req.body.email}/${newId}`;
          console.log(link);
          sendEmail(
            req.body.email,
            "verify email",
            `<h1>verify your email <a href=${link} > click to verify</a></h1>`
          );

          return res
            .status(200)
            .json({ errors: [{ message: "Please verify your email" }] });
        }
      }
    } else {
      return res.status(404).json({
        errors: [{ message: "No record found please contact mess admin" }],
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

exports.verifyEmail = async (req, res) => {
  const { email, token } = req.params;
  try {
    const data = await db.Auth.findOne({ where: { email: email } });
    if (data.verification) {
      return res
        .status(401)
        .json({ errors: [{ message: "You are already verified" }] });
    } else {
      if (data.token === token) {
        const user = await db.Auth.update(
          { emailVerifiation: true },
          {
            where: {
              email: email,
            },
          }
        );
        console.log(user);
        if (!user) {
          return res
            .status(401)
            .json({ errors: [{ message: "could not verify " }] });
        }
        return res
          .status(200)
          .json({ errors: [{ message: "You are verified" }] });
      } else {
        return res.status(401).json({ errors: [{ message: "Invalid link" }] });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

exports.autoLogin = async (req, res) => {
  if (req.user) {
    const sendData = await db.Auth.findOne({where:{ email: req.user }});
    if (sendData) {
      const { password, ...others } = sendData;
      return res.status(200).json({ useData: others .dataValues});
    } else {
      return res
        .status(401)
        .json({ errors: [{ message: "Invalid Credentials" }] });
    }
  } else {
    return res
      .status(401)
      .json({ errors: [{ message: "Invalid Credentials" }] });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await db.Auth.findOne({ where: { email: req.body.email } });
   
    if (result) {
      const validate = await bcrypt.compare(req.body.password, result.password);
      if (validate) {
        console.log(result);
        if (result.emailVerifiation) {
          const { password, ...others } = result;
          const token = jwt.sign(
            { email: result.email },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
          );
          return res
            .status(200)
            .json({ useData: others.dataValues, token: token });
        } else {
          return res
            .status(401)
            .json({ errors: [{ message: "Verify email" }] });
        }
      } else {
        return res
          .status(401)
          .json({ errors: [{ message: "Invalid Credentials" }] });
      }
    } else {
      return res
        .status(401)
        .json({ errors: [{ message: "Invalid Credentials" }] });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};
