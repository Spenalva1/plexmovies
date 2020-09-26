import { Image } from '../image.model'
export interface Movie {
    id: number;
    title: string;
    rating: number;
    description: string;
    image: Image;
}