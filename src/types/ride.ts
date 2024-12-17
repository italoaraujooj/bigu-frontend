export type UserResponseDTO = {
  userId: string;
  name: string;
  email: string;
  sex: string;
  phoneNumber: string;
  matricula: string;
  feedbacks: string[];
  avgScore: number;
  profileImage: string;
  isVerified: boolean;
  ratingCount: number;
  offeredRidesCount: number;
  takenRidesCount: number;
};

export type AddressResponseDTO = {
  rua: string;
  nome: string;
  cidade: string;
  numero: string;
  bairro: string;
  estado: string;
  addressId: string;
  cep: string;
};

export type CarResponseDTO = {
    vehicleId: string,
    brand: string,
    vehicleModel: string,
    plate: string,
    modelYear: string,
    color: string,
    type: "CAR" | "MOTORCYCLE"
}

export type RideDto = {
    driver: string,
    startAddress: string,
    destinationAddress: string,
    numSeats: number,
    goingToCollege: boolean,
    price: number,
    scheduledTime: string,
    vehicle: string,
    description: string,
    toWomen: boolean  
}

export type CandidateResponseDTO = {
  user: UserResponseDTO;
  address: AddressResponseDTO;
  suggestedValue: number;
};

export type RideResponseDTO = {
    rideId: string,
    driver: UserResponseDTO,
    members: {
        user: UserResponseDTO,
        address: AddressResponseDTO,
        aggreedValue: number
    }[],
    candidates: CandidateResponseDTO[],
    startAddress: AddressResponseDTO,
    destinationAddress: AddressResponseDTO,
    numSeats: number,
    goingToCollege: boolean,
    price: number,
    scheduledTime: string,
    vehicle: CarResponseDTO,
    description: string,
    toWomen: boolean  
}

export type RequestRide = {
  rideId: string;
  addressId: string;
};

export type RatingResponseDTO = {
  _id: string;
  raterId: string;
  raterName: string;
  raterSex: string;
  score: number;
  comment: string;
  createdAt: string;
};

export type ReportResponseDTO = {
  _id: string;
  reporterId: string;
  reporterName: string;
  reporterSex: string;
  accusedId: string;
  content: string;
  comment: string;
  createdAt: string;
};
