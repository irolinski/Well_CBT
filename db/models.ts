export type TableRowCountObj = {
  rowCount: number;
};

export type UserType = {
  name: string;
  lastVisit?: Date;
  currentVisitStreak: number;
  highestVisitStreak: number;
  profilePicNum: number;
  customProfilePic?: string;
  numOfAllEntries?: number;
};

export type StatsDataObjType = {
  cbtCount: number;
  journalCount: number;
  relaxTimeMin: number;
  highestVisitStreak?: number;
};
