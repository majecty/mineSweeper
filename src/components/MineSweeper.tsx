import * as React from "react";
import * as logic from "../logic";

import { Board } from "./Board";

interface MineSweeperState {
    board: logic.Board;
}

export class MineSweeper extends React.Component<{}, MineSweeperState>{
    constructor() {
        super();

        this.state = {
            board: new logic.Board(10)
        };
    }

    render() {
        const { board } = this.state;
        return (
            <Board board={board} />
        );
    }
}