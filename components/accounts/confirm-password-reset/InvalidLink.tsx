import Link from "next/link";
import Image from "next/image";
import { Box, Button, Stack, Typography } from "@mui/material";

const InvalidLink = () => (
  <Stack spacing={3} component="form" noValidate>
    <Box>
      <Image src="/images/layout/password.png" alt="Wave Research" width={150} height={120} style={{ margin: "auto" }} />
    </Box>

    <Typography fontSize="1.3em" fontWeight={600}>
      Invalid Reset link
    </Typography>

    <Typography variant="body2">
      We're sorry, but this password reset link is invalid or has expired. Please make sure you're using the latest password reset email we sent you.
      If you continue to experience issues, please contact our <Link href="info/contact">support team</Link> for further assistance.
    </Typography>

    <Link href="/accounts/signin">
      <Button variant="outlined" sx={{ width: "clamp(200px, 100%, 320px)", fontWeight: "600" }}>
        Sign in
      </Button>
    </Link>
  </Stack>
);

export default InvalidLink;
