import { Button, Skeleton } from "antd";
import { FC } from "react";
import { DotChartOutlined } from "@ant-design/icons";

interface GameTableProps {
  onClick: (n: number) => void;
  numbers: number[];
  isStart: boolean;
}

const GameTable: FC<GameTableProps> = ({ onClick, numbers, isStart }) => {
  return (
    <>
      {isStart ? (
        <div className="game-table">
          {numbers.map((number) => (
            <Button
              onClick={() => onClick(number)}
              key={number}
              style={{ width: "60px", height: "60px", fontSize: "20px" }}
            >
              {number}
            </Button>
          ))}
        </div>
      ) : (
        <Skeleton.Node className="game-table-skeleton" active={true}>
          <DotChartOutlined style={{ fontSize: 40, color: "#bfbfbf" }} />
        </Skeleton.Node>
      )}
    </>
  );
};

export default GameTable;
