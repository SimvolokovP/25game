import { Button, Divider, Modal } from "antd";
import GameTable from "../../components/GameTable/GameTable";
import TimeCounter from "../../components/TimeConuter/TimeConuter";
import { useEffect, useState } from "react";
import { generateRandomNumbers } from "../../helpers/generateRandomNumbers";
import { useNavigate } from "react-router-dom";
import useRecordStore from "../../store/useRecordStore";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import TelegramNavigation from "../../components/TelegramNavigation/TelegramNavigation";

const GamePage = () => {
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<string>("0.00");

  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { updateUserRecord, currentUser } = useRecordStore();

  const navigate = useNavigate();

  useEffect(() => {
    const randomArray = generateRandomNumbers();
    setRandomNumbers(randomArray);
  }, []);

  const handleClick = (clickedNumber: number) => {
    if (clickedNumber === currentNumber) {
      setCurrentNumber((prev) => prev + 1);

      if (currentNumber >= 25) {
        console.log("win!");
        setIsGameOver(true);
        showModal();
      }
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const updateRecord = async (resultAsNumber: number) => {
    setIsLoading(true);
    await updateUserRecord(resultAsNumber);
    setIsLoading(false);
  };

  const onOk = async () => {
    setCurrentNumber(1);
    setIsStart(false);
    setGameResult("0.00");
    setIsGameOver(false);
    const randomArray = generateRandomNumbers();
    setRandomNumbers(randomArray);
    hideModal();

    const resultAsNumber = parseFloat(gameResult);

    if (currentUser && resultAsNumber < currentUser?.record) {
      await updateRecord(resultAsNumber);
    }
  };

  const onCancel = async () => {
    navigate("/");
    const resultAsNumber = parseFloat(gameResult);
    if (currentUser && resultAsNumber < currentUser?.record) {
      await updateRecord(resultAsNumber);
    }

    hideModal();
  };

  const handleStart = () => setIsStart(true);

  return (
    <TelegramNavigation isMainPage={false}>
      <>
        {isLoading && <LoadingScreen />}
        <div className="game-page">
          {currentNumber <= 25 && (
            <div style={{ fontSize: "24px" }}>{currentNumber}</div>
          )}
          <Divider orientation="center"></Divider>
          <GameTable
            isStart={isStart}
            onClick={handleClick}
            numbers={randomNumbers}
          />
          {!isStart && <Button onClick={handleStart}>Start</Button>}
          <TimeCounter
            isStart={isStart}
            isGameOver={isGameOver}
            gameResult={gameResult}
            setGameResult={setGameResult}
          />
        </div>
        <Modal
          title="Game Over!"
          open={open}
          onOk={onOk}
          onCancel={onCancel}
          okText="Restart"
          cancelText="To Home"
          closable={false}
        >
          <p>Your result: {gameResult}</p>
        </Modal>
      </>
    </TelegramNavigation>
  );
};

export default GamePage;
