
export const formatDate = (dateString) => {
  const parsedDate = new Date(dateString);
  return parsedDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  }).replace(/(\d{2}) (\w{3})/, (match, p1, p2) => `${parseInt(p1)} ${p2}`);
}
export const formatDateBet = (dateString) => {
  const parsedDate = new Date(dateString);
  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = String(parsedDate.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
}
export const formateTime = (dateString) => {
  const parsedDate = new Date(dateString);
  return parsedDate.toLocaleTimeString("en-GB", {
    hour: '2-digit',
    minute: '2-digit',
    second: "2-digit",
    hour12: false
  });
}

export const formateTimeBet = (dateString) => {
  const parsedDate = new Date(dateString);
  return parsedDate.toLocaleTimeString("en-GB", {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}
const names = [
  'John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 
  'Grace', 'Hank', 'Ivy', 'Jack', 'Kate', 'Leo', 'Mia', 'Nina', 
  'Oscar', 'Paul', 'Quinn', 'Rose', 'Sam', 'Tina', 'Uma', 'Vera', 
  'Will', 'Xena', 'Yara', 'Zane','vivek','rajukamal','vishwas','nimish'
];

const images = [
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529975728_av-48.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529976128_av-49.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529976371_av-60.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529976556_av-61.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529976748_av-62.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529977005_av-63.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529977218_av-9.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529977463_av-10.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529977657_av-12.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529977843_av-13.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529978029_av-14.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529978236_av-15.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529978413_av-16.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529978670_av-17.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529978895_av-28.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529979111_av-29.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529979291_av-38.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529979460_av-39.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529979700_av-58.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529979887_av-59.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529980057_av-64.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529980274_av-65.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529980483_av-66.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529980739_av-67.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529980923_av-70.png',
  'https://jaunpur123.s3.ap-south-1.amazonaws.com/1716529981135_av-71.png'


  // Add more image URLs as needed
];
 const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

 export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

 export const getRandomDummyBets = () => {
     const count = getRandomNumber(500, 3000); 
     const bets = Array.from({ length: count }, () => ({
         plane_status: 'bet',
         avatar: getRandomElement(images),
         name: getRandomElement(names),
         bet_id: `bet:${getRandomNumber(500, 20000)}:${getRandomNumber(500, 20000)}`,
         max_mult: null, 
         maxAutoCashout: null, 
         final_amount: null// Example random bet amount
     }));
 
     return { bets, count }; 
 };

export function formatBalance(amount) {
  if (amount === undefined || amount === null) return '';
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}
// REACT_APP_NEW_BACKEND_SOCKET_URL= https://api.unicon.vip/
// REACT_APP_BASE_URL= https://stats.unicon.vip/aviator
// REACT_APP_BASE_URL_CHAT = https://chat.unicon.vip
