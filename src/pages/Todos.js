import React, { useState, useEffect, memo } from 'react'
import Navbar from '../components/navbar/index'
import Footer from '../components/Footer/index'
import Spinner from '../components/spiners/BigSpinner'
import AddTodoBtn from '../components/todos/other/AddTodoBtn'
import * as Ctx from '../utils/contexts'
import useTodoLoader from '../hooks/Todos/useTodoLoader'
import useTodoManipulator from '../hooks/Todos/useTodoManipulator'
import useTodoScroller from '../hooks/Todos/useTodoScroller'
import Todos from '../components/todos/containers/index'
import CreateOrUpdateTodoModal from '../components/todos/containers/CreateOrUpdateModal'
import Chapter from '../components/todos/other/Chapter'


export default memo(_ => {
  document.title = 'IDiary - Your Todos'
  const [ error, setError ] = useState('')
  const [ page, setPage ] = useState(1)
  const [ addTodoModalOpened, setAddTodoModalOpened ] = useState(false)
  const [ todoDataToUpdate, setTodoDataToUpdate ] = useState(null)

  const [ fullfilledTodos, activeTodos, nextPage, setNextPage, todos, loading ] = useTodoLoader(page, setError, window.localStorage.getItem('userId') || window.sessionStorage.getItem('userId'))

  const [ todosToExpose, refs, changeHandlers, active, completed, setNewTodo, setTodoToDelete, setTodoToUpdate ] = useTodoManipulator(todos, activeTodos, fullfilledTodos)

  useTodoScroller(page, setPage, nextPage, setNextPage)
  
  useEffect(_ => window.scrollTo(0, 0), [ ])
  
  return(
    <>
      <Navbar/>
      <Ctx.BrightThemeContext.Consumer>
        {theme =>
          <Ctx.TodoStatsContext.Provider value={{active: active, completed: completed}}>
            <div id="TodosPage" className={`${theme? 'Bright' : 'Dark'}Page Page`}>
              <Chapter/>
              {error.length > 0 && <h3>{error}</h3>}
              {completed === 0 && active === 0 && error.length === 0 &&
                <h3>It seems like you have no todos yet</h3>
              }     
              {addTodoModalOpened && 
                <Ctx.SetNewTodoContext.Provider value={todo => setNewTodo(todo)}>
                  <Ctx.CloseModalContext.Provider value={_ => setAddTodoModalOpened(false)}>
                    <Ctx.SetTodoToUpdateContext.Provider value={todo => setTodoToUpdate(todo)}>
                      <Ctx.TodoToUpdateContext.Provider value={{value: todoDataToUpdate, unset: _ => setTodoDataToUpdate(null)}}>
                        <CreateOrUpdateTodoModal theme={theme}/>
                      </Ctx.TodoToUpdateContext.Provider>
                    </Ctx.SetTodoToUpdateContext.Provider>
                  </Ctx.CloseModalContext.Provider>
                </Ctx.SetNewTodoContext.Provider>
              }
              <Ctx.OpenModalContext.Provider value ={_ => setAddTodoModalOpened(true)}>
                {active + completed > 0 &&
                  <Ctx.YourTodoContext.Provider value={true}>
                    <Ctx.SetTodoToDeleteContext.Provider value={todoId => setTodoToDelete(todoId)}>
                      <Ctx.PassTodoDataContext.Provider value={todoData => setTodoDataToUpdate(todoData)}>
                        <Todos todos={todosToExpose} changeHandlers={changeHandlers} refs={refs}/>
                        {todos.length > 0 && todosToExpose.length === 0 &&
                          <h3>No todos found matching your criteria</h3>
                        }
                      </Ctx.PassTodoDataContext.Provider>
                    </Ctx.SetTodoToDeleteContext.Provider>
                  </Ctx.YourTodoContext.Provider>
                } 
                {!addTodoModalOpened && 
                  <AddTodoBtn/>
                }
                { loading && <Spinner/>}
              </Ctx.OpenModalContext.Provider>
            </div>
          </Ctx.TodoStatsContext.Provider>
        }
      </Ctx.BrightThemeContext.Consumer>
      <Footer/>
    </>
  )
})