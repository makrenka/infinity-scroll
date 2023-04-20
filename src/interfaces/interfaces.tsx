export interface ResponseAPI {
    info: Info;
    results: Result[];
};

export interface Info {
    count: number;
    pages: number;
    next: string;
    prev: string;
};

export interface Result {
    id: number;
    name: string;
    image: string;
    origin: Origin;
    status: string;
    location: Location;
    species: string;
    gender: string;
};

export interface Origin {
    name: string;
};

export interface Location {
    name: string;
};