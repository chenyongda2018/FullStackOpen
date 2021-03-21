import React, { useState } from 'react'

//function componments[函数式组件]
const App = () => {
  const [left,setLeft] = useState(0)

  const [right,setRight] = useState(0)

  const [allClicks,setAll] = useState([])

  const handleLeftClick = () => {
    //状态改变会是页面重新渲染
    setLeft(left + 1)
    setAll(allClicks.concat('L'))
    console.log('left click: ',left,' history:',allClicks)
  }

  const handleRightClick = () => {
    setRight(right + 1)
    setAll(allClicks.concat('R'))
    console.log('right click: ',right,' history:',allClicks)
  }

  const reset = () => {
    setLeft(0)
    setRight(0)
    setAll([])
  }

  //这样带参数的事件处理函数只会在渲染时调用一次,
  //当button点击时，不会被调用
  const click0 = (who) => {
    console.log('click0',who)
  }

  //不带参数的事件处理函数，当button点击时会被调用
  const click1 = () => {
    console.log("click1")
  }

  //带参数的事件处理函数[Event handler function]需要在内部再返回一个函数
  const click2 = (who) => () => {
    console.log('click2',who)
  }

  return (
    <div>
      <Display counter={left} />
      <Button handleClick={handleLeftClick} text="left plus" />
      <Button handleClick={handleRightClick} text="right plus" />
      <Button handleClick={reset} text="reset" />
      <Display counter={right}/>
      <History clickes={allClicks} />
      <Display text="Functions return a function:" />
      <Button handleClick={click0('hahah')} text='click0' />
      <Button handleClick={click1} text="click1"/>
      <Button handleClick={click2('click2')} text="click2"/>
    </div>
  )
}

const Display = ({ text }) => <div>{text}</div>

const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const History = ({clickes}) => {
  if(clickes.length === 0) {
    return(<div>
      <p>history empty.</p>
    </div>)
  }
  return(
    <div>
      <p>
        {clickes.join(' ')}
      </p>
    </div>
  )
}

export default App;