import Link from "next/link";
import Image from "next/image";
import { Box, Button, Stack, Typography } from "@mui/material";

const Verified = () => (
  <Stack spacing={3} alignItems="center" textAlign="center" component="form" noValidate sx={{ "& > *": { width: "100%", maxWidth: "460px" } }}>
    <Box>
      <Image src="/images/layout/accounts.png" alt="SoccerMASS" width={150} height={120} style={{ margin: "auto" }} />
    </Box>

    <Typography fontSize="1.3em" fontWeight={600}>
      Email Verified
    </Typography>

    <Typography variant="body2">
      We are delighted to inform you that your account has been successfully verified. You can now log in to our platform and start using our services. Thank
      you for choosing our platform. We are confident that you will find our services beneficial and we look forward to serving you. If you have any questions
      or concerns, please do not hesitate to contact us.
    </Typography>

    <Button variant="outlined" sx={{ width: "clamp(200px, 100%, 320px)" }}>
      <Link href="/accounts/signin">Sign in</Link>
    </Button>
  </Stack>
);

export default Verified;
