import { useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Input from '../components/Input';
import CountryHistory from '../components/CountryHistory';

interface FormData {
  country: string;
}

interface CountryInformations {
  officialName: string;
  name: string;
  capitais: string[];
  currencies: { [c: string]: { name: string; symbol: string } };
  population: string;
  subregion: string;
  languages: { [c: string]: string };
  flag: {
    url: string;
    alt: string;
    unicode: string;
  };
  associates?: CountryInformations[];
}

const baseUrl = import.meta.env.VITE_COUNTRY_API_URL;

export default function Home() {
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countriesHistory, setCountriesHistory] = useState<
    CountryInformations[]
  >([]);

  const [countryInformation, setCountryInformation] =
    useState<CountryInformations | null>(null);

  function manualSubmitForm(data: FormData) {
    formRef.current?.setData(data);

    formRef.current?.submitForm();
  }

  async function handleSearch(data: FormData) {
    if (!data.country) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/countries/${data.country}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const countryInformations = await response.json();

      if (countryInformations) {
        setCountryInformation(countryInformations);

        delete countryInformations.associates;

        countriesHistory.push(countryInformations);
        if (countriesHistory.length > 5) countriesHistory.shift();
        setCountriesHistory(countriesHistory);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-white relative h-screen lg:py-20">
      <div
        className="flex flex-col items-center justify-between h-full pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
      xl:px-5 lg:flex-row"
      >
        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="flex flex-col items-start justify-center w-full h-full relative lg:pr-10">
              {countryInformation ? (
                <>
                  <div className="w-full pb-10">
                    <h1 className="text-4xl font-medium tracking-tighter text-start font-cursive mb-10">
                      {countryInformation.officialName}{' '}
                      {countryInformation.flag.unicode}
                    </h1>

                    <div>
                      {Object.keys(countryInformation.currencies).map(
                        (c, index) => (
                          <p key={index}>
                            <b key={index} className="font-serif">
                              currency
                            </b>{' '}
                            {c}
                          </p>
                        )
                      )}
                    </div>

                    <p>
                      <b className="font-serif">population</b>{' '}
                      {countryInformation.population}
                    </p>

                    <p>
                      <b className="font-serif">region</b>{' '}
                      <span>{countryInformation.subregion}</span>
                    </p>

                    <div>
                      <b className="font-serif">languages</b>

                      {Object.keys(countryInformation.languages).map(
                        (l, index) => (
                          <span key={index}>
                            {' '}
                            {countryInformation.languages[l]}
                            {', '}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {countryInformation.associates &&
                    countryInformation.associates.length !== 0 && (
                      <div>
                        <b className="font-serif mr-3">associates</b>

                        {countryInformation.associates.map(
                          (associate: any, index: number) => (
                            <button
                              title={associate.name}
                              className="text-4xl ml-2 hover:text-5xl"
                              key={index}
                              onClick={() =>
                                manualSubmitForm({
                                  country: associate.name,
                                })
                              }
                            >
                              {associate.flag.unicode}
                            </button>
                          )
                        )}
                      </div>
                    )}

                  <CountryHistory history={countriesHistory} />
                </>
              ) : (
                <img
                  src="https://res.cloudinary.com/macxenon/image/upload/v16315705923/Run_-_Health_qcghbu.png"
                  className="btn-"
                />
              )}
            </div>
          </div>

          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-lg lg:fixed lg:right-24 lg:mt-0 lg:w-5/12">
            <div
              className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
            relative z-10"
            >
              <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                Which Country?
              </p>

              <Form
                ref={formRef}
                onSubmit={handleSearch}
                className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8"
              >
                <div className="relative">
                  <p
                    className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
                  >
                    Name
                  </p>

                  <Input
                    name="country"
                    placeholder="Brazil"
                    type="text"
                    className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                  />
                </div>

                <div className="relative">
                  <button
                    type="submit"
                    className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                  rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>

            {countryInformation ? (
              <>
                <img
                  className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300
                fill-current"
                  src={countryInformation.flag.url}
                  alt={countryInformation.flag.alt}
                />

                <img
                  className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
                fill-current"
                  src={countryInformation.flag.url}
                  alt={countryInformation.flag.alt}
                />
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 91 91"
                  className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300
            fill-current"
                >
                  <g stroke="none" strokeWidth="1" fillRule="evenodd">
                    <g fillRule="nonzero">
                      <g>
                        <g>
                          <circle cx="3.261" cy="3.445" r="2.72" />
                          <circle cx="15.296" cy="3.445" r="2.719" />
                          <circle cx="27.333" cy="3.445" r="2.72" />
                          <circle cx="39.369" cy="3.445" r="2.72" />
                          <circle cx="51.405" cy="3.445" r="2.72" />
                          <circle cx="63.441" cy="3.445" r="2.72" />
                          <circle cx="75.479" cy="3.445" r="2.72" />
                          <circle cx="87.514" cy="3.445" r="2.719" />
                        </g>
                        <g transform="translate(0 12)">
                          <circle cx="3.261" cy="3.525" r="2.72" />
                          <circle cx="15.296" cy="3.525" r="2.719" />
                          <circle cx="27.333" cy="3.525" r="2.72" />
                          <circle cx="39.369" cy="3.525" r="2.72" />
                          <circle cx="51.405" cy="3.525" r="2.72" />
                          <circle cx="63.441" cy="3.525" r="2.72" />
                          <circle cx="75.479" cy="3.525" r="2.72" />
                          <circle cx="87.514" cy="3.525" r="2.719" />
                        </g>
                        <g transform="translate(0 24)">
                          <circle cx="3.261" cy="3.605" r="2.72" />
                          <circle cx="15.296" cy="3.605" r="2.719" />
                          <circle cx="27.333" cy="3.605" r="2.72" />
                          <circle cx="39.369" cy="3.605" r="2.72" />
                          <circle cx="51.405" cy="3.605" r="2.72" />
                          <circle cx="63.441" cy="3.605" r="2.72" />
                          <circle cx="75.479" cy="3.605" r="2.72" />
                          <circle cx="87.514" cy="3.605" r="2.719" />
                        </g>
                        <g transform="translate(0 36)">
                          <circle cx="3.261" cy="3.686" r="2.72" />
                          <circle cx="15.296" cy="3.686" r="2.719" />
                          <circle cx="27.333" cy="3.686" r="2.72" />
                          <circle cx="39.369" cy="3.686" r="2.72" />
                          <circle cx="51.405" cy="3.686" r="2.72" />
                          <circle cx="63.441" cy="3.686" r="2.72" />
                          <circle cx="75.479" cy="3.686" r="2.72" />
                          <circle cx="87.514" cy="3.686" r="2.719" />
                        </g>
                        <g transform="translate(0 49)">
                          <circle cx="3.261" cy="2.767" r="2.72" />
                          <circle cx="15.296" cy="2.767" r="2.719" />
                          <circle cx="27.333" cy="2.767" r="2.72" />
                          <circle cx="39.369" cy="2.767" r="2.72" />
                          <circle cx="51.405" cy="2.767" r="2.72" />
                          <circle cx="63.441" cy="2.767" r="2.72" />
                          <circle cx="75.479" cy="2.767" r="2.72" />
                          <circle cx="87.514" cy="2.767" r="2.719" />
                        </g>
                        <g transform="translate(0 61)">
                          <circle cx="3.261" cy="2.846" r="2.72" />
                          <circle cx="15.296" cy="2.846" r="2.719" />
                          <circle cx="27.333" cy="2.846" r="2.72" />
                          <circle cx="39.369" cy="2.846" r="2.72" />
                          <circle cx="51.405" cy="2.846" r="2.72" />
                          <circle cx="63.441" cy="2.846" r="2.72" />
                          <circle cx="75.479" cy="2.846" r="2.72" />
                          <circle cx="87.514" cy="2.846" r="2.719" />
                        </g>
                        <g transform="translate(0 73)">
                          <circle cx="3.261" cy="2.926" r="2.72" />
                          <circle cx="15.296" cy="2.926" r="2.719" />
                          <circle cx="27.333" cy="2.926" r="2.72" />
                          <circle cx="39.369" cy="2.926" r="2.72" />
                          <circle cx="51.405" cy="2.926" r="2.72" />
                          <circle cx="63.441" cy="2.926" r="2.72" />
                          <circle cx="75.479" cy="2.926" r="2.72" />
                          <circle cx="87.514" cy="2.926" r="2.719" />
                        </g>
                        <g transform="translate(0 85)">
                          <circle cx="3.261" cy="3.006" r="2.72" />
                          <circle cx="15.296" cy="3.006" r="2.719" />
                          <circle cx="27.333" cy="3.006" r="2.72" />
                          <circle cx="39.369" cy="3.006" r="2.72" />
                          <circle cx="51.405" cy="3.006" r="2.72" />
                          <circle cx="63.441" cy="3.006" r="2.72" />
                          <circle cx="75.479" cy="3.006" r="2.72" />
                          <circle cx="87.514" cy="3.006" r="2.719" />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>

                <svg
                  viewBox="0 0 91 91"
                  className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
            fill-current"
                >
                  <g stroke="none" strokeWidth="1" fillRule="evenodd">
                    <g fillRule="nonzero">
                      <g>
                        <g>
                          <circle cx="3.261" cy="3.445" r="2.72" />
                          <circle cx="15.296" cy="3.445" r="2.719" />
                          <circle cx="27.333" cy="3.445" r="2.72" />
                          <circle cx="39.369" cy="3.445" r="2.72" />
                          <circle cx="51.405" cy="3.445" r="2.72" />
                          <circle cx="63.441" cy="3.445" r="2.72" />
                          <circle cx="75.479" cy="3.445" r="2.72" />
                          <circle cx="87.514" cy="3.445" r="2.719" />
                        </g>
                        <g transform="translate(0 12)">
                          <circle cx="3.261" cy="3.525" r="2.72" />
                          <circle cx="15.296" cy="3.525" r="2.719" />
                          <circle cx="27.333" cy="3.525" r="2.72" />
                          <circle cx="39.369" cy="3.525" r="2.72" />
                          <circle cx="51.405" cy="3.525" r="2.72" />
                          <circle cx="63.441" cy="3.525" r="2.72" />
                          <circle cx="75.479" cy="3.525" r="2.72" />
                          <circle cx="87.514" cy="3.525" r="2.719" />
                        </g>
                        <g transform="translate(0 24)">
                          <circle cx="3.261" cy="3.605" r="2.72" />
                          <circle cx="15.296" cy="3.605" r="2.719" />
                          <circle cx="27.333" cy="3.605" r="2.72" />
                          <circle cx="39.369" cy="3.605" r="2.72" />
                          <circle cx="51.405" cy="3.605" r="2.72" />
                          <circle cx="63.441" cy="3.605" r="2.72" />
                          <circle cx="75.479" cy="3.605" r="2.72" />
                          <circle cx="87.514" cy="3.605" r="2.719" />
                        </g>
                        <g transform="translate(0 36)">
                          <circle cx="3.261" cy="3.686" r="2.72" />
                          <circle cx="15.296" cy="3.686" r="2.719" />
                          <circle cx="27.333" cy="3.686" r="2.72" />
                          <circle cx="39.369" cy="3.686" r="2.72" />
                          <circle cx="51.405" cy="3.686" r="2.72" />
                          <circle cx="63.441" cy="3.686" r="2.72" />
                          <circle cx="75.479" cy="3.686" r="2.72" />
                          <circle cx="87.514" cy="3.686" r="2.719" />
                        </g>
                        <g transform="translate(0 49)">
                          <circle cx="3.261" cy="2.767" r="2.72" />
                          <circle cx="15.296" cy="2.767" r="2.719" />
                          <circle cx="27.333" cy="2.767" r="2.72" />
                          <circle cx="39.369" cy="2.767" r="2.72" />
                          <circle cx="51.405" cy="2.767" r="2.72" />
                          <circle cx="63.441" cy="2.767" r="2.72" />
                          <circle cx="75.479" cy="2.767" r="2.72" />
                          <circle cx="87.514" cy="2.767" r="2.719" />
                        </g>
                        <g transform="translate(0 61)">
                          <circle cx="3.261" cy="2.846" r="2.72" />
                          <circle cx="15.296" cy="2.846" r="2.719" />
                          <circle cx="27.333" cy="2.846" r="2.72" />
                          <circle cx="39.369" cy="2.846" r="2.72" />
                          <circle cx="51.405" cy="2.846" r="2.72" />
                          <circle cx="63.441" cy="2.846" r="2.72" />
                          <circle cx="75.479" cy="2.846" r="2.72" />
                          <circle cx="87.514" cy="2.846" r="2.719" />
                        </g>
                        <g transform="translate(0 73)">
                          <circle cx="3.261" cy="2.926" r="2.72" />
                          <circle cx="15.296" cy="2.926" r="2.719" />
                          <circle cx="27.333" cy="2.926" r="2.72" />
                          <circle cx="39.369" cy="2.926" r="2.72" />
                          <circle cx="51.405" cy="2.926" r="2.72" />
                          <circle cx="63.441" cy="2.926" r="2.72" />
                          <circle cx="75.479" cy="2.926" r="2.72" />
                          <circle cx="87.514" cy="2.926" r="2.719" />
                        </g>
                        <g transform="translate(0 85)">
                          <circle cx="3.261" cy="3.006" r="2.72" />
                          <circle cx="15.296" cy="3.006" r="2.719" />
                          <circle cx="27.333" cy="3.006" r="2.72" />
                          <circle cx="39.369" cy="3.006" r="2.72" />
                          <circle cx="51.405" cy="3.006" r="2.72" />
                          <circle cx="63.441" cy="3.006" r="2.72" />
                          <circle cx="75.479" cy="3.006" r="2.72" />
                          <circle cx="87.514" cy="3.006" r="2.719" />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
