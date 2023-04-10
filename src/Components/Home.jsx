import React, { useState } from "react";
import Nft from "../Data/Nft.jpg";
import homeimage from "../Data/home.jpg";


    <div className='homeimage'>
        <img src={homeimage} className="homeimage" alt="banner image" />
        </div>

const homeText = `Once upon a time, in a land far away, lived a group of cartoony and
          freaky apes. One little ape, however, was different from the rest. He
          dreamed of becoming a Crazzzy Monster, inspired by his love for horror
          movies and books. And thus, the idea for the Crazzzy Monsterzzz
          collection was born! \n
                
          This collection isn't just any ordinary art
          collection. It's a journey through nostalgia, with each monster family
          representing a different horror movie and all the equipment relative
          to that monster. With 20 monster families and more than 300 traits,
          there's a Crazzzy Monster for every fan out there. \n
          
          As a member of the Crazzzy Monsters community, 
          you'll have access to exclusive events, promotions, and giveaways. 
          You'll also have the opportunity to trade and sell your monsters, 
          connect with other collectors and enthusiasts around the world, 
          and build a truly unique collection of Crazzzy Monsters. \n
          
          The founders of Crazzzy Monsters aim to create an eco-system
          that prioritizes community, sharing benefits, and transparency. The
          collection is built on the Cronos Chain, ensuring secure and
          transparent transactions. Each Crazzzy Monster comes with unique
          utilities and royalty programs, giving you access to exclusive perks
          and rewards.`;

const Home = () => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowFullText = () => {
    setShowFullText((prev) => !prev);
  };

  const textToShow = showFullText
    ? homeText
    : homeText.split(" ").slice(0, 100).join(" ") + "...";

  const buttonText = showFullText ? "Minimize" : "Read More";
  return (
    <div className="container mx-auto h-auto">
      <div className="homeText h-screen  hidden md:flex items-center justify-center text-center ">
        <p className="text-lg w-2/3 leading-8">{homeText}</p>
      </div>

      <div className="homeText  block md:hidden text-center w-full px-6 lg:w-2/3 mx-auto  py-32 flex flex-col justify-center items-center">
        <p className="text-md md:text-lg transition-all ease-in-out">{homeText}</p>
        {/* <div>
          <button
            className="bg-secondary text-black px-4 py-2 rounded mt-4"
            onClick={toggleShowFullText}
          >
            {buttonText}
          </button>
        </div> */}
      </div>

    </div>
  );
};

export default Home;
