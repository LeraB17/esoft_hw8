const ApiError = require("../errors/ApiError");
const uuid = require("uuid");

class UserController {
  async getUsers(req, res) {
    return res.json({ data: usersData });
  }

  async getUser(req, res, next) {
    const { id } = req.params;

    const user = usersData.find((usr) => usr.id === id);

    if (!user) {
      return next(ApiError.notFound("Пользователь не найден"));
    }

    return res.json(user);
  }

  async createUser(req, res, next) {
    const { name, email, age } = req.body;

    if (!name) {
      return next(ApiError.teapot("Не передан обязательный параметр: name"));
    }
    if (!email) {
      return next(ApiError.teapot("Не передан обязательный параметр: email"));
    }
    if (!age) {
      return next(ApiError.teapot("Не передан обязательный параметр: age"));
    }

    const ageNumber = Number(age);

    if (!ageNumber) {
      return next(ApiError.teapot("Возраст не является числом"));
    }

    const newUser = {
      id: uuid.v4(),
      name,
      email,
      ageNumber,
    };
    usersData.push(newUser);

    return res.json(newUser);
  }

  async updateUser(req, res, next) {
    try {
      const { name, email, age } = req.body;
      const { id } = req.params;

      const user = usersData.find((usr) => usr.id === id);

      if (!user) {
        return next(ApiError.notFound("Пользователь не найден"));
      }

      const ageNumber = Number(age);

      if (!ageNumber) {
        return next(ApiError.teapot("Возраст не является числом"));
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (age) user.age = ageNumber;

      return res.json(user);
    } catch (e) {
      next(ApiError(e.message));
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = usersData.find((usr) => usr.id === id);
      if (!user) {
        return next(ApiError.notFound("Пользователь не найден"));
      }

      usersData = usersData.filter((usr) => usr.id !== id);

      return res.json(user);
    } catch (e) {
      next(ApiError(e.message));
    }
  }

  async getUsersFilteredAge(req, res, next) {
    const age = Number(req.params.age);

    if (!age) {
      return next(ApiError.teapot("Возраст не является числом"));
    }

    const usersDataFiltered = usersData.filter((user) => user.age > age);
    return res.json({ data: usersDataFiltered });
  }

  async getUsersFilteredDomain(req, res, next) {
    const { domain } = req.params;

    const usersDataFiltered = usersData.filter(
      (user) => user.email.split("@")[1] === domain
    );

    return res.json({ data: usersDataFiltered });
  }

  async getUsersSorted(req, res, next) {
    const usersDataSorted = usersData
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    res.json({ data: usersDataSorted });
  }
}

let usersData = [
  {
    id: "1",
    name: "Leanne Graham",
    email: "Sincere@mail.ru",
    age: 29,
  },
  {
    id: "2",
    name: "Ervin Howell",
    email: "Shanna@outlook.com",
    age: 39,
  },
  {
    id: "3",
    name: "Clementine Bauch",
    email: "Nathan@gmail.com",
    age: 37,
  },
  {
    id: "4",
    name: "Patricia Lebsack",
    email: "Julianne.OConner@mail.ru",
    age: 27,
  },
  {
    id: "5",
    name: "Chelsey Dietrich",
    email: "Lucio_Hettinger@gmail.com",
    age: 23,
  },
];

module.exports = new UserController();
