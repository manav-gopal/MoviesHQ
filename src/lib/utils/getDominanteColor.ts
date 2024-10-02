import {
  useState,
  useEffect,
  type SetStateAction,
  type Dispatch,
  useRef,
} from "react";

// Helper function to resize the image and draw on canvas
const resizeImage = (
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  maxWidth: number,
  maxHeight: number,
) => {
  const ctx = canvas.getContext("2d");
  let { width, height } = img;

  if (width > height) {
    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width *= maxHeight / height;
      height = maxHeight;
    }
  }

  canvas.width = width;
  canvas.height = height;
  ctx?.drawImage(img, 0, 0, width, height);
};

// Helper function to get the color key
const getColorKey = (r: number, g: number, b: number) =>
  [Math.round(r / 20), Math.round(g / 20), Math.round(b / 20)].join("-");

// Helper function to calculate average RGB
const calculateAverageRGB = (colors:number[][]) => {
  const total = colors.reduce(
    (acc, color) => [acc[0]! + color[0]!, acc[1]! + color[1]!, acc[2]! + color[2]!],
    [0, 0, 0],
  );
  return total.map((sum) => Math.round(sum / colors.length));
};

// Helper function to merge similar colors
const mergeSimilarColors = (data: colors[], threshold = 10): colors[] => {
  const mergedData: colors[] = [];
  const checkedColor = new Set<number>();

  data.forEach((colorObj, index) => {
    if (!checkedColor.has(index)) {
      const similarColors: colors[] = [colorObj];

      for (let i = index + 1; i < data.length; i++) {
        const keyColor = data[i];
        if (
          keyColor &&
          Math.abs(keyColor.color[0]! - colorObj.color[0]!) <= threshold &&
          Math.abs(keyColor.color[1]! - colorObj.color[1]!) <= threshold &&
          Math.abs(keyColor.color[2]! - colorObj.color[2]!) <= threshold
        ) {
          similarColors.push(keyColor);
          checkedColor.add(i);
        }
      }

      const [r, g, b, totalCount] = similarColors.reduce(
        ([r, g, b, totalCount], obj) => [
          r + (obj.color[0] ?? 0),
          g + (obj.color[1] ?? 0),
          b + (obj.color[2] ?? 0),
          totalCount + obj.count,
        ],
        [0, 0, 0, 0],
      );

      mergedData.push({
        colorKey: similarColors[0]?.colorKey ?? "",
        color: [
          Math.round(r / similarColors.length),
          Math.round(g / similarColors.length),
          Math.round(b / similarColors.length),
        ],
        count: totalCount,
      });
    }
  });

  return mergedData.sort((a, b) => b.count - a.count); // Sort by count
};

// Image processing logic extracted into a function
const processImageColors = (
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  setColors: Dispatch<SetStateAction<colors[] | null>>,
) => {
  resizeImage(img, canvas, 100, 100); // Resize image to fit into 100x100

  const ctx = canvas.getContext("2d");
  const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData?.data;
  const colorCount:Record<string,number[][]> = {};
  const step = 10; // Sample every 10th pixel for performance

  if (data) {
    for (let i = 0; i < data.length; i += 4 * step) {
      const [r, g, b] = [data[i]!, data[i + 1]!, data[i + 2]!];
      const key = getColorKey(r, g, b);

      if (!colorCount[key]) colorCount[key] = [];
      colorCount[key].push([r, g, b]);
    }
  }

  const sortedColors = Object.entries(colorCount)
    .sort((a, b) => b[1].length - a[1].length)
    .filter(([, colorArray]) => colorArray.length >= 4)
    .map(([key, colorArray]) => ({
      colorKey: key,
      color: calculateAverageRGB(colorArray),
      count: colorArray.length,
    }));

  const mergedColors = mergeSimilarColors(sortedColors);
  setColors(mergedColors); // Update the state with the final colors
};

// The main hook to extract colors
interface colors {
  colorKey: string;
  color: number[];
  count: number;
}
const GetColorPalette = (src: string) => {
  const [colors, setColors] = useState<colors[] | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas")); // Canvas is managed here

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // For cross-origin images
    img.src = src;

    img.onload = () => {
      const canvas = canvasRef.current;
      processImageColors(img, canvas, setColors); // Process image when loaded
    };
  }, [src]);

  return colors; // Return colors directly
};

export default GetColorPalette;
