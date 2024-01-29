export class Mood {
    public moods?: { moodValue: number; timestamp: string } [] = [];
    public lastMoodTimestamp?: number;
    public moodTimer?: { userId: string; timer: number};

    constructor(obj: any) {
        
        this.moods = obj.moods || [];
        this.lastMoodTimestamp = obj.lastMoodTimeStamp;
        this.moodTimer = obj.moodTimer
    }
}
