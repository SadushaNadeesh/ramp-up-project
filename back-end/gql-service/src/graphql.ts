
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateVehicleInput {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    carMake: string;
    carModel: string;
    vinNumber: string;
    manufacturedDate: string;
    vehicleAge: number;
}

export interface UpdateVehicleInput {
    vId: number;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    carMake: string;
    carModel: string;
    vinNumber: string;
    manufacturedDate: string;
    vehicleAge: number;
}

export interface Vehicle {
    vId: number;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    carMake: string;
    carModel: string;
    vinNumber: string;
    manufacturedDate: string;
    vehicleAge: number;
}

export interface IQuery {
    getAllVehicle(): Vehicle[] | Promise<Vehicle[]>;
    vehicle(vId: number): Vehicle | Promise<Vehicle>;
    paginated(first: number, offset: number): Vehicle[] | Promise<Vehicle[]>;
}

export interface IMutation {
    createVehicle(createVehicleInput: CreateVehicleInput): Vehicle | Promise<Vehicle>;
    updateVehicle(updateVehicle: UpdateVehicleInput): Vehicle | Promise<Vehicle>;
    removeVehicle(vId: number): Vehicle | Promise<Vehicle>;
}

type Nullable<T> = T | null;
