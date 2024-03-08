import { Stepper, Step, StepLabel } from "@mui/material";

import { styles, ClubsContainer, DetailsContainer, SuccessContainer } from ".";

const Signup = ({ values, setValues, ManageClub }) => {
  const steps = ["User Details", "Select Club", "Success"];

  return (
    <div className={styles.signup}>
      <Stepper alternativeLabel activeStep={values.step - 1}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {values.step === 2 ? (
        <ClubsContainer values={values} setValues={setValues} ManageClub={ManageClub} />
      ) : values.step === 3 ? (
        <SuccessContainer values={values} setValues={setValues} />
      ) : (
        <DetailsContainer values={values} setValues={setValues} />
      )}
    </div>
  );
};

export default Signup;
