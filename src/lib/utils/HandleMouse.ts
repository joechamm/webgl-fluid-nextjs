import { vec2, vec3 } from "gl-matrix";
import { Simulation, addSource } from "../fluid/Simulation";

export function handleMouseDown(event: MouseEvent, sim: Simulation): void {
  try {
    sim.mouseDown = true;

    const width = sim.viewportWidth;
    const height = sim.viewportHeight;
    
    const mouseX = event.clientX;
    const mouseY = height - event.clientY;

    const lastMouseX = mouseX;
    const lastMouseY = mouseY;

    sim.mousePosition = vec2.fromValues(mouseX, mouseY);
    sim.lastMousePosition = vec2.fromValues(lastMouseX, lastMouseY);

    if(sim.mouseConfig === 0) {
      if((sim.impulseConfig === 4) || (sim.impulseConfig === 5)) {
        sim.currentScale = sim.bigScale;
      } else {
        sim.currentScale = sim.smallScale;
      }
    } else if(sim.mouseConfig === 1) {
      if(mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0) {
        const mx = (mouseX - (width / 2)) * (2 / width);
        const my = (mouseY - (height / 2)) * (2 / height);
        sim.initialCirclePosition = vec2.fromValues(mx, my);
        sim.circlePosition = vec2.fromValues(mx, my);
        sim.circleVelocity = vec2.clone(sim.initialCircleVelocity);
      }
    } else if(sim.mouseConfig === 2) {
      if(mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0) {
        const sourcePosition = vec2.fromValues(mouseX, mouseY);
        const source = vec3.clone(sim.impulseColor);
        if(!addSource(sim, sourcePosition, source)) {
          console.error('Failed to add source');
        }
      }
    } else if(sim.mouseConfig === 3) {
      if(mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0) {
        sim.staticMousePosition = vec2.fromValues(mouseX, mouseY);
      } else {
        sim.staticMousePosition = vec2.fromValues(-1, -1);
      }
    }

  } catch (error) {
    console.error(error);
  }
}

export function handleMouseUp(event: MouseEvent, sim: Simulation): void {
  try {
    const width = sim.viewportWidth;
    const height = sim.viewportHeight

    const mouseX = event.clientX;
    const mouseY = height - event.clientY;

    sim.mousePosition = vec2.fromValues(mouseX, mouseY);
    sim.lastMousePosition = vec2.fromValues(mouseX, mouseY);

    const mousePosition = sim.mousePosition;
    const staticMouse = sim.staticMousePosition;

    const mouseConfig = sim.mouseConfig;

    sim.currentScale = sim.smallScale;

    if(mouseConfig === 3) {
      if(staticMouse[0] >= 0) {
        const scale = 1.0 / 64.0;
        const deltaX = (staticMouse[0] - mousePosition[0]) * scale;
        const deltaY = (staticMouse[1] - mousePosition[1]) * scale;
        sim.circleVelocity[0] += deltaX;
        sim.circleVelocity[1] += deltaY;
      }
    }

    sim.mouseDown = false;   
  } catch (error) {
    console.error(error);
  }
}

export function handleMouseMove(event: MouseEvent, sim: Simulation): void {
  try {
    if(!sim.mouseDown) {
      return;
    }

    const width = sim.viewportWidth;
    const height = sim.viewportHeight;

    sim.lastMousePosition = vec2.clone(sim.mousePosition);

    const mouseX = event.clientX;
    const mouseY = height - event.clientY;

    sim.mousePosition = vec2.fromValues(mouseX, mouseY);

    if(sim.mouseConfig === 1) {
      const mx = (mouseX - (width / 2.0)) * (2.0 / width);
      const my = (mouseY - (height / 2.0)) * (2.0 / height);

      sim.initialCirclePosition = vec2.fromValues(mx, my);
      sim.circlePosition = vec2.fromValues(mx, my);
      sim.circleVelocity = vec2.clone(sim.initialCircleVelocity);
    }

  } catch (error) {
    console.error(error);
  }
}