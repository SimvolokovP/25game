import { useEffect, useState } from "react";
import TelegramNavigation from "../../components/TelegramNavigation/TelegramNavigation";
import { IRecord } from "../../models/IRecord";
import RecordService from "../../api/supabaseApi/recordsApi";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { Table } from "antd";
import { getUsername } from "../../helpers/getUsername";

interface Leader extends IRecord {
  name: string | null;
}

const LeaderboardPage = () => {
  const [leadersList, setLeadersList] = useState<Leader[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchList = async () => {
    setIsLoading(true);
    try {
      const users = await RecordService.getUsersByRecord();
      const enrichedUsers = await Promise.all(users.map(fetchUserInfo));
      setLeadersList(enrichedUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserInfo = async (user: IRecord) => {
    if (!user.tg_id) {
      return { ...user, name: null };
    }

    try {
      const response = await fetch(
        `https://api.telegram.org/bot7649292726:AAG0M3r7pS649f8kFfCqVZyNBZjpJa2Gx3c/getChat?chat_id=${user.tg_id}`
      );
      const data = await response.json();
      console.log(data);

      if (data.ok && data.result) {
        console.log(data.result);
        return { ...user, name: getUsername(data.result) || "not name" };
      } else {
        console.warn("Error fetching user info:", data.description);
        return { ...user, name: "not name" };
      }
    } catch (error) {
      console.warn("Network error:", error);
      return { ...user, name: "not name" };
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const columns = [
    {
      title: "Username",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Record",
      dataIndex: "record",
      key: "record",
    },
  ];

  return (
    <TelegramNavigation isMainPage={false}>
      <div style={{ paddingTop: "84px" }}>
        {isLoading && <LoadingScreen />}
        {!isLoading && (
          <Table
            dataSource={leadersList}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        )}
      </div>
    </TelegramNavigation>
  );
};

export default LeaderboardPage;
