import Link from "next/link";
import Image from "next/image";
import { Button, Stack, Typography } from "@mui/material";

import { verifiedStyles } from ".";

const Verified = () => (
  <Stack spacing={3} textAlign="center" alignItems="center" component="form" noValidate margin="auto" maxWidth={600}>
    <div className={verifiedStyles.verifiedImage}>
      <Image
        src="/images/layout/verified.png"
        alt="SoccermMASS Account Verified"
        fill
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      />
    </div>

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
