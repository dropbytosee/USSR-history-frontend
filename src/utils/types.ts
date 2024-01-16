export interface Reactor {
    id: number,
    name: string,
    status: number,
    description: string,
    heat_output: number,
    image: string
}

export interface User {
    id: number,
    name: string,
    email: string
}

export interface Station {
    id: number,
    status: number,
    owner: User,
    moderator: User,
    date_created: string,
    date_formation: string,
    date_complete: string,
    name: string,
    location: string,
    opening_year: number
}

export interface Option {
    id: number,
    name: string
}