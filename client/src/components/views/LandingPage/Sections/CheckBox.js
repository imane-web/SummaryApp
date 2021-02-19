import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse

const categories = [
    {
        "_id": 0,
        "name": "design"
    },
    {
        "_id": 1,
        "name": "AI"
    },
    {
        "_id": 2,
        "name": "Embeded system"
    },
    {
        "_id": 3,
        "name": "Data science"
    },
    {
        "_id": 4,
        "name": "frameworks"
    },
    {
        "_id": 5,
        "name": "langages"
    },
    {
        "_id": 6,
        "name": "web development"
    },
    {
        "_id": 7,
        "name": "mobile developpemnt"
    },
    {
        "_id": 8,
        "name": "cyber security"
    }
    
    
]



function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        console.log(newChecked)
        setChecked(newChecked)
        props.handleFilters(newChecked)
        //update this checked information into Parent Component 

    }

    const renderCheckboxLists = () => categories.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggle(value._id)}
                type="checkbox"
                checked={Checked.indexOf(value._id) === -1 ? false : true}
            />&nbsp;&nbsp;
            <span>{value.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['0']} >
                <Panel header="Filter by category" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox