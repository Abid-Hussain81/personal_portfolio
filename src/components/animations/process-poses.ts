type Vector = [number, number, number];

export type PiecePose = {
  position: Vector;
  size: Vector;
  color: string;
  rotation: Vector;
};

const cream = "#f3e8d4";
const sage = "#b6c6a7";
const peach = "#e8bda5";
const lavender = "#cbb7df";
const olive = "#6c8973";
const lilacInk = "#8d79a6";

function pose(position: Vector, size: Vector, color: string, rotation: Vector = [0, 0, 0]): PiecePose {
  return { position, size, color, rotation };
}

// Each piece persists through scope, experience, connection, and handover.
export const processPieces = {
  foundation: [
    pose([-.38, -.37, -.47], [2.75, 1.72, .15], sage, [-.1, -.12, -.19]),
    pose([0, 0, -.34], [3.55, 2.25, .2], cream),
    pose([-1.46, -.22, -.04], [1.61, 1.46, .5], sage, [0, -.12, -.13]),
    pose([0, -.04, -.23], [3.25, 2.16, .34], sage),
  ],
  middle: [
    pose([.36, -.12, -.16], [2.75, 1.72, .15], peach, [-.1, -.1, .16]),
    pose([-.76, -.12, -.04], [1.65, 1.42, .2], peach),
    pose([1.42, .22, -.04], [1.64, 1.46, .5], lavender, [0, -.06, .11]),
    pose([0, -.04, -.025], [3.06, 1.97, .14], cream),
  ],
  mainPanel: [
    pose([.02, .24, .16], [2.71, 1.74, .19], cream, [-.1, -.1, -.045]),
    pose([.87, .33, -.055], [1.35, .57, .2], sage),
    pose([-.63, -.25, .21], [.3, .34, .22], olive),
    pose([-.67, -.07, .115], [1.48, 1.24, .15], peach),
  ],
  secondaryPanel: [
    pose([-.53, .15, .32], [1.03, .7, .045], lavender, [-.1, -.1, -.045]),
    pose([.87, -.39, -.04], [1.35, .65, .2], lavender),
    pose([.62, .23, .21], [.31, .34, .22], lilacInk),
    pose([.8, .26, .118], [1.07, .5, .15], sage),
  ],
  header: [
    pose([-.04, .8, .308], [2.1, .10, .04], olive, [-.1, -.1, -.045]),
    pose([-.74, .65, .16], [1.17, .12, .07], cream),
    pose([-1.39, .01, .248], [.91, .11, .055], cream, [0, -.12, -.13]),
    pose([-.05, .76, .09], [2.5, .12, .055], olive),
  ],
  upperLine: [
    pose([.55, .41, .32], [.77, .065, .04], olive, [-.1, -.1, -.045]),
    pose([-.78, .17, .14], [1.03, .12, .06], cream),
    pose([1.42, .39, .24], [.86, .10, .055], cream, [0, -.06, .11]),
    pose([-.64, .03, .23], [.94, .10, .06], cream),
  ],
  lowerLine: [
    pose([.45, .13, .32], [.58, .065, .04], lilacInk, [-.1, -.1, -.045]),
    pose([-.92, -.10, .14], [.76, .12, .06], cream),
    pose([1.3, .12, .25], [.64, .10, .055], cream, [0, -.06, .11]),
    pose([-.73, -.25, .23], [.75, .09, .06], cream),
  ],
  footer: [
    pose([.55, -.14, .32], [.79, .065, .04], peach, [-.1, -.1, -.045]),
    pose([.79, -.4, .11], [.68, .09, .06], cream),
    pose([-1.53, -.28, .27], [.63, .10, .055], cream, [0, -.12, -.13]),
    pose([.65, -.32, .085], [.8, .09, .055], lilacInk),
  ],
} satisfies Record<string, readonly PiecePose[]>;
