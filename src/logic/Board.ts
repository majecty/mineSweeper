import * as R from "ramda";

export type Block = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "bomb";

interface RihBlockConstructorParams {
    block: Block;
    board: Board;
}

interface BlockPos {
    row: number;
    column: number;
}

interface BlockRef {
    blocks: Block[][];
    pos: BlockPos;
}

export class RichBlock {
    constructor(readonly block: Block, readonly ref: BlockRef) {
    }
}

export class Board {
    blocks: Block[][];
    constructor(readonly size: number) {
        this.blocks = R.compose(
            Board.calculateNearBombs,
            Board.createBombs,
            Board.generateBlocks)(size);
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

    static mapBlocks<T>(blocks: T[][], mapper: (block: T) => T): T[][] {
        const mapRow: (row: T[]) => T[] = R.map(mapper);
        return R.map(mapRow, blocks);
    }

    static mapBlocksIndexed<T, U>(blocks: T[][], mapper: (block: T, pos: [number, number]) => U): U[][] {
        const mapIndexed: any = R.addIndex(R.map);
        const mapRow = (rowBlocks: T[], i: number): U[] => {
            const rowMapper = (block: T, j: number) => mapper(block, [i, j]);
            return mapIndexed(rowMapper, rowBlocks);
        };
        return mapIndexed(mapRow, blocks);
    }

    static randomBlock(): Block {
        if (Math.random() < 0.5) {
            return "bomb";
        } else {
            return 0;
        }
    }

    static calculateNearBombs(blocks: Block[][]): Block[][] {
        const richBlocks = Board.toRichBlocks(blocks);
        Board.mapBlocks(richBlocks, ({ block, ref }) => {
            const count = Board.countNearBlocks(ref);
            return new RichBlock(
                count,
                ref
            );
        });
        return [];
    }

    static toRichBlocks(blocks: Block[][]): RichBlock[][] {
        const toRichBlock = (block: Block, [row, column]: [number, number]) => ({
            block,
            ref: {
                blocks,
                pos: { row, column }
            }
        });
        return Board.mapBlocksIndexed(blocks, toRichBlock);
    }

    static countNearBlocks(ref: BlockRef): Block {
        return 0;
    }
}