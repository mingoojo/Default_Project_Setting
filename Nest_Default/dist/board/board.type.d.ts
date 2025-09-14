export default interface Board {
    id: string;
    title: string;
    description: string;
    status: 'PUBLIC' | 'PRIVATE';
}
