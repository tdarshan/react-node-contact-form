/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react"



const Form = () => {
    

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        contact: '',
    });

    const [showSubmitMessage, setShowSubimtMessage] = useState(false);

    const onInputChange = function(e) {
        setFormValues((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    };

    const dismissAlert = function() {
        setShowSubimtMessage((prev) => !prev);
    }

    const handleFormSubmit = async function(e) {
        e.preventDefault();



        const isSubmit = await axios.post(`http://localhost:8080/validate-email`, {...formValues});

        setShowSubimtMessage(true);
        setFormValues((prev) => ({
            name: '',
            email: '',
            contact: ''
        }))
    }

  return (
    <div className="d-flex justify-center form-wrapper">
        <form onSubmit={(e) => handleFormSubmit(e)} className="d-flex flex-column gap-10">

            <div className="input-group d-flex flex-column gap-4">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={formValues.name} onChange={(e) => onInputChange(e)} minLength={2} />
            </div>
            <div className="input-group d-flex flex-column gap-4">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formValues.email} onChange={(e) => onInputChange(e)} minLength={4} />
            </div>
            <div className="input-group d-flex flex-column gap-4">
                <label htmlFor="contact">Number</label>
                <input type="tel" id="contact" name="contact" value={formValues.contact} onChange={(e) => onInputChange(e)} minLength={10} maxLength={10} />
            </div>

            <button type="submit" className="submit-btn">Submit</button>

            {showSubmitMessage && 
                <div className="d-flex gap-10 submit-message align-center">
                    <p>Thank you for your submission! Please check the mailbox</p>
                    <img src="/circle-xmark-solid.svg" alt="Dismiss" width={20} style={{cursor: "pointer"}} onClick={() => dismissAlert()} />
                </div>
            }
        </form>
    </div>
  )
}

export default Form