import { FitnessData } from './fitness-data';

export class RunEnergyData extends FitnessData {
    public static ScaleValues = [undefined, // Running energy scale starts at 1
        'Barely moving: Exhausted, no energy to run', // 1
        'Struggling to keep up: Very low energy, running feels extremely difficult', // 2
        'Running on empty: Low energy, running feels hard but manageable', // 3
        'Steady but strained: Moderate energy, running is tiring but sustainable', // 4
        'Comfortable and controlled: Balanced energy, running feels smooth', // 5
        'Energized and easy: High energy, running feels effortless', // 6
        'Peak performance: Overflowing energy, running feels exhilarating' // 7
    ];
	private loggedValue:number;

	constructor(loggedValue:number, loggedAt:Date = new Date()) {
		super();
		this.loggedValue = loggedValue;
		this.loggedAt = loggedAt;
	}

	override summaryString():string {
		return this.loggedValue + ": " + RunEnergyData.ScaleValues[this.loggedValue];
	}
}