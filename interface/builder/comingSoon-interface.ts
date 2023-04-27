export interface BuilderComingSoonContainer {
  header: boolean;
  minHeight?: string;
}

export interface BuilderComingSoon extends BuilderComingSoonContainer {
  timeLeft: TimeLeft;
}

export interface TimeLeft {
  date: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
