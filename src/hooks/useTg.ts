import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

const useTg = () => {
  const lp = retrieveLaunchParams();

  const user = lp.tgWebAppData?.user;

  const userLang = user?.language_code;

  const platofrm = lp.tgWebAppPlatform;

  return { user, platofrm, userLang };
};

export default useTg;
