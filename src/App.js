import React,{useState} from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import InnerList from './components/InnerList';
import Column from './Column';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const reorder = (array, startIndex, endIndex) => {
  const result = Array.from(array);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const App = ({initialState}) => {
  const[state, setState] = useState(initialState)
  console.log("state",state);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'COLUMN') {
      setState({
        ...state,
        columnOrder: reorder(
          state.columnOrder,
          source.index,
          destination.index,
        ),
      });
      return;
    }

    const home = state.columns[source.droppableId];
    const foreign = state.columns[destination.droppableId];

    if (home === foreign) {
      const newColumn = {
        ...home,
        taskIds: reorder(home.taskIds, source.index, destination.index),
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    setState(newState);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd} className='dragDropContext'>
    <Droppable droppableId="board" direction="horizontal" type="COLUMN">
      {provided => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          {state.columnOrder.map((columnId, index) => {
            const column = state.columns[columnId];

            return (
              <InnerList
                key={column.id}
                column={column}
                index={index}
                taskMap={state.tasks}
                className='innerList'
              />
            );
          })}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  </DragDropContext>
  )
}

export default App
