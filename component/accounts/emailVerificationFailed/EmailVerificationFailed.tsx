import Link from "next/link";
import Image from "next/image";
import { Box, Button, Stack, Typography } from "@mui/material";

const EmailVerificationFailed = () => (
  <Stack spacing={3} alignItems="center" textAlign="center" component="form" noValidate sx={{ "& > *": { width: "100%", maxWidth: "460px" } }}>
    <Box>
      <Image src="/images/layout/accounts.png" alt="SoccerMASS" width={150} height={120} style={{ margin: "auto" }} />
    </Box>

    <Typography fontSize="1.3em" fontWeight={600}>
      Error verification failed
    </Typography>

    <Typography variant="body2">
      Unfortunately, we were unable to verify your email. However, you should click the most recent link sent to you or paste link directly instead of typing.
      We appreciate your choice of our platform and are certain that you will find our services useful. Our team is always available to address any inquiries or
      issues you may have, so please feel free to contact us at any time. Thank you.{" "}
    </Typography>

    <Button variant="outlined" sx={{ width: "clamp(200px, 100%, 320px)" }}>
      <Link href="/info/contact">Contact US</Link>
    </Button>
  </Stack>
);

export default EmailVerificationFailed;
