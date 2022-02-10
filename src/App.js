import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";

import useStyles from "./styles";
import wordsToNumbers from "words-to-numbers";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);

  const [activeArticle, setActiveArticle] = useState(-1);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2 ? wordsToNumbers(number) : number;

          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText("please try that again");
          } else if (number) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          alt="alan ai"
          className={classes.alanlogo}
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
