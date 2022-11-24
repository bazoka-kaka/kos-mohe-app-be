const User = require("../model/User");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const handleNewUser = async (req, res) => {
  const { fullname, email, pwd, phone } = req.body;
  if (!fullname || !email || !pwd || !phone)
    return res.status(400).json({
      message: "Fullname, email, phone number and password are required.",
    });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      email: email,
      image: {
        data: fs.readFileSync(
          path.join(__dirname, "..", "public", "img", "profile.png")
        ),
        filename: "profile.png",
        mimetype: "image/png",
      },
      phone: phone,
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
