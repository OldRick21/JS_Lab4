type Point = { x: number; y: number };

function distance(x1: number, y1: number, x2: number, y2: number): number;
function distance(p1: Point, p2: Point): number;

function distance(
  arg1: number | Point,
  arg2: number | Point,
  x2?: number,
  y2?: number
): number {
  if (
    typeof arg1 === "number" &&
    typeof arg2 === "number" &&
    x2 !== undefined &&
    y2 !== undefined
  ) {
    return Math.sqrt((x2 - arg1) ** 2 + (y2 - arg2) ** 2);
  } else if (typeof arg1 === "object" && typeof arg2 === "object") {
    return Math.sqrt((arg2.x - arg1.x) ** 2 + (arg2.y - arg1.y) ** 2);
  }
  throw new Error("Неверные аргументы");
}

console.log(distance(0, 0, 3, 4));                        
console.log(distance({ x: 0, y: 0 }, { x: 3, y: 4 }));