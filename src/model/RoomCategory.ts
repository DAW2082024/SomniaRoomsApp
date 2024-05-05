

export type RoomCategory = {
    id: number,
    name: string,
    description: string,
    bedType: string,
    maxGuestNum: number,
    roomCategoryPhotos: RoomCategoryPhoto[],
    roomCategoryDetails: RoomCategoryDetails[],
}

export type RoomCategoryDetails = {
    id: number,
    detailsSection: string,
    detailValue: string,
}

export type RoomCategoryPhoto = {
    id: number,
    path: string,
    altText: string | undefined,
    kind: string,
}