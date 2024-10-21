const date = new Date();

export const greet = (): string => {
  const hour = date.getHours();
  if (hour < 6) {
    return "Selamat Malam";
  } else if (hour < 12) {
    return "Selamat Pagi";
  } else if (hour < 15) {
    return "Selamat Siang";
  } else if (hour < 18) {
    return "Selamat Sore";
  } else {
    return "Selamat Malam";
  }
};

export default greet();
