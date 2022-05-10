import { UserType } from "../contexts/AuthContext";

const USER_KEY = "FeedbackWidgetUserKey";

const saveUser = (user: UserType) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const getUser = (): UserType | null => {
  const user = localStorage.getItem(USER_KEY);

  if (user) {
    return JSON.parse(user);
  }

  return null;
};

const deleteUser = () => {
  localStorage.removeItem(USER_KEY);
};

const clearLocalStorage = () => {
  localStorage.clear();
};

export { clearLocalStorage, deleteUser, saveUser, getUser };
