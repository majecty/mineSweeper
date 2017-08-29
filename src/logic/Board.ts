import * as R from "ramda";

export type Block = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "bomb";

interface RihBlockConstructorParams {
    block: Block;
    board: Board;
}

export class RichBlok {
    constructor(readonly block: Block, readonly board: Board) {
    }
}

export class Board {
    blocks: Block[][];
    constructor(readonly size: number) {
        this.blocks = R.compose(Board.createBombs, Board.generateBlocks)(size);
    }

    getRows = (): Block[][] => {
        return this.blocks;
    }

    get = (row: number, col: number) => {
        return this.blocks[row][col];
    };

    static generateBlocks(size: number): Block[][] {
        const range = R.range(0, size);

        const rows = R.map(() => Board.generateRow(size), range);
        return rows;
    }

    static generateRow(size: number): Block[] {
        const range = R.range(0, size);
        return R.map((): Block => 0, range);
    }

    static createBombs(blocks: Block[][]): Block[][] {
        return Board.mapBlocks(blocks, Board.randomBlock);
    }

    static mapBlocks(blocks: Block[][], mapper: (block: Block) => Block): Block[][] {
        const mapRow: (row: Block[]) => Block[] = R.map(mapper);
        return R.map(mapRow, blocks);
    }

    static randomBlock(): Block {
        if (Math.random() < 0.5) {
            return "bomb";
        } else {
            return 0;
        }
    }
}