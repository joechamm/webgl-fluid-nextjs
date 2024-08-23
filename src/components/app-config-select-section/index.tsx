import styles from './index.module.css';

import Button from '@/components/button';
import AppConfigSelectItem from '@/components/app-config-select-item';
import { 
  Simulation,
  reset 
} from '@/lib/fluid/Simulation';

import { 
  ImpulseConfiguration, 
  SourceConfiguration,
  MouseConfiguration, 
  CurrentDisplayProgram, 
  InitialVelocityTemperatureConfiguration,
  setImpulseConfiguration,
  setSourceConfiguration,
  setMouseConfiguration,
  setCurrentDisplayProgram,
  togglePause,
  toggleBallOn,
  toggleWallsOn,
  popSource
 } from '@/lib/utils/SimulationStateHandlers';

 enum AppConfigSelectType {
  ImpulseConfiguration,
  SourceConfiguration,
  MouseConfiguration,
  CurrentDisplayProgram,
  InitialVelocityTemperatureConfiguration
}

interface AppConfigSectionProps {
  sim: Simulation;
  type: AppConfigSelectType[];
}

const AppConfigSelectSection = (props: AppConfigSectionProps): JSX.Element => {
  const { sim, type } = props;



  return (
    <div className={styles.root}>
      <label htmlFor="app-config-select">App Configuration</label>
      {type.map((t, i) => {
        return (
          <AppConfigSelectItem key={i} sim={sim} type={t} />
        );
      })}
      <div id="App Toggles" className={styles.buttonContainer}>
        <label htmlFor="toggle-pause">Pause</label>
        <Button
          clickHandler={() => {
            togglePause(sim);
          }}
        >
          Pause Simulation
        </Button>
        <br />
        <label htmlFor="toggle-ball">Ball</label>
        <Button
          clickHandler={() => {
            toggleBallOn(sim);
          }
          }
        >
          Toggle Ball
        </Button>
        <br />
        <label htmlFor='toggle-walls'>Walls</label>
        <Button
          clickHandler={() => {
            toggleWallsOn(sim);
          }}
        >
          Toggle Walls
        </Button>
      </div>
      <div id="App Buttons" className={styles.buttonContainer}>
        <label htmlFor='reset-simulation'>Reset</label>
        <Button
          clickHandler={() => {
            reset(sim);
          }}
        >
          Reset Simulation
        </Button>
        <br />
        <label htmlFor='pop-source'>Pop Source</label>
        <Button
          clickHandler={() => {
            popSource(sim);
          }}
        >
          Pop Source
        </Button>
      </div>
    </div>
  );
}

export default AppConfigSelectSection;