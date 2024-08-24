import type { Photo } from "react-photo-album";

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];


// Import images
const image1 = require('../../assets/images/image1.png');
const image2 = require('../../assets/images/image2.png');
const image3 = require('../../assets/images/image3.png');
const image4 = require('../../assets/images/image4.png');
const image5 = require('../../assets/images/image5.png');
// Sample images with true dimensions
const photos = [
   {src: image1, width: image1.width, height: image1.height, alt:"alt"},
    {src: image2, width: image2.width, height: image2.height, alt:"alt"},
    {src: image3, width: image3.width, height: image3.height, alt:"alt"},
    {src: image4, width: image4.width, height: image4.height, alt:"alt"},
    {src: image5, width: image5.width, height: image5.height, alt:"alt"},
].map(
  ({ src, alt, width, height }) =>
    ({
      src: src,
      alt,
      width,
      height,
      srcSet: breakpoints.map((breakpoint) => ({
        src: src,
        width: breakpoint,
        height: Math.round((height / width) * breakpoint),
      })),
    }) as Photo,
);

export default photos;