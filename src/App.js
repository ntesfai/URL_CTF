import React, { useEffect, useState } from "react";

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [renderedText, setRenderedText] = useState("");

  useEffect(() => {
    // Make the HTTP request when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Make the HTTP request
      const response = await fetch(
        "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/736c61"
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      // Parse the response as JSON
      const textDataPromise = await response.text();
      //console.log(textDataPromise);
      // Update the component state with the fetched data
      setData(textDataPromise);

      const textData = await textDataPromise;
      setData(textData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let currentText = "";
    let index = 0;

    const interval = setInterval(() => {
      if (index >= data.length) {
        clearInterval(interval);
        return;
      }

      currentText = [...currentText, data[index]];
      setRenderedText(currentText);
      index++;
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>{renderedText}</p>
      )}
    </div>
  );
};

export default MyComponent;

/*Code used for getting the URL

import requests
from bs4 import BeautifulSoup
import sys




#Using bs4 to parse the DOM to get the URL. CTF Ramp challenge
def get_url():
    result = ''
    url = 'https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge'
    response = requests.get(url)
    html = response.text
    #print(html)
    soup = BeautifulSoup(html, 'html.parser')
    ul_elements = soup.find_all('ul', class_='ramp')
    ##iterate over the DOM elements to wittle donw the correct pattern
    for ul_element in ul_elements:
        li_elements = ul_element.find_all('li', class_='ramp')

        for li_element in li_elements:
            div_elements = li_element.find_all('div', class_='ramp')

            for div_element in div_elements:
                span_elements = div_element.find_all('span', class_='ramp value')

                for span_element in span_elements:
                    result = result + span_element.get('value')
    #print(result)
    return result


if __name__ == "__main__":

    message = f"{get_url()}\n"
    #print(message)
    sys.stdout.write(
        f"{message}\n"
    )

*/
