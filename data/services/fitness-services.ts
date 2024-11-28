import { Injectable } from '@angular/core';
import { FitnessData } from '../data/fitness-data';
import { RunData } from '../data/run-data';
import { RunEnergyData } from '../data/run-energy-data';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {
  private static LoadDefaultData: boolean = true;
  public static AllFitnessData: FitnessData[] = [];
  public static AllRunData: RunData[] = [];
  public static AllEnergyData: RunEnergyData[] = [];

  constructor() {
    if (FitnessService.LoadDefaultData) {
      this.addDefaultData();
      FitnessService.LoadDefaultData = false;
    }
  }

  private addDefaultData() {
    this.logRunData(new RunData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
    this.logEnergyData(new RunEnergyData(4, new Date('February 19, 2021 14:38:00')));
    this.logRunData(new RunData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00')));
}

  public logRunData(runData: RunData) {
    FitnessService.AllFitnessData.push(runData);
    FitnessService.AllRunData.push(runData);
  }

  public logEnergyData(energyData: RunEnergyData) {
    FitnessService.AllFitnessData.push(energyData);
    FitnessService.AllEnergyData.push(energyData);
  }
}
