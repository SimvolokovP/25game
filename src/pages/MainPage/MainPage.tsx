import { Button } from "antd";
import { Link } from "react-router-dom";
import useTg from "../../hooks/useTg";
import { getUsername } from "../../helpers/getUsername";
import useRecordStore from "../../store/useRecordStore";
import { useEffect } from "react";
import TelegramNavigation from "../../components/TelegramNavigation/TelegramNavigation";

const MainPage = () => {
  const { user } = useTg();
  const { currentUser } = useRecordStore();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <TelegramNavigation isMainPage={true}>
      <div className="main-page">
        <div className="greeting">
          <div className="greeting__title">25!</div>
          {user && (
            <div>
              {getUsername(user)} //{" "}
              {currentUser?.record === 1000
                ? "Not Record"
                : currentUser?.record}
            </div>
          )}
        </div>
        <Link to={"/game"}>
          <Button>Start Game</Button>
        </Link>
        <Link to={"/leaderboard"}>
          <Button type="primary">Leaderboard</Button>
        </Link>
      </div>
    </TelegramNavigation>
  );
};

export default MainPage;
