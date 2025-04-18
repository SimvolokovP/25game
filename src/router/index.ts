import { ComponentType } from "react";
import MainPage from "../pages/MainPage/MainPage";
import LeaderboardPage from "../pages/LeaderboardPage/LeaderboardPage";
import GamePage from "../pages/GamePage/GamePage";

interface IRoute {
  isIndex: boolean;
  path: string;
  element: ComponentType;
}

export const routes: IRoute[] = [
  { path: "/", isIndex: true, element: MainPage },
  { path: "/leaderboard", isIndex: false, element: LeaderboardPage },
  { path: "/game", isIndex: false, element: GamePage },
];
