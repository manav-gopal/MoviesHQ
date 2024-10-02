import React from "react";
import "@/styles/components/cards/UserCard.scss";
import { type MovieCredits } from "@/types/movieDataAPI.types";
import Image from "next/image";

interface UserCardProps {
  cast: MovieCredits[];
}

function UserCard({ cast }: UserCardProps) {
  return (
    <ul className="card_wrapper">
      {cast.map((item, index) => {
        return (
          <li key={index} className="card">
            {/* Image */}
            {item.profile_path ? (
              <Image
                className="image"
                src={
                  "https://www.themoviedb.org/t/p/w240_and_h266_face/" +
                  item.profile_path
                }
                alt="Not found"
                width={100}
                height={100}
              />
            ) : (
              <div className="no_image">
                {item.gender === 1 ? (
                  <Image
                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg"
                    alt="Not found"
                    width={100}
                    height={100}
                  />
                ) : (
                  <Image
                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                    alt="Not Found"
                    width={100}
                    height={100}
                  />
                )}
              </div>
            )}
            <p>{item.name}</p>
            <p className="character">{item.character}</p>
          </li>
        );
      })}
      <li className="more_cards">
        <span>{"View More -->"}</span>
      </li>
    </ul>
  );
}

export default UserCard;
