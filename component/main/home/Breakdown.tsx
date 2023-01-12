import { breakdownStyles } from ".";

const Breakdown = () => {
  return (
    <div className={breakdownStyles.breakdown}>
      <div>
        <div>
          <i>●●●💗●●●</i>
          <span> No Player hoarding </span>
          <span> Competitive transfer market </span>
          <span> Advanced tactics and formation </span>
          <span> Real match simulation </span>
          <span> and many more</span>
          <i>●●●💗●●●</i>
        </div>
        <img src="/images/layout/intro-breakdown.png" />
      </div>
    </div>
  );
};

export default Breakdown;
