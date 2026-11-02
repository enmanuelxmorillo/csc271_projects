
let sign = "capricorn";
let month = "december";
let day = 23;
let luckYNumber = 23.0;
let horoscopeDescription = "You are a natural leader, ambitious and disciplined. Your determination will help you achieve your goals.";
let believeInAstrology = true;
let myMoodNumber = 3;

let mySignHeading = document.getElementById("sign");
mySignHeading.textContent = sign;

let birthdayHeading = document.querySelector(".birthday");
birthdayHeading.textContent += ` ${month} ${day}`;

let luckyNumHeading = document.querySelector(".luckyNum");
luckyNumHeading.textContent += ` ${luckYNumber}`;

let paragraphs = document.getElementsByTagName("p");
paragraphs[0].textContent = horoscopeDescription;


let avgMoodRatingHeading = document.getElementById("avgMoodRating");

let angusSign = "Capricorn";
let angusMoodRating = 3;
let issacSign = "Aries";
let issacMoodRating = 3;
let avgMoodRating = (myMoodNumber + issacMoodRating + angusMoodRating) / 3;
 avgMoodRatingHeading.textContent = avgMoodRating;

 let allZodiacSigns = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
 let MyZodiacSign = allZodiacSigns[9];
 let issacZodiacSign = allZodiacSigns[0];
 let angusZodiacSign = allZodiacSigns[9];

 let allHoroscopeDescriptions = [
    "today is a day for new beginnings. Embrace change and seize opportunities.",
    "Your determination will lead to success today. Stay focused on your goals.",
    "Communication is key today. Express yourself clearly and listen to others.",
    "Trust your intuition. It will guide you in making the right decisions.",
    "Your creativity shines today. Use it to inspire and lead others.",
    "Pay attention to the details. Your meticulous work will pay off.",
    "Balance is essential. Find harmony in all aspects of your life.",
    "Embrace transformation. Let go of what no longer serves you.",
    "Adventure awaits. Explore new horizons and expand your horizons.",
    "Hard work leads to success. Keep pushing toward your goals.",
    "Your unique perspective is an asset. Share your ideas with others.",
    "Trust your emotions. They will guide you in making the right choices."
 ]
 allHoroscopeDescriptions[3] = "Your the best human alive today. Embrace your uniqueness and let your light shine.";

 paragraphs[3].textContent = `My zodiac sign is ${MyZodiacSign}, Issac's zodiac sign is ${issacZodiacSign}, and Angus's zodiac sign is ${angusZodiacSign}.`;
 paragraphs[4].textContent = `issac's horoscope description is: ${allHoroscopeDescriptions[0]}, Angus's horoscope description is: ${allHoroscopeDescriptions[9]}, and my horoscope description is: ${allHoroscopeDescriptions[3]}.`;