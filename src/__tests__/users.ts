import axios from "axios";
import Users from "../users";

jest.mock("axios");

test("should fetch users", async () => {
  const users = [{ name: "Bob" }];
  const resp = { data: users };
  (axios.get as jest.Mock).mockResolvedValue(resp);

  await expect(Users.all()).resolves.toEqual(users);
});
