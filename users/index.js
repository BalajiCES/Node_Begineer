import { readFile, readFileSync } from "fs";

const fileData = readFileSync(
  "./users/users.json",
  "utf-8",
  function (err, data) {
    if (err) console.log(err);
    return data;
  }
);

class Users {
  getUsers(response) {
    // readFile("./users/users.json", function (err, data) {
    //   if (err) console.log(err);
    //   response.write(data);
    //   response.end();
    // });
    response.status(200).json({
      status: "success",
      data: {
        user: JSON.parse(fileData),
      },
    });
  }

  getUsersByName(response) {
    let userObj = JSON.parse(fileData || {});
    let endUsers = userObj.users.filter((data) => {
      return data.name.includes(" ");
    });
    response.json(endUsers);
  }

  getUsersByAge(response) {
    let userObj = JSON.parse(fileData || {});
    let endUsers = userObj.users.filter((data) => {
      return data.age > 25;
    });
    response.json(endUsers);
  }

  getUsersByPlace(response) {
    let userObj = JSON.parse(fileData || {});
    let endUsers = userObj.users.filter((data) => {
      return data.city != null;
    });
    response.json(endUsers);
  }

  // Get city By params
  getCity(response, city) {
    let userObj = JSON.parse(fileData || {});
    let findUser = userObj.users.filter(
      (el) => el.city.toLowerCase() === city.toLowerCase()
    );

    console.log(findUser, "find");
    if (!findUser) {
      return response.status(404).json({
        status: "fail",
        message: "Invalid City",
      });
    }

    response.status(200).json({
      status: "success",
      data: {
        user: findUser,
      },
    });
  }
}

const user = new Users();
export { user };
