
// export default function FrenchFlag(width: string, height: string) { 
//     return( 
//         <svg xmlns="http://www.w3.org/2000/svg" width="900" height="600">
//         <rect width="900" height="600" fill="#CE1126"/>
//         <rect width="600" height="600" fill="#FFFFFF"/>
//         <rect width="300" height="600" fill="#002654"/>
//         </svg>
//     );
// }

export default function FrenchFlag({ width, height }: { width: number; height: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 900 600"
        >
            <rect width="300" height="600" fill="#002654" />
            <rect x="300" width="300" height="600" fill="#FFFFFF" />
            <rect x="600" width="300" height="600" fill="#CE1126" />
        </svg>
    );
}
