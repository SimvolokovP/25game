import { User } from "@telegram-apps/sdk-react";

export const getUsername = (user: User) => {
  const name = user.username
    ? user.username
    : `${user.first_name} ${user?.last_name}`;

  return name.length > 12 ? name.slice(0, 6) + ".." : name;
};
