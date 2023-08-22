import {createStore,applyMiddleware } from "redux";
import CarModel from "../Models/CarModel";
import { AddCarClear } from "../Services/Middleware";

export class CarBagState {
    public cars: CarModel[] = [];
}

export enum CarsActionType {
    FetchCars = "FetchCars",
    AddCar = "AddCar",
    UpdateCar = "UpdateCar"
}

export interface CarBagAction {
    type: CarsActionType;
    payload: any
}

export function fetchCars(cars: CarModel[]): CarBagAction {
    return { type: CarsActionType.FetchCars, payload: cars }
}

export function addCar(car: CarModel): CarBagAction {
    return { type: CarsActionType.AddCar, payload: car }
}

export function updateCar(car: CarModel): CarBagAction {
    return { type: CarsActionType.UpdateCar, payload: car }
}

export function carReducer(currentState: CarBagState = new CarBagState(), action: CarBagAction): CarBagState {
    const newState: CarBagState = { ...currentState }

    switch (action.type) {
        case CarsActionType.FetchCars:
            newState.cars = action.payload;
            break;

        case CarsActionType.AddCar:
            console.log(action.payload);
            newState.cars.push(action.payload)
            break;
        case CarsActionType.UpdateCar:
            const indexToUpdate = newState.cars.findIndex(c => c.carnumber == action.payload.carNumber)
            if (indexToUpdate >= 0) newState.cars[indexToUpdate] = action.payload;
            break;
    }
    return newState
}

export const carsStore = createStore(
    carReducer,applyMiddleware(AddCarClear)
    );