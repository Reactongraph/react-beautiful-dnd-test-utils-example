import React from 'react'
import Column from '../Column'

const InnerList = ({column, taskMap, index}) => {
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} />;
}

export default InnerList