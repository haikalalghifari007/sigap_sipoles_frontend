import { Colors } from '@/constants/Colors';
import { ImageSourcePropType } from 'react-native';

// Static order data (without `theme` context)
export type carouselItemType = {
  image: ImageSourcePropType;
  title: string;
  dueDate: string;
  status: string;
  orderId: string;
  description: string;
  address: string;
  backgroundColor: string;
  statusColor: string;
};




export const carouselItems = [
  {
    orderId: '87652476',
    title: "Power Pole Large",
    dueDate: "27 September 2024",
    address: "Jl. Lempongsari No.353, Sariharjo, Kec. Ngaglik, Kab. Sleman, Daerah Istimewa Yogyakarta 55581",
    status: "Completed",
    description: 'Installation was successful on 26/09/24.',
    statusColor: Colors.colorful.blue,
    backgroundColor: Colors.colorful.bluetr,
    image: require('../assets/images/recentlyb.png'),
  },
  {
    orderId: '87652276',
    title: "Power Pole Large",
    dueDate: "18 October 2024",
    address: "Jl. Diponegoro No.45, Jakarta 11220",
    status: "On-Going",
    description: 'In the process of shipping.',
    statusColor: Colors.colorful.yellow,
    backgroundColor: Colors.colorful.yellowtr,
    image: require('../assets/images/recentlyy.png'),
  },
  {
    orderId: '01287127',
    title: "Power Pole Medium",
    dueDate: "5 November 2024",
    address: "Jl. Malioboro No.100, Yogyakarta 55213",
    status: "In Trouble",
    description: 'Unexpected problems occurred.',
    statusColor: Colors.colorful.red, // Based on '#FC366B' from orders
    backgroundColor: Colors.colorful.redtr,
    image: require('../assets/images/recentlyr.png'),
  },
  {
    orderId: '21693837',
    title: "Power Pole Extra",
    dueDate: "30 November 2024",
    address: "Jl. Sudirman No.89, Bandung 40141",
    status: "Completed",
    description: 'Installation was successful on 20/09/24.',
    statusColor: Colors.colorful.blue, // Based on '#00ADEF' from orders
    backgroundColor: Colors.colorful.bluetr,
    image: require('../assets/images/recentlyb.png'),
  },
  {
    orderId: '09225427',
    title: "Power Pole Small",
    dueDate: "15 December 2024",
    address: "Jl. Ahmad Yani No.23, Surabaya 60234",
    status: "In Trouble",
    description: 'Got Accident.',
    statusColor: Colors.colorful.red, // Based on '#FC366B' from orders
    backgroundColor: Colors.colorful.redtr,
    image: require('../assets/images/recentlyr.png'),
  },
  {
    orderId: '5927',
    title: "Power Pole Small",
    dueDate: "5 January 2025",
    address: "Jl. Thamrin No.12, Jakarta 10310",
    status: "Unprocessed",
    description: 'Order not yet processed by vendor.',
    statusColor: Colors.colorful.purple, // Based on '#8153BC' from orders
    backgroundColor: Colors.colorful.purpletr,
    image: require('../assets/images/recentlyp.png'),
  },
];

