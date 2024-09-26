export type UserResponseDTO = {
    userId: string,
    name: string,
    email: string,
    sex: string,
    phoneNumber: string,
    matricula: string,
    feedbacks: string[],
    avgScore: number,
    profileImage: string,
    isVerified: boolean
}

export type AddressResponseDTO = {
    rua: string,
    nome: string,
    cidade: string,
    numero: string,
    bairro: string,
    estado: string,
    addressId: string
}

export type CarResponseDTO = {
    carId: string,
    brand: string,
    carModel: string,
    plate: string,
    modelYear: string,
    color: string
}

export type RideDto = {
    driver: string,
    startAddress: string,
    destinationAddress: string,
    numSeats: number,
    goingToCollege: boolean,
    price: number,
    scheduledTime: string,
    car: string,
    description: string,
    toWomen: boolean  
}

export type CandidateResponseDTO = {
    user: UserResponseDTO,
    address: AddressResponseDTO
}

export type RideResponseDTO = {
    rideId: string,
    driver: UserResponseDTO,
    members: {
        user: UserResponseDTO,
        address: AddressResponseDTO
    }[],
    candidates: CandidateResponseDTO[],
    startAddress: AddressResponseDTO,
    destinationAddress: AddressResponseDTO,
    numSeats: number,
    goingToCollege: boolean,
    price: number,
    scheduledTime: string,
    car: CarResponseDTO,
    description: string,
    toWomen: boolean  
}

export type RequestRide = {
    rideId: string,
    addressId: string
}
