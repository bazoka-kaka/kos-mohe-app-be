const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { fullname, email, pwd } = req.body;
  if (!fullname || !email || !pwd)
    return res
      .status(400)
      .json({ message: "Fullname, email and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      email: email,
      fullname: fullname,
      password: hashedPwd,
    });

    console.log(result);

    res.status(201).json({ success: `New user ${fullname} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
