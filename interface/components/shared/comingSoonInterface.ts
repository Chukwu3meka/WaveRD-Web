export interface ComingSoonContainer {
  header?: boolean;
  minHeight?: string;
  finishDate?: Date;
}

export interface ComingSoon extends ComingSoonContainer {
  header: boolean;
  minHeight: string;
  timeLeft: TimeLeft;
}

export interface TimeLeft {
  date: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
