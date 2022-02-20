/* eslint-disable react/jsx-no-useless-fragment */
import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GitStatsComponent from "./GitStats";

const SomeImage = () => {
  const [books, setBooks] = useState(null);
  // const [languages, setLanguages] = useState(null);
  const projectParams = useParams();

  // + adding the use
  useEffect(() => {
    getData();

    async function getData() {
      // const { token } = cookies.token;
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      const username = document.cookie.replace(
        /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      const URI = `http://localhost:8080/api/u/${username}/projects/${projectParams.projectName}`;
      const response = await fetch(URI, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const d = await response.json();
      console.log(d);

      // const URI_Github =
      //   "https://api.github.com/repos/burntcarrot/peavote/languages";
      // const github_response = await fetch(URI_Github, {
      //   method: "GET",
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // },
      // });
      // const l = await github_response.json();
      // console.log(Object.keys(l));

      // https://api.github.com/repos/burntcarrot/peavote/languages

      // store the data into our books variable
      setBooks(d.data[0]);
      // setLanguages(Object.keys(l));
    }
  }, [projectParams.projectName]);

  return (
    <>
      {books && (
        <div className="books">
          <Box textAlign="center">
            <Heading>
              {books.name}
              {/* <Icon as={AiFillCalendar} /> */}
            </Heading>
            <Text>{books.description}</Text>
            <Text>{books.github_url}</Text>
          </Box>
          <GitStatsComponent />
        </div>
      )}
    </>
  );
};

export default SomeImage;
