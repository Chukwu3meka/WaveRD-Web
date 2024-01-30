import Link from "next/link";
import Image from "next/image";
import { Box, Button, Stack, Typography } from "@mui/material";

const VerificationFailed = () => (
  <Stack spacing={3} component="form" noValidate>
    <Box>
      <Image src="/images/layout/accounts.png" alt="SoccerMASS" width={150} height={120} style={{ margin: "auto" }} />
    </Box>

    <Typography fontSize="1.3em" fontWeight={600}>
      Error verification failed
    </Typography>

    <Typography variant="body2">
      Unfortunately, we were unable to verify your email. However, you should click the most recent link sent to you or paste link directly instead of typing. We
      appreciate your choice of our platform and are certain that you will find our services useful. Our team is always available to address any inquiries or issues you
      may have, so please feel free to contact us at any time. Thank you.{" "}
    </Typography>

    <Box>
      <Button variant="outlined" sx={{ width: "clamp(200px, 100%, 320px)" }}>
        <Link href="/info/contact">Contact US</Link>
      </Button>
    </Box>
  </Stack>
);

export default VerificationFailed;
