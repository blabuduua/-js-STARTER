import React, { Component } from 'react'
import { Link } from "react-router-dom"
import DataTable from 'react-data-table-component'

state = { toggledClearRows: false }

const data = [
  { id: 1, title: 'Conan the Barbarian', year: '1982' },
  { id: 2, title: 'Conan the Barbarian', year: '1983' },
  { id: 3, title: 'Conan the Barbarian', year: '1984' },
  { id: 4, title: 'Conan the Barbarian', year: '1985' },
  { id: 5, title: 'Conan the Barbarian', year: '1986' },
  { id: 6, title: 'Conan the Barbarian', year: '1982' },
  { id: 7, title: 'Conan the Barbarian', year: '1987' },
  { id: 8, title: 'Conan the Barbarian', year: '1988' },
  { id: 9, title: 'Conan the Barbarian', year: '1982' },
  { id: 10, title: 'Conan the Barbarian', year: '1985' },
  { id: 11, title: 'Conan the Barbarian', year: '1984' }
];

const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
    right: true,
  },
];

const handleChange = (state) => {
  // You can use setState or dispatch with something like Redux so we can use the retrieved data
  console.log('Selected Rows: ', state.selectedRows);
};

// Toggle the state so React Table Table changes to `clearSelectedRows` are triggered
const handleClearRows = () => {
  this.setState({ toggledClearRows: !this.state.toggledClearRows})
}

class Test extends Component  {
  render() {
    return (
      <div className="container">
        Test
        <Link to="/">Main</Link>
        <DataTable
          title="Arnold Movies"
          columns={columns}
          data={data}
          selectableRows // add for checkbox selection
          onRowSelected={handleChange}
          clearSelectedRows={state.toggledClearRows}
        />
      </div>
    )
  }
}

export default Test
