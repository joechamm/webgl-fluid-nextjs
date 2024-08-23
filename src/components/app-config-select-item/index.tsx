import styles from "./index.module.css";

import { Simulation } from "@/lib/fluid/Simulation";
import { 
  ImpulseConfiguration, 
  SourceConfiguration,
  MouseConfiguration, 
  CurrentDisplayProgram, 
  InitialVelocityTemperatureConfiguration,
  setImpulseConfiguration,
  setSourceConfiguration,
  setMouseConfiguration,
  setCurrentDisplayProgram
 } from "@/lib/utils/SimulationStateHandlers";

enum AppConfigSelectType {
  ImpulseConfiguration,
  SourceConfiguration,
  MouseConfiguration,
  CurrentDisplayProgram,
  InitialVelocityTemperatureConfiguration
}

interface AppConfigSelectProps {
  sim: Simulation;
  type: AppConfigSelectType;
}

 const AppConfigSelectItem = (props: AppConfigSelectProps): JSX.Element => {
  const { sim, type } = props;

  const selectId = (type: AppConfigSelectType): string => {
    switch(type) {
      case AppConfigSelectType.ImpulseConfiguration:
        return 'impulse-config';
      case AppConfigSelectType.SourceConfiguration:
        return 'source-config';
      case AppConfigSelectType.MouseConfiguration:
        return 'mouse-config';
      case AppConfigSelectType.CurrentDisplayProgram:
        return 'display-program';
      case AppConfigSelectType.InitialVelocityTemperatureConfiguration:
        return 'initial-velocity-temperature-config';
      default:
        return '';
    }
  }

  const selectName = (type: AppConfigSelectType): string => {
    switch(type) {
      case AppConfigSelectType.ImpulseConfiguration:
        return 'Impulse Configuration';
      case AppConfigSelectType.SourceConfiguration:
        return 'Source Configuration';
      case AppConfigSelectType.MouseConfiguration:
        return 'Mouse Configuration';
      case AppConfigSelectType.CurrentDisplayProgram:
        return 'Display Program';
      case AppConfigSelectType.InitialVelocityTemperatureConfiguration:
        return 'Initial Velocity Temperature Configuration';
      default:
        return '';
    }
  }

  const selectOptions = (type: AppConfigSelectType): string[] => {
    switch(type) {
      case AppConfigSelectType.ImpulseConfiguration:
        return Object.keys(ImpulseConfiguration).filter(k => typeof ImpulseConfiguration[k as any] === 'number');
      case AppConfigSelectType.SourceConfiguration:
        return Object.keys(SourceConfiguration).filter(k => typeof SourceConfiguration[k as any] === 'number');
      case AppConfigSelectType.MouseConfiguration:
        return Object.keys(MouseConfiguration).filter(k => typeof MouseConfiguration[k as any] === 'number');
      case AppConfigSelectType.CurrentDisplayProgram:
        return Object.keys(CurrentDisplayProgram).filter(k => typeof CurrentDisplayProgram[k as any] === 'number');
      case AppConfigSelectType.InitialVelocityTemperatureConfiguration:
        return Object.keys(InitialVelocityTemperatureConfiguration).filter(k => typeof InitialVelocityTemperatureConfiguration[k as any] === 'number');
      default:
        return [];
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = parseInt(event.target.value);
    switch(type) {
      case AppConfigSelectType.ImpulseConfiguration:
        setImpulseConfiguration(sim, value);
        break;
      case AppConfigSelectType.SourceConfiguration:
        setSourceConfiguration(sim, value);
        break;
      case AppConfigSelectType.MouseConfiguration:
        setMouseConfiguration(sim, value);
        break;
      case AppConfigSelectType.CurrentDisplayProgram:
        setCurrentDisplayProgram(sim, value);
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.root}>
      <label htmlFor={selectId(type)}>{selectName(type)}</label>
      <br />
      <select id={selectId(type)} name={selectName(type)} onChange={handleChange}>
        {selectOptions(type).map((option, index) => {
          return <option key={index} value={option}>{option}</option>
        })}
      </select>
    </div>
  )
 };

 export default AppConfigSelectItem;