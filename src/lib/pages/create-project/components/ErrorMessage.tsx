import { Box, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
export default function ErrorMessage({ message }) {
  return (
    <Box my={4}>
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
}
