import { Simulation } from '../fluid/Simulation';

export enum ImpulseConfiguration {
  Add_Temperature_at_Mouse_Click = 0,
  Add_Velocity_at_Mouse_Click = 1,
  Add_Velocity_and_Temperature_at_Mouse_Click = 2,
  Add_Velocity_at_Mouse_Move = 3,
  Add_Velocity_and_Temperature_at_Mouse_Move = 4,
  None = 5,
};

export enum SourceConfiguration {
  Add_Temperature_at_Sources = 0,
  Add_Velocity_at_Sources = 1,
  Add_Velocity_and_Temperature_at_Sources = 2,
  Sources_Off = 3,
};

export enum MouseConfiguration {
  Add_Velocity_and_Temperature_Impulse_to_Fluid = 0,
  Set_Initial_Circle_Position = 1,
  Add_Velocity_Temperature_Source = 2,
  Slingshot_Circle = 3,
};

export enum CurrentDisplayProgram {
  Display_Temperature = 0,
  Display_Ink = 1,
  Display_Velocity = 2,
  Display_Velocity_Density = 3,
  Display_Temperature_Density = 4,
  Display_Sepia_Density = 5,
  Display_Density = 6,
  Display_Density_Test = 7,
  Display_Image = 8,
};

export enum InitialVelocityTemperatureConfiguration {
  Hot_and_Cold_Rectangles = 0,
  Cold_Ink_Blot = 1,
  Wavey = 2,
  Random = 3,
  Empty = 4,
};

export function setImpulseConfiguration(sim: Simulation, config: ImpulseConfiguration): void {
  sim.impulseConfig = config;
}

export function setSourceConfiguration(sim: Simulation, config: SourceConfiguration): void {
  sim.sourceConfiguration = config;
}

export function setMouseConfiguration(sim: Simulation, config: MouseConfiguration): void {
  sim.mouseConfig = config;
}

export function setCurrentDisplayProgram(sim: Simulation, program: CurrentDisplayProgram): void {
  sim.currentProgram = program;
}

export function setInitialVelocityTemperatureConfiguration(sim: Simulation, config: InitialVelocityTemperatureConfiguration): void {
  sim.initTexConfig = config;
}

export function toggleWallsOn(sim: Simulation): void {
  sim.wallsOn = !sim.wallsOn;
}

export function toggleBallOn(sim: Simulation): void {
  sim.ballOn = !sim.ballOn;
}

export function togglePause(sim: Simulation): void {
  sim.paused = !sim.paused;
}