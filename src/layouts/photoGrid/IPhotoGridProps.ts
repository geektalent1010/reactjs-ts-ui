export interface IPhotoGridProps {
    classes?: any;
    images: any[];
    cols: number;
    onDelete: (file: any) => void;
    isOwner: boolean;
}
