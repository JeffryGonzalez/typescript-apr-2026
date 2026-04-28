type CastMember = {
    role: string;
    actor: string;
}

export type Movie = {
         title: string;
         readonly director: string;
         yearReleased: number;
         mpaaRating?: string;
         cast?: CastMember[]
        }


export function getMovieSummary(movie:Movie) {
    return `${movie.title} by ${movie.director} was released in ${movie.yearReleased}`;
}