import Link from "next/link";
import Image from "next/image";
import { Box, Button, Stack, Typography } from "@mui/material";

export default () => (
  <Stack spacing={3} component="form" noValidate maxWidth="650px !important">
    <Box>
      <Image src="/images/layout/accounts.png" alt="SoccerMASS" width={150} height={120} style={{ margin: "auto" }} />
    </Box>

    <Typography fontSize="1.3em" fontWeight={600}>
      Email Verified
    </Typography>

    <Typography variant="body2">
      We are delighted to inform you that your account has been successfully verified. You can now log in to our platform and start using our services. Thank
      you for choosing our platform. We are confident that you will find our services beneficial and we look forward to serving you. We use cookies to ensure
      that we give you the best experience on our website. By continuing to browse this site, you agree to our use of cookies. To learn more about cookies and
      how we use them, please see our Privacy Policy.
    </Typography>

    <Box>
      <Button variant="outlined" sx={{ width: "clamp(200px, 100%, 320px)" }}>
        <Link href="/accounts/signin">Sign in</Link>
      </Button>
    </Box>
  </Stack>
);
