import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete"
import { CiSearch as SearchIcon } from "react-icons/ci"
import { useEffect, useState } from "react"

import DefaultLayout from "@/layouts/default"
import { Entry } from "@/types"
import BigMessage from "@/components/BigMessage"
import ResultTable from "@/components/ResultTable"

const IndexPage = () => {
  const [input, setInput] = useState<string>('')
  const [autocompleteResults, setAutocompleteResults] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<Entry[]>([])

  /* The logic for autocomplete and query search are combined for now, but should be separated later. */
  useEffect(() => {
    let url = ''

    if (input === '') {
      url = import.meta.env.VITE_BACKEND_URL
      setAutocompleteResults([])

      return
    } else {
      url = import.meta.env.VITE_BACKEND_URL + `?query=${input}`
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setAutocompleteResults([input].concat(data.map((entry: Entry) => (entry.title))))
        setSearchResults(data)
      })
  }, [input])

  return (
    <DefaultLayout>
      <div className="w-full h-full flex flex-col px-5 py-12 items-center gap-40">
        {/* Search bar */}
        <div className="flex w-full flex-col items-center md:flex-nowrap gap-4">
          <Autocomplete
            className="max-w-xl"
            label=""
            listboxProps={{
              emptyContent: 'Search',
            }}
            placeholder="Search"
            radius="full"
            selectorIcon={<div className="w-0" />}
            startContent={<SearchIcon />}
            onInputChange={(value) => { setInput(value) }}
          >
            {autocompleteResults.map((result, i) => (
              <AutocompleteItem key={i}>{result}</AutocompleteItem>
            ))}
          </Autocomplete>
        </div>

        {/* Main content */}
        {input === '' ?
          <BigMessage>Type something to start your search.</BigMessage>
          : (autocompleteResults.length <= 1
            ? <BigMessage>No results can be found.</BigMessage>
            : <ResultTable entries={searchResults} />)}
      </div>
    </DefaultLayout>
  )
}

export default IndexPage
