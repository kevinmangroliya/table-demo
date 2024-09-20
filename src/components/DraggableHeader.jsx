import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
    COLUMN: "column",
};

const DraggableHeader = ({ column, index, moveColumn, onResize }) => {
    const [, ref] = useDrag({
        type: ItemTypes.COLUMN,
        item: { index },
    });

    const [, drop] = useDrop({
        accept: ItemTypes.COLUMN,
        hover(item) {
            if (item.index !== index) {
                moveColumn(item.index, index);
                item.index = index;
            }
        },
    });

    const handleMouseDown = (e) => {
        e.preventDefault();
        const startX = e.clientX;
        const initialWidth = column.width;
        const scaleFactor = 0.5;

        const onMouseMove = (moveEvent) => {
            const deltaX = (moveEvent.clientX - startX) * scaleFactor;
            const newWidth = Math.max(50, initialWidth + deltaX);
            requestAnimationFrame(() => onResize(index, newWidth));
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    return (
        <div
            ref={(node) => ref(drop(node))}
            className="flex justify-between items-center"
        >
            <span>{column.title}</span>
            <div
                className="cursor-col-resize w-1 h-full bg-transparent absolute -right-8 top-0 z-10"
                onMouseDown={handleMouseDown}
            />
        </div>
    );
};

export default DraggableHeader;