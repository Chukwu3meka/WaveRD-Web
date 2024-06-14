"use client";

import { Result } from "antd";
import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";

export default function NotFound() {
  const router = useRouter();

  return (
    <Box py={2} px={2}>
      <Result
        status={404}
        title="404"
        subTitle="Sorry, the page you have visited does not exist."
        extra={
          <Button onClick={() => router.back()} variant="contained">
            Back to API Hub
          </Button>
        }
      />
    </Box>
  );
}
