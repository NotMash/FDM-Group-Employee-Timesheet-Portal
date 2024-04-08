import { useState } from 'react'
import styles from './ItIssueForm.module.css'

export default function ItIssueForm() {

    const [issueDescription, setIssueDescription] = useState('')
    const [assitanceType, setAssistanceType] = useState('in_person')

    return(<div className={styles.formContainer}>
        <form className={styles.form}>
            <ul className={styles.list}>
                <li className={styles.it_desc_title}>
                    <label>IT Issue Description</label>
                </li>
                <li className={styles.it_desc}>
                    <textarea rows="2" cols="30"
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}></textarea>
                </li>
                <li className={styles.assistance_type_title}>
                    <label>Assistance Type</label>
                </li>
                <li className={styles.assistance_type}>
                    <select value={assitanceType} onChange={(e) => setAssistanceType(e.target.value)}>
                        <option value="in_person">In Person</option>
                        <option value="digital">Digital</option>
                    </select>
                </li>
                {assitanceType == 'in_person' ? <>
                    <li className={styles.location_title}>
                        <label>Location</label>
                        <p>Describe Your Location</p>
                    </li>
                    <li className={styles.location}>

                    </li></>:
                    <></>
                    }
            </ul>
        </form>
    </div>)
}