import { BaseDtoModel } from "../shared/models/base-dto.model";

export interface StarshipDtoModel extends BaseDtoModel {
    result: {
        properties: {
            model: string;
            starship_class: string;
            manufacturer: string;
            cost_in_credits: string;
            length: string;
            crew: string;
            passengers: string;
            max_atmosphering_speed: string;
            hyperdrive_rating: string;
            MGLT: string;
            cargo_capacity: string;
            consumables: string;
            pilots: string[];
            created: string;
            edited: string;
            name: string;
            url: string;
        },
        description: string,
        _id: string;
        uid: string;
        __v: number;
    }
}