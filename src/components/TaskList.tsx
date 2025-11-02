import React from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { useTasks } from '../context/Tasksprovider'
import TaskItem from './TaskItem'


export default function TaskList() {
    const { filteredTasks, onDragEndReorder } = useTasks()


    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return
        if (result.source.index === result.destination.index) return
        onDragEndReorder(result.source.index, result.destination.index)
    }


    return (
        <section className="task-list">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="task-list-droppable">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {filteredTasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(providedDraggable) => (
                                        <div ref={providedDraggable.innerRef} {...providedDraggable.draggableProps} {...providedDraggable.dragHandleProps}>
                                            <TaskItem task={task} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    )
}