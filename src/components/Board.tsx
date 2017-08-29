import * as R from "ramda";
import * as React from "react";
import * as logic from "../logic";

import { Block } from "../logic/Board";

interface BoardProps {
    board: logic.Board;
}

export function Board(props: BoardProps) {
    const { board } = props;

    const renderColumn = (column: Block) => {
        return (
            <div className="column">
                {column}
            </div>
        );
    };

    const renderRow = (row: Block[]) => {
        const columns = R.map(renderColumn, row);
        return (
            <div className="row">
                {columns}
            </div>
        );
    };

    return (
        <div className="board">
            Size is {board.size}
            {
                R.map(renderRow, board.getRows())
            }
        </div>
    );
}