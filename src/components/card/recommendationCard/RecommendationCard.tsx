import React from "react";
import "@/styles/components/cards/RecommendationCard.scss";
import { type Movie } from "@/types/movieDataAPI.types";
import Image from "next/image";

interface RecommendationCardProps {
  recommendations: Movie[];
}

function RecommendationCard({ recommendations }: RecommendationCardProps) {
  // If the we dont have any recommendation of the movie show below comment
  if (recommendations.length === 0) {
    return <p>We dont have any recommendations for this Movie Yet.</p>;
  }
  // else
  return (
    <ul className="card_wrapper">
      {recommendations.slice(0, 12).map((item, index) => {
        if (item.backdrop_path == null) {
          return null;
        }
        return (
          <li
            key={index}
            className="card"
            data-movie_id={item.id}
            data-movie_name={item.title}
          >
            <Image
              className="image"
              src={"https://www.themoviedb.org/t/p/w300/" + item.backdrop_path}
              alt="Image Not Found"
              width={100}
              height={100}
            />
            <p>{item.title}</p>
            <p className="character">
              {(item.vote_average * 10).toFixed(0) + "%"}
            </p>
          </li>
        );
      })}
      <li className="more_cards">
        <span>{"View More -->"}</span>
      </li>
    </ul>
  );
}

export default RecommendationCard;
