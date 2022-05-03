const db = require("../models/index");

exports.newUser = async (req, res) => {
  try {
    const check = await db.Auth.findOne({ where: { email: req.body.email } });
    if (check) {
      return res
        .status(401)
        .json({ errors: [{ message: "User already Exits" }] });
    }
    const newUser = await db.Auth.create(req.body);

    if (newUser) {
      return res.status(200).json({ errors: [{ message: "User created " }] });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

exports.newMess = async (req, res) => {
  try {
    console.log(req.body);
    const checkMess = await db.Mess.findOne({
      where: { email: req.body.email },
    });
    if (checkMess) {
      return res
        .status(401)
        .json({ errors: [{ message: "User Mess details already Exits" }] });
    } else {
      const newMessDetails = await db.Mess.create(req.body);

      if (newMessDetails) {
        return res
          .status(200)
          .json({ errors: [{ message: "Details saved succesfully " }] });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

exports.editMess = async (req, res) => {
  try {
    const { email, name, ...others } = req.body;
    console.log(name);
    const newName = await db.Auth.update(
      { name: name },
      { where: { email: email } }
    );
    const result = await db.Mess.update(
       others ,
      { where: { email: email } }
    );
    console.log(result, newName);
    if (result) {
      return res
        .status(200)
        .json({ errors: [{ message: "Details edit succesfully " }] });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

exports.getMessDetails = async (req, res) => {
  try {
    const result = await db.Mess.findAll();
    return res
      .status(200)
      .json({
        errors: [{ details: result }],
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

exports.singleMessDetails = async (req, res) => {
  try {
    const result = await db.Auth.findOne({where:{ email: req.user }});
    const messResult = await db.Mess.findOne({where:{ email: result.email }});
    console.log(messResult);
    return res.status(200).json({ errors: [{ details: messResult }] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

exports.profile = async (req, res) => {
  try {
    const result = await db.Auth.findOne({where:{ email: req.body.email }});
    const { password, ...others } = result;
    console.log(others.dataValues);
    return res.status(200).json({ errors: [{ details: others.dataValues }] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

// exports.multipleUser = async (req, res) => {
//   try {
//     for (let x in req.body.users) {
//       const newUser = await Auth(x);
//       const result = newUser.save();
//       const { name, ...others } = result._doc;
//       const messDetails = await Mess(others);
//       const messResult = messDetails.save();
//       return res
//         .status(200)
//         .json({ errors: [{ message: "Details saved succesfully" }] });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ errors: [{ message: "server error" }] });
//   }
// };
