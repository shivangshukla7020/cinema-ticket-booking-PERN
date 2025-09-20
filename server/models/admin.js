const Admin = (sequelize, DataTypes) => {
  const AdminModel = sequelize.define(
    'Admin',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      avatar: DataTypes.TEXT,
    },
    {}
  );

  AdminModel.associate = function () {};

  return AdminModel;
};

export default Admin;
