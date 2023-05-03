import Link from "next/link";
import Image from "next/image";
import { Box, Button, Stack, Typography } from "@mui/material";

const Success = () => (
  <Stack spacing={3} alignItems="center" textAlign="center" component="form" noValidate sx={{ "& > *": { width: "100%", maxWidth: "460px" } }}>
    <Box>
      <Image src="/images/layout/accounts.png" alt="SoccerMASS" width={150} height={120} style={{ margin: "auto" }} />
    </Box>

    <Typography fontSize="1.3em" fontWeight={600}>
      Verify Your Email
    </Typography>

    <Typography variant="body2">
      Great news! Your account has been created successfully. Kindly check your email for a message from us containing an activation link. By clicking the link,
      you will verify your account and gain access to all the features and benefits of our platform. Thank you for choosing our services, and we look forward to
      serving you.
    </Typography>

    <Link href="/accounts/signin">
      <Button variant="outlined" sx={{ width: "clamp(200px, 100%, 320px)" }}>
        Sign in
      </Button>
    </Link>
  </Stack>
);

export default Success;
