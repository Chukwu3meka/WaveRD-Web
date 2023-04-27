import Link from "next/link";
import Image from "next/image";
import { Button, Stack, Typography } from "@mui/material";

import { successStyles } from ".";

const Success = () => (
  <Stack spacing={3} textAlign="center" alignItems="center" component="form" noValidate margin="auto" maxWidth={600} className={successStyles.confirmMail}>
    <div className={successStyles.successImage}>
      <Image
        src="/images/layout/verified.png"
        alt="SoccermMASS Signup Success"
        fill
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      />
    </div>

    <Typography fontSize="1.3em" fontWeight={600}>
      Verify Your Email
    </Typography>

    <Typography variant="body2">
      Great news! Your account has been created successfully. Kindly check your email for a message from us containing an activation link. By clicking the link,
      you will verify your account and gain access to all the features and benefits of our platform. Thank you for choosing our services, and we look forward to
      serving you.
    </Typography>

    <Button variant="outlined" sx={{ width: "clamp(200px, 100%, 320px)" }}>
      <Link href="/accounts/signin">Sign in</Link>
    </Button>
  </Stack>
);

export default Success;
