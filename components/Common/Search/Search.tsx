import { Box, Input, Text } from "@chakra-ui/react";

import ClientOnly from "../ClientOnly";

import { MeiliSearch } from "meilisearch";
import { useEffect, useState } from "react";
import _ from "lodash";
import ProductGrid from "../../Layout/PageComponents/components/ProductListing/ProductGrid";

const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_SEARCH_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SEARCH_API}`,
    "Content-Type": "application/json",
  },
});

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    //search movie index based on search value
    client
      .index("product")
      .search(search, {
        limit: 8,
      })
      .then((results) => {
        console.log(results);
        setResults(results);
      });
  }, [search]);

  const isdirty = search !== "";

  return (
    <ClientOnly>
      <Box borderTop={["1px solid #efefef", null]}>
        <Input
          px={[5, null, 5]}
          py={[0, null, 5]}
          border="0"
          borderBottom="1px solid #efefef"
          autoFocus
          value={search}
          rounded={"none"}
          placeholder="Start Searching..."
          onChange={(event) => {
            //@ts-ignore
            setSearch(event.target.value);
          }}
        />
        {isdirty && (
          <Box p={[0, null, 5]}>
            {results?.hits.length > 0 && (
              <>
                <ProductGrid items={formatSearchResults(results.hits)} />
              </>
            )}
            {results?.hits.length === 0 && (
              <>
                <Text p={5} textAlign={"center"}>
                  No results found
                </Text>
              </>
            )}
          </Box>
        )}
      </Box>
    </ClientOnly>
  );
};

export default Search;

function formatSearchResults(results: any[]) {
  return _.map(results, (result) => {
    return {
      id: result.id.split("product").pop().trim(),
      attributes: {
        ...result,
        Featured_Image: { data: { attributes: { ...result.Featured_Image } } },
      },
    };
  });
}
