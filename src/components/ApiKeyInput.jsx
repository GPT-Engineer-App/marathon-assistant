import React, { useState } from "react";
import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";

const ApiKeyInput = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`API Key Submitted: ${apiKey}`);
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="api-key">OpenAPI Key</FormLabel>
          <Input id="api-key" placeholder="Enter your API key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
        </FormControl>
        <Button mt={4} type="submit" colorScheme="blue" onClick={() => onApiKeySubmit(apiKey)}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ApiKeyInput;
