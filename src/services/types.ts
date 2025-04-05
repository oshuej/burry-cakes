export type Category = {
    id: string;
    name: string;
};

export type ExternalListResponse = {
    menus: Category[];
    priceCategories: Category[];
};

export type SyncRequestOptions = {
    menuId: string;
    priceCategory: string;
};

export type DishesRequestOptions = {
    page: number;
    size: number;
}

export type DishCategory = {
    id: string,
    name: string
}

export type DishComposition = {
    id: string,
    proteins: number,
    fats: number,
    carbohydrates: number,
    calories: number,
    portionSize: number,
    portionSizeUnits: string,
    composition: string
}

export type Dish = {
    id: string,
    name: string,
    price: number | string,
    imageUrl: string,
    isHidden?: boolean,
    description?: string,
    categoryId: string | null,
    dishComposition: DishComposition | null,
}

export type DishesResponse = {
    content: Dish[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}