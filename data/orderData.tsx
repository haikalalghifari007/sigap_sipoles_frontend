import { ImageSourcePropType } from 'react-native';

// Static order data (without `theme` context)
export type carouselItemType = {
  image: ImageSourcePropType;
  title: string;
  dueDate: string;
  address: string;
  backgroundColor: string;
};

export const carouselItems = [
  {
    title: "Power Pole Large",
    dueDate: "22 September 2024",
    address: "Jl. Lempongsari No.353, Sariharjo, Kec. Ngaglik, Kab. Sleman, Daerah Istimewa Yogyakarta 55581",
    backgroundColor: '#FFEDCA', // Use a default color here
    image: require('../assets/images/recently.png'),
  },
  {
    title: "Power Pole Medium",
    dueDate: "18 October 2024",
    address: "Jl. Diponegoro No.45, Jakarta 11220",
    backgroundColor: '#FBE3C8', // Use a default color here
    image: require('../assets/images/recently.png'),
  },
  {
    title: "Power Pole Small",
    dueDate: "5 November 2024",
    address: "Jl. Malioboro No.100, Yogyakarta 55213",
    backgroundColor: '#FFF3D4', // Use a default color here
    image: require('../assets/images/recently.png'),
  },
  {
    title: "Power Pole Extra",
    dueDate: "30 November 2024",
    address: "Jl. Sudirman No.89, Bandung 40141",
    backgroundColor: '#FFEEBB', // Use a default color here
    image: require('../assets/images/recently.png'),
  },
  {
    title: "Power Pole Slim",
    dueDate: "15 December 2024",
    address: "Jl. Ahmad Yani No.23, Surabaya 60234",
    backgroundColor: '#FFE5B1', // Use a default color here
    image: require('../assets/images/recently.png'),
  },
  {
    title: "Power Pole Compact",
    dueDate: "5 January 2025",
    address: "Jl. Thamrin No.12, Jakarta 10310",
    backgroundColor: '#FFF1C1', // Use a default color here
    image: require('../assets/images/recently.png'),
  },
];
