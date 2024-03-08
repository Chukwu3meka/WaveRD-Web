import Image from "next/image";

import Spinner from "@component/others/Spinner";

const CalendarContainer = ({ homeStyles, calendar: { prevMatch, curMatch, nextMatch, lastFiveMatches } }) =>
  prevMatch || curMatch ? (
    <div id={homeStyles.calendar}>
      <div>
        {prevMatch ? (
          <main className={homeStyles.schedule}>
            <div>
              <Image src="/images/layout/prevMatch.png" layout="fill" alt="current match" />
            </div>
            <div>
              <span>{prevMatch?.competition}</span>
              <span>
                <div>
                  <Image src={`/images/club/${prevMatch?.home}.webp`} layout="fill" alt="Home Club" />
                </div>
                <i>vs</i>
                <div>
                  <Image src={`/images/club/${prevMatch?.away}.webp`} layout="fill" alt="Away Club" />
                </div>
              </span>
              <span> {`${prevMatch?.hg} : ${prevMatch?.ag}`}</span>
              <span>{prevMatch?.date}</span>
            </div>
          </main>
        ) : (
          <NoMatch homeStyles={homeStyles} match="prevMatch" />
        )}
        {curMatch ? (
          <main className={homeStyles.schedule}>
            <div>
              <Image src="/images/layout/curMatch.png" layout="fill" alt="current match" />
            </div>
            <div>
              <span>{curMatch.competition}</span>
              <span>
                <div>
                  <Image src={`/images/club/${curMatch.home}.webp`} layout="fill" alt="Home Club" />
                </div>
                <i>vs</i>
                <div>
                  <Image src={`/images/club/${curMatch.away}.webp`} layout="fill" alt="Away Club" />
                </div>
              </span>

              <span>{curMatch.stadium}</span>
              <span>{curMatch.date}</span>
            </div>
          </main>
        ) : (
          <NoMatch homeStyles={homeStyles} match="curMatch" />
        )}

        {nextMatch ? (
          <main className={homeStyles.schedule}>
            <div>
              <Image src="/images/layout/nextMatch.png" layout="fill" alt="current match" />
            </div>
            <div>
              <span>{nextMatch?.competition}</span>
              <span>
                <div>
                  <Image src={`/images/club/${nextMatch?.home}.webp`} layout="fill" alt="Home Club" />
                </div>

                <i>vs</i>
                <div>
                  <Image src={`/images/club/${nextMatch?.away}.webp`} layout="fill" alt="Away Club" />
                </div>
              </span>

              <span>{nextMatch.stadium}</span>
              <span>{nextMatch.date}</span>
            </div>
          </main>
        ) : (
          <NoMatch homeStyles={homeStyles} match="nextMatch" />
        )}
      </div>

      <div>
        {lastFiveMatches?.map((match, index) => (
          <span id={homeStyles[match]} key={index} />
        ))}
      </div>
    </div>
  ) : (
    <Spinner height />
  );

export default CalendarContainer;

const NoMatch = ({ match, homeStyles }) => {
  return (
    <main className={homeStyles.schedule}>
      <div>
        <Image src={`/images/layout/${match}.png`} layout="fill" alt="no match" />
      </div>
      <div>
        <span>No Match</span>
        <span>
          <div className={homeStyles.circularBall}>
            <Image src="/images/layout/ball.png" layout="fill" alt="Home Club" />
          </div>
          <i>vs</i>
          <div className={homeStyles.circularBall}>
            <Image src="/images/layout/ball.png" layout="fill" alt="Home Club" />
          </div>
        </span>
        <span>-- : --</span>
        <span>Not Available</span>
      </div>
    </main>
  );
};
