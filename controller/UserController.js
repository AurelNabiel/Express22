const UserModel = require("../models").usr;
const bcrypt = require("bcrypt");
const { promise } = require("bcrypt/promises");
const { Op } = require("sequelize");

const index = async (req, res) => {
  try {
    let { keyword , page, pageSize,orderBy,sortBy } = req.query;
   

    const dataUser = await UserModel.findAll({
      attributes: ["id", ["name", "nama"], "email", "status", "jenisKelamin"],
      where: {
        // [Op.or] :{
        //   name : name,
        //   id : 3
        // }
        // name : {
        //   [Op.eq] : name
        // }
        // name : {
        //   [Op.ne] : name
        // }
        // id : {
        //   [Op.gt] : 3
        // }
        //   name : {
        //     [Op.like] : "%una"
        //   }
        [Op.or]: [
          {
            name: {
              [Op.like]: `${keyword}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            jeniskelamin: {
              [Op.like]: `${keyword}%`,
            },
          },
        ],
      },
      limit : pageSize, //banyak data yang ditampilkan
      offset : page, //mulai dari +1
      order : [[sortBy,orderBy]] // untuk mengurutkan data
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
      status: "berhasil",
      msg: "Data User berhasil diperbarui",
    });
  } catch (err) {
    console.log(error);
    return res.status(403).json({
      status: "Gagal",
      msg: "ada Sebuah kesalahan",
    });
  }
};

async function createMany(req, res) {
  let { payload } = req.body;
  for (i = 0; i < payload.length; i++) {
    payload[i].password = await bcrypt.hashSync(payload[i].password, 10);
  }

  try {
    // await UserModel.bulkCreate(payload);
    let countBerhasil = 0;
    let countGagal = 0;
    await promise.all(
      payload.map(async (data) => {
        try {
          await UserModel.create(data);
          countBerhasil = countBerhasil + 1;
        } catch (err) {
          countGagal = countGagal + 1;
        }
      })
    );

    return res.status(201).json({
      status: "Berhasil",
      messege: "User Berhasil Ditambahkan",
      status: `Berhasil menambahkan ${countBerhasil} data dan gagal ${countGagal} data`,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
}

module.exports = { index, detail, detailByEmail, destroy, update, createMany };
