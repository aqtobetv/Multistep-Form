import AccountForm from './AccountForm'
import AddressForm from './AddressForm'
import UserForm from './UserForm'
import './App.css'
import { useMultiStepForm } from './useMultistepForm'
import { FormEvent, useState } from 'react'
type FormData = {
  firstName: string,
  lastName: string,
  age: string,
  street: string,
  city: string,
  state: string,
  zip: string,
  email: string,
  password: string
}
const INITIAL_STATE: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
}
function App() {
  const [data, setData] = useState(INITIAL_STATE)
  function updateFields(fields: Partial<FormData>){
    setData(prev => {
      return {...prev, ...fields}
    })     
  }
  const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} = useMultiStepForm([
   <UserForm {...data} updateFields = {updateFields}/>, 
   <AddressForm {...data} updateFields = {updateFields}/>, 
   <AccountForm {...data} updateFields = {updateFields}/>
  ])
  function onSubmit(e: FormEvent){
    e.preventDefault()
    if (!isLastStep) return next()
    alert("Succesfull Account Creation")
  }

  return (
    <div className="form">
      <form onSubmit = {onSubmit}>
        <div className="stepIndex">{currentStepIndex + 1}/{steps.length}</div>
        {step}
        <div className="btn-container">
          {!isFirstStep && <button onClick={back} type="button">Back</button>}
          <button type="submit">{isLastStep ? "Finish": "Next"}</button>
        </div>
      </form>

    </div>
  )
}

export default App
 