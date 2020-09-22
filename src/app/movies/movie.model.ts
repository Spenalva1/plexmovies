import { Image } from './image.model'
export interface Movie {
    id: string;
    title: string;
    rating: number;
    description: string;
    image: Image;
}