import { FitnessData } from './fitness-data';

export class RunData extends FitnessData {
	private runStart:Date;
	private runEnd:Date;

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.runStart = sleepStart;
		this.runEnd = sleepEnd;
	}

	override summaryString():string {
		var sleepStart_ms = this.runStart.getTime();
		var sleepEnd_ms = this.runEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes.";
	}

	override dateString():string {
		return "Day of " + this.runStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}
}