const UserModel = require("../models").usr;

const index = async (req, res) => {
  try {
    const dataUser = await UserModel.findAll({
      attributes: ["id", "name", "email", "status", "jenisKelamin"],
    });
    console.log(dataUser);

    return res.json({
      status: "Berhasil",
      messege: "Berikut Daftar Users",
      data: dataUser,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};

const detail = async (req, res) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;
    const dataDetail = await UserModel.findByPk(id);
    if (dataDetail === null) {
      return res.json({
        status: "Gagal",
        messege: "Data User Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "Berikut Data Detail User",
      data: dataDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};

const detailByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const users = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (users === null) {
      return res.status(200).json({
        status: "Gagal",
        msg: "Data User tidak ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      msg: "Data User ditemukan",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      status: "Gagal",
      msg: "ada Sebuah kesalahan",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await UserModel.destroy({
      where: {
        id: id,
      },
    });
    if (users === 0) {
      return res.status(200).json({
        status: "Gagal",
        msg: "Data User tidak ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      msg: "Data User ditemukan",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      status: "Gagal",
      msg: "ada Sebuah kesalahan",
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const users = await UserModel.findByPk(id);
    if (users === null) {
      return res.json({
        status: "Gagal",
        msg: "Data User tidak ditemukan",
      });
    }
    await UserModel.update(
      {
        name: name,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status : "berhasil",
      msg : "Data User berhasil diperbarui"
    })
  } catch (err) {
    console.log(error);
    return res.status(403).json({
      status: "Gagal",
      msg: "ada Sebuah kesalahan",
    });
  }
};

module.exports = { index, detail, detailByEmail, destroy, update };
