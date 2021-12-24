import axios, { AxiosInstance } from "axios";
import { responseData } from "../../utils/commonTypes";

const users = axios.create({
  baseURL: "https://api.github.com/users/",
});

const repos = axios.create({
  baseURL: "https://api.github.com/repos/",
});

const orgs = axios.create({
  baseURL: "https://api.github.com/orgs/",
});

const rateLimit = axios.create({
  baseURL: "https://api.github.com/rate_limit",
});

const validSearchs = {
  searchRepos: repos,
  searchUsers: users,
  searchOrgs: orgs,
};

const getData = async (currentSearch: string, search: string) => {
  const api: AxiosInstance = validSearchs[currentSearch];
  return (await api.get(search)) as responseData;
};

export const api = {
  getData,
  rateLimit,
};
