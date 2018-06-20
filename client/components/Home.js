import React from 'react';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      error: ''
    };
  }

  componentDidMount() {
    const seedCustomers = () => Promise.all([
      axios.get('https://randomuser.me/api/'),
      axios.get('https://randomuser.me/api/'),
      axios.get('https://randomuser.me/api/'),
      axios.get('https://randomuser.me/api/')
    ]);
    seedCustomers()
    .then(res => {
      res.forEach(customer => {
        this.setState((previousState) => {
          return {...previousState, customers: [...previousState.customers, customer.data.results[0]]};
        });
      });
    })
    /*
    From the Random User API: "If our API service is offline or if we are experiencing server issues, we'll return a simple JSON object with an error."
      {
        error: 'Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you.'
      }
    Therefore, if an error occurs, I've set the error message in the local state to render meaningful information to the end user.
    */
    .catch(err => {
      console.error(err);
      this.setState({error: err.error});
    });
  }

  render () {
    return (
      this.state.customers.length === 4 ?
        <div className="root-container">
          <div className="home-container">
            <div className="header-title">Our Newest Customers</div>
            <ul className="customer-list">
              {
                this.state.customers && this.state.customers.map(customer => {
                  return (
                    <li className="customer-card" key={customer.login.uuid}>
                      <img src={customer.picture.medium} className="customer-picture" />
                      <div className="customer-data">
                        <div className="customer-name capitalize">
                          {customer.name.first} {customer.name.last}
                        </div>
                        <div className="customer-address-line1 capitalize">
                          {customer.location.street}
                        </div>
                        <div className="customer-address-line2 capitalize">
                          {customer.location.city}, {customer.location.state}
                        </div>
                        <a className="customer-email" href={`mailto:${customer.email}`}>
                          {customer.email}
                        </a>
                      </div>
                    </li>
                  );
                })
              }
            </ul>
            <div className="footer-container">
              <a className="btn-refresh" href="/">Refresh</a>
            </div>
          </div>
        </div>
      :
        <div className="loading-state">
          <SyncLoader
            color="#1bb1dc"
            loading={true}
          />
          Loading...
          <div className="error-message">
            {this.state.error}
          </div>
        </div>
    );
  }
}

export default Home;
